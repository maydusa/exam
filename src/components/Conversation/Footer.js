import { Box, Fab, IconButton, InputAdornment, Stack, TextField, Tooltip } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { styled, useTheme } from "@mui/material/styles";
import { LinkSimple, PaperPlaneTilt, Smiley, Camera, File, Image, Sticker, User } from 'phosphor-react';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { Chat_History } from '../../data'
import { appendHistory, updateHistoryItemById } from '../../redux/slices/app'
import { dataURItoBlob, blobToBase64 } from '../../utils/index'
import { useNavigate } from 'react-router-dom';
import lamejs from 'lamejs'
import { Mic, StopCircle } from '@mui/icons-material'
//必须引入的核心，换成require也是一样的。注意：recorder-core会自动往window下挂载名称为Recorder对象，全局可调用window.Recorder，也许可自行调整相关源码清除全局污染
import Recorder from 'recorder-core' //注意如果未引用Recorder变量，可能编译时会被优化删除（如vue3 tree-shaking），请改成 import 'recorder-core'，或随便调用一下 Recorder.a=1 保证强引用

//引入相应格式支持文件；如果需要多个格式支持，把这些格式的编码引擎js文件放到后面统统引入进来即可
import 'recorder-core/src/engine/mp3'
import 'recorder-core/src/engine/mp3-engine' //如果此格式有额外的编码引擎（*-engine.js）的话，必须要加上


const StyledInput = styled(TextField)(({ theme }) => ({
    "& .MuiInputBase-input": {
        paddingTop: '12px',
        paddingBottom: '12px',
    },
}));

const Actions = [
    {
        color: '#4da5fe',
        icon: <Image size={24} />,
        y: 102,
        title: 'Photo/Video'
    },
    {
        color: '#1b8cfe',
        icon: <Sticker size={24} />,
        y: 172,
        title: 'Stickers'
    },
    {
        color: '#0172e4',
        icon: <Camera size={24} />,
        y: 242,
        title: 'Image'
    },
    {
        color: '#0159b2',
        icon: <File size={24} />,
        y: 312,
        title: 'Document'
    },
    {
        color: '#013f7f',
        icon: <User size={24} />,
        y: 382,
        title: 'Contact'
    }
];

const ChatInput = ({ setOpenPicker, inputWrapRef, inputText, onInputChange }) => {
    const [openAction, setOpenAction] = useState(false);
    return (
        <StyledInput ref={inputWrapRef} inputProps={{ onChange: onInputChange, value: inputText }} fullWidth placeholder='Write a message...' variant='filled' InputProps={{
            disableUnderline: true,
            startAdornment: false
            // <Stack sx={{width:'max-content'}}>
            //     <Stack sx={{position:'relative', display: openAction ? 'inline-block' : 'none'}}>
            //         {Actions.map((el)=>(
            //             <Tooltip placement='right' title={el.title}>
            //                 <Fab sx={{position:'absolute', top: -el.y, backgroundColor: el.color}}>
            //                     {el.icon}
            //                 </Fab>
            //             </Tooltip>

            //         ))}
            //     </Stack>
            //     <InputAdornment>
            //         <IconButton onClick={()=>{
            //             setOpenAction((prev)=>!prev)
            //         }}>
            //             <LinkSimple/>
            //         </IconButton>
            //     </InputAdornment>
            // </Stack>
            ,
            endAdornment: <InputAdornment>
                <IconButton onClick={() => {
                    setOpenPicker((prev) => !prev);
                }}>
                    <Smiley />
                </IconButton>
            </InputAdornment>
        }} />
    )
}

const Footer = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const theme = useTheme();
    const [openPicker, setOpenPicker] = useState(false);
    const inputWrapRef = useRef(null)
    const [inputText, setInputText] = useState('')
    const inputTextRef = useRef('')
    const { isRating, identify, isEnd } = useSelector((store) => store.app);
    const isChating = useRef(false)
    const recorder = useRef()
    const recordData = useRef('')
    const timer = useRef()
    const [isRecording, setIsRecording] = useState(false)

    /**开始录音**/
    function recStart() {//打开了录音后才能进行start、stop调用
        recorder.current.start();
    };

    /**结束录音**/
    function recStop(cb) {
        recorder.current.stop(async function (blob, duration) {

            //简单利用URL生成本地文件地址，注意不用了时需要revokeObjectURL，否则霸占内存
            //此地址只能本地使用，比如赋值给audio.src进行播放，赋值给a.href然后a.click()进行下载（a需提供download="xxx.mp3"属性）
            recordData.current = await blobToBase64(blob)
            var localUrl = (window.URL || window.webkitURL).createObjectURL(blob);
            console.log(blob, localUrl, "时长:" + duration + "ms");
            recorder.current.close();//释放录音资源，当然可以不释放，后面可以连续调用start；但不释放时系统或浏览器会一直提示在录音，最佳操作是录完就close掉
            recorder.current = null;

            //已经拿到blob文件对象想干嘛就干嘛：立即播放、上传、下载保存

            cb && cb()
        }, function (msg) {
            console.log("录音失败:" + msg);
            recorder.current.close();//可以通过stop方法的第3个参数来自动调用close
            recorder.current = null;
        });
    };

    function recOpen (success) {//一般在显示出录音按钮或相关的录音界面时进行此方法调用，后面用户点击开始录音时就能畅通无阻了
        if (recorder.current) {
            recorder.current?.close()
            recorder.current = null
        }
        recorder.current = Recorder({ //本配置参数请参考下面的文档，有详细介绍
            type: "mp3", sampleRate: 16000, bitRate: 16 //mp3格式，指定采样率hz、比特率kbps，其他参数使用默认配置；注意：是数字的参数必须提供数字，不要用字符串；需要使用的type类型，需提前把格式支持文件加载进来，比如使用wav格式需要提前加载wav.js编码引擎
            , onProcess: function (buffers, powerLevel, bufferDuration, bufferSampleRate, newBufferIdx, asyncEnd) {
                //录音实时回调，大约1秒调用12次本回调，buffers为开始到现在的所有录音pcm数据块(16位小端LE)
                //可利用extensions/sonic.js插件实时变速变调，此插件计算量巨大，onProcess需要返回true开启异步模式
                //可实时上传（发送）数据，配合Recorder.SampleData方法，将buffers中的新数据连续的转换成pcm上传，或使用mock方法将新数据连续的转码成其他格式上传，可以参考文档里面的：Demo片段列表 -> 实时转码并上传-通用版；基于本功能可以做到：实时转发数据、实时保存数据、实时语音识别（ASR）等

                //可实时绘制波形（extensions目录内的waveview.js、wavesurfer.view.js、frequency.histogram.view.js插件功能）
                // wave && wave.input(buffers[buffers.length - 1], powerLevel, bufferSampleRate);
            }
        });

        recorder.current.open(function () {//打开麦克风授权获得相关资源
            //rec.start() 此处可以立即开始录音，但不建议这样编写，因为open是一个延迟漫长的操作，通过两次用户操作来分别调用open和start是推荐的最佳流程

            //创建可视化，指定一个要显示的div
            // if (Recorder.WaveView) wave = Recorder.WaveView({ elem: ".recwave" });
            success && success();
        }, function (msg, isUserNotAllow) {//用户拒绝未授权或不支持
            console.log((isUserNotAllow ? "UserNotAllow，" : "") + "无法录音:" + msg);
            alert(JSON.stringify(msg) + isUserNotAllow)
        });
    };

    // useEffect(() => {
    //     if (!recorder.current) {
    //         window.result = []
    //         // mediaSourceRef.current = new MediaSource()
    //         // setAudioUrl(window.URL.createObjectURL(mediaSourceRef.current))
    //         // console.log(mediaSourceRef.current.addSourceBuffer)
    //         // sourceBufferRef.current = mediaSourceRef.current.addSourceBuffer('audio/mp3')

    //         // audioElRef.current.play() 

    //         recOpen()

    //         if (window.ws) {
    //             window.ws?.close()
    //             window.ws = null
    //         }

    //         const url = 'wss://api.siuuu.ai/demo-api/exam?category=panel'

    //         window.ws = new WebSocket(url);

    //         window.ws.onopen = function (evt) {
    //             console.log("Connection open ...");
    //             if (localStorage.getItem('mode') === 'exam') {
    //                 window.ws.send(JSON.stringify({ cmd: 'question' }));
    //             }
    //         };

    //         window.ws.onmessage = function (evt) {
    //             window.timer = setInterval(() => {
    //                 console.log(window.audioArr)
    //                 if (window.isPlaying) return
    //                 if (!window.player) {
    //                     window.player = new Audio()
    //                 }
    //                 if (!window.audioArr.length) return
    //                 window.isPlaying = true
    //                 window.player.src = window.URL.createObjectURL(dataURItoBlob(window.audioArr))
    //                 window.player.onended = function () {
    //                     window.isPlaying = false
    //                 }
    //                 window.player.play()
    //                 window.audioArr = []
    //             }, 500)

    //             let res
    //             try {
    //                 res = JSON.parse(evt.data)
    //                 if (res.code === 200) {
    //                     const historyItem = message.current.find(item => item.id === res.data.mid)
    //                     if (historyItem) {
    //                         if (res.data.status === 2) {
    //                             const audioArr = [...historyItem.audio]
    //                             if (res.data.audio) {
    //                                 audioArr.push(res.data)
    //                             }
    //                             // if (audioArr.length > 0) {
    //                             //     if (audio.current) {
    //                             //         audio.current?.pause?.()
    //                             //         audio.current = null
    //                             //     }
    //                             //     audioArr.sort((a, b) => a.sn - b.sn)
    //                             //     const base64Arr = audioArr.map(item => item.audio)
    //                             //     audio.current = new Audio()
    //                             //     audio.current.src = window.URL.createObjectURL(dataURItoBlob(base64Arr))
    //                             //     audio.current.play()
    //                             // }

    //                             if (res.data.role === 'user') {
    //                                 if (localStorage.getItem('mode') === 'exam') {
    //                                     window.ws.send(JSON.stringify({ cmd: 'question' }));
    //                                 }
    //                             }
    //                         }
    //                         const data = {
    //                             content: historyItem.content || '',
    //                             audio: historyItem.audio || []
    //                         }
    //                         if (res.data.text) {
    //                             data.content += res.data.text
    //                         }
    //                         if (res.data.audio) {
    //                             data.audio = [...data.audio, res.data]
    //                             // let audio = new Audio()
    //                             // audio.src = window.URL.createObjectURL(dataURItoBlob([res.data.audio]))
    //                             // audio.play()
    //                             // audio.onended = function (e) {
    //                             //     console.log(e)
    //                             // }
    //                             if (window.audioArr) {
    //                                 window.audioArr.push(res.data.audio)
    //                             } else {
    //                                 window.audioArr = [res.data.audio]
    //                             }
    //                         }
    //                         historyItem.content = data.content
    //                         historyItem.audio = data.audio
    //                         dispatch(updateHistoryItemById({
    //                             id: historyItem.id,
    //                             data: data
    //                         }))
    //                     } else {
    //                         const data = {
    //                             id: res.data.mid,
    //                             type: 'msg',
    //                             subtype: '',
    //                             content: res.data.text || '',
    //                             incoming: res.data.role === 'assistant',
    //                             outgoing: false,
    //                             metadata: {
    //                                 duration: 0,
    //                                 isPlaying: false
    //                             },
    //                             creator: res.data.role,
    //                             audio: res.data.audio ? [res.data] : []
    //                         }
    //                         message.current.push(data)
    //                         dispatch(appendHistory([data]))
    //                     }
    //                     window.result = message.current
    //                     if (isRatingRef.current) {
    //                         navigate("/result")
    //                     }
    //                 }
    //             } catch (e) { console.log(e) }
    //         };

    //         window.ws.onclose = function (evt) {
    //             console.log("Connection closed.");
    //         };
    //     }

    //     return () => {
    //         audio.current?.pause?.()
    //         audio.current = null
    //     }
    // }, [])

    const handleMessage = ({ data, id, historyLength, isEnd }) => {
        console.log('data', data, id, isEnd)
        if (data.length === 0) return id
        if (isEnd) isChating.current = false
        if ((!data.find(item => item.type === 'progress') || data.find(item => item.type === 'image')) && id === '') {
            dispatch(appendHistory(data.filter(item => item.type !== 'progress').map(item => {
                return {
                    type: 'msg',
                    subtype: item.type,
                    content: item.content,
                    incoming: true,
                    outgoing: false,
                    metadata: {
                        duration: 0,
                        isPlaying: false
                    },
                    creator: item.creator
                }
            })))

            return id
        }

        if (!data.find(item => item.type === 'image')) {
            const msgItem = data.findLast(item => item.type === 'progress')
            if (id === '') {
                const id = historyLength
                dispatch(appendHistory([{
                    type: 'msg',
                    subtype: msgItem.type,
                    content: Number(msgItem.content.replace('creating_image:', '')),
                    incoming: true,
                    outgoing: false,
                    metadata: {
                        duration: 0,
                        isPlaying: false
                    },
                    creator: msgItem.creator
                }]))
                return id
            } else {
                dispatch(updateHistoryItemById({
                    id,
                    data: {
                        subtype: 'progress',
                        content: Number(msgItem.content.replace('creating_image:', ''))
                    }
                }))
            }
        } else {
            const imageIndex = data.findLastIndex(item => item.type === 'image')
            const imageItem = data[imageIndex]
            dispatch(updateHistoryItemById({
                id,
                data: {
                    subtype: 'image',
                    content: imageItem.content
                }
            }))

            dispatch(appendHistory(data.slice(imageIndex + 1).map(item => {
                return {
                    type: 'msg',
                    subtype: item.type,
                    content: item.content,
                    incoming: true,
                    outgoing: false,
                    metadata: {
                        duration: 0,
                        isPlaying: false
                    },
                    creator: item.creator
                }
            })))
        }

        return id
    }

    const handleStop = () => {
        const base64Data = recordData.current.split(',')[1]
        if (!window.userAudioArr) window.userAudioArr = []
        window.userAudioArr.push(base64Data)
        if (window.ws) {
            window.ws.send(JSON.stringify({ cmd: identify === 'chat' ? 'chat' : 'answer', audio: base64Data }))
        }
    }

    const handleRecord = () => {
        if (isRecording) return
        setIsRecording(true)
        if (recorder.current) {
            recStart()
            timer.current = setTimeout(() => {
                if (isRecording) {
                    recStop(handleStop)
                    setIsRecording(false)
                }
                clearTimeout(timer.current)
            }, 55000)
        } else {
            recOpen(() => {
                recStart()
                timer.current = setTimeout(() => {
                    if (isRecording) {
                        recStop(handleStop)
                        setIsRecording(false)
                    }
                    clearTimeout(timer.current)
                }, 55000)
            })
        }
        return
    }

    async function handleStopRecord() {
        clearTimeout(timer.current)
        timer.current = null
        recStop(handleStop)
        setIsRecording(false)
        return
    }

    function handleSend() {
        if (isRecording) {
            handleStopRecord()
        } else {
            handleRecord()
        }
    }

    function insertAtCursor(myField, myValue) {
        let tempTextAreaData = ''
        if (document.selection) {
            //IE support
            myField.focus();
            const sel = document.selection.createRange();
            sel.text = myValue;
            sel.select();
        } else if (myField.selectionStart || myField.selectionStart == '0') {
            //MOZILLA/NETSCAPE support
            const startPos = myField.selectionStart;
            const endPos = myField.selectionEnd;
            const beforeValue = myField.value.substring(0, startPos);
            const afterValue = myField.value.substring(endPos, myField.value.length);

            tempTextAreaData = beforeValue + myValue + afterValue;
            setInputText(tempTextAreaData);
            myField.selectionStart = startPos + myValue.length;
            myField.selectionEnd = startPos + myValue.length;
            myField.focus();
        } else {
            tempTextAreaData += myValue;
            setInputText(tempTextAreaData);
            myField.focus();
        }
    }

    function handleInputChange(e) {
        setInputText(e.target.value)
    }

    function handleSelectEmoji(emoji) {
        insertAtCursor(inputWrapRef.current.getElementsByTagName('input')[0], emoji.native)
    }

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            // 处理回车事件
            handleSend()
        }
    }

    useEffect(() => {
        inputTextRef.current = inputText
    }, [inputText])

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown)
        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [])

    return (
        (isRating || isEnd) ?
        null :
        <Box sx={{
            height: 38, width: 48, backgroundColor: theme.palette.primary.main,
            borderRadius: 1.5
        }} style={{ position: 'fixed', bottom: '12px', right: '12px' }}>
            <Stack sx={{ height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                <IconButton onClick={handleSend}>
                    {
                        isRecording ? <StopCircle style={{ color: '#FFF' }} /> : <Mic style={{ color: '#FFF' }} />
                    }
                </IconButton>
            </Stack>
        </Box>

        // <Box p={2} sx={{
        //     width: '100%', height: '79px', backgroundColor: theme.palette.mode === 'light' ? '#F8FAFF' :
        //         theme.palette.background.paper, boxShadow: '0px 0px 2px rgba(0,0,0,0.25)'
        // }}>
        //     <Stack direction='row' justifyContent={'center'} alignItems={'center'} spacing={3}>



        //     </Stack>
        // </Box>
    )
}

export default Footer