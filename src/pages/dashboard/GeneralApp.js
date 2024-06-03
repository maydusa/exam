import React, { useEffect, useRef} from "react";
import Chats from "./Chats";
import { Box, Stack } from "@mui/material";
import Conversation from "../../components/Conversation";
import { useTheme } from "@mui/material/styles";
import Contact from "../../components/Contact";
import SharedMessages from "../../components/SharedMessages";
import StarredMessages from "../../components/StarredMessages";
import { useNavigate } from "react-router-dom";
import { dataURItoBlob, blobToBase64, formatText } from '../../utils/index'
import { useDispatch, useSelector } from 'react-redux'
import { appendHistory, updateHistoryItemById, updateIsEnd, updateScore } from '../../redux/slices/app'
import Result from '../../pages/dashboard/Result'

const GeneralApp = () => {
  const dispatch = useDispatch()
  const theme = useTheme();
  const navigate = useNavigate()
  const {sidebar, isRating, identify} = useSelector((store)=> store.app);// access our store inside component
  
  const isInit = useRef(false)
  const message = useRef([])

  useEffect(() => {
    if (!isInit.current) {
      isInit.current = true
      window.result = []
      window.audioArr = []

      if (window.ws) {
        window.ws?.close()
        window.ws = null
      }

      const url = `wss://api.siuuu.ai/demo-api/${identify}`

      window.ws = new WebSocket(url);

      window.ws.onopen = function (evt) {
        console.log("Connection open ...");
        if (identify !== 'chat') window.ws.send(JSON.stringify({ cmd: 'question' }));
      };

      window.ws.onmessage = function (evt) {
        window.timer = setInterval(async () => {
          if (window.isPlaying) return
          if (!window.player) {
            window.player = new Audio()
          }
          if (!window.audioArr?.length) return
          window.isPlaying = true
          window.player.src = window.URL.createObjectURL(dataURItoBlob(window.audioArr))
          window.player.onended = function () {
            window.isPlaying = false
          }
          window.player.play()?.catch(e => { console.log(e) })
          window.audioArr = []
        }, 500)

        let res
        try {
          res = JSON.parse(evt.data)
          if (res.code === 200) {
            if (res.data.length) {
              dispatch(updateScore({ score: res.data }))
              return
            }
            const historyItem = message.current.find(item => item.id === res.data.mid)
            if (historyItem) {
              if (res.data.status === 2) {
                const audioArr = [...historyItem.audio]
                if (res.data.audio) {
                  audioArr.push(res.data)
                }
                // if (audioArr.length > 0) {
                //     if (audio.current) {
                //         audio.current?.pause?.()
                //         audio.current = null
                //     }
                //     audioArr.sort((a, b) => a.sn - b.sn)
                //     const base64Arr = audioArr.map(item => item.audio)
                //     audio.current = new Audio()
                //     audio.current.src = window.URL.createObjectURL(dataURItoBlob(base64Arr))
                //     audio.current.play()
                // }

                if ((identify === 'exercise' && res.data.role === 'assistant_score') || (identify === 'exam' && res.data.role === 'user' && message.current.filter(item => item.creator === 'assistant').length < 5)) {
                  window.ws.send(JSON.stringify({ cmd: 'question' }));
                }

                if (identify === 'exam' && res.data.role === 'user' && message.current.filter(item => item.creator === 'user').length >= 5) {
                  dispatch(updateIsEnd({ isEnd: true }))
                }
              }
              const data = {
                content: historyItem.content || '',
                audio: historyItem.audio || []
              }

              if (res.data.text) {
                if (res.data.role === 'user') {
                  data.content = res.data.text
                } else {
                  data.content = formatText(data.content + res.data.text)
                }
              }

              if (res.data.audio) {
                data.audio = [...data.audio, res.data]
                // let audio = new Audio()
                // audio.src = window.URL.createObjectURL(dataURItoBlob([res.data.audio]))
                // audio.play()
                // audio.onended = function (e) {
                //     console.log(e)
                // }
                if (window.audioArr) {
                  window.audioArr.push(res.data.audio)
                } else {
                  window.audioArr = [res.data.audio]
                }
                data.isShow = true
              }
              historyItem.content = data.content
              historyItem.audio = data.audio
              dispatch(updateHistoryItemById({
                id: historyItem.id,
                data: data
              }))
            } else {
              const data = {
                id: res.data.mid,
                type: 'msg',
                subtype: '',
                content: formatText(res.data.text || ''),
                incoming: res.data.role === 'assistant',
                outgoing: false,
                metadata: {
                  duration: 0,
                  isPlaying: false
                },
                isShow: false,
                creator: res.data.role,
                audio: res.data.audio ? [res.data] : []
              }

              if (res.data.role === 'user') {
                window.audioArr.push(...(window.userAudioArr || []))
                window.userAudioArr = []
              }

              message.current.push(data)
              dispatch(appendHistory([data]))
            }
            window.result = message.current
            // if (window.isRating) {
            //   navigate("/result")
            // }
          }
        } catch (e) { console.log(e) }
      };

      window.ws.onclose = function (evt) {
        console.log("Connection closed.");
      };
    }

    return () => {
      if (window.player) {
        window.player?.pause?.()
      }
    }
  }, [])

  
  
  return (
    <Stack direction='row' sx={{ width: '100%', height: '100%' }}>
      {/* Chats */}
      {/* <Chats /> */}

      <Box sx={{ height: '100%', width: '100%',
       backgroundColor: theme.palette.mode === 'light' ? '#F0F4FA' : theme.palette.background.default }}>
      {/* Conversation */}
      {
          isRating ? <Result /> : <Conversation />
      }
      </Box>
      {/* Contact */}
      {/* {sidebar.open && (()=>{
        switch (sidebar.type) {
          case 'CONTACT':
            return <Contact/>

          case 'STARRED':
            return <StarredMessages/>

          case 'SHARED':
            return <SharedMessages/>
        
          default:
            break;
        }
      })()  } */}
     
    </Stack>
  );
};

export default GeneralApp;
