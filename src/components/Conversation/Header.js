import { Avatar, Box, Typography, IconButton, Divider, Stack, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton';
import { CaretDown, MagnifyingGlass, Phone, VideoCamera } from 'phosphor-react'
import React, { useEffect, useState } from 'react';
import { useTheme } from "@mui/material/styles";
import { faker } from '@faker-js/faker';
import StyledBadge from '../StyledBadge';
import { ToggleSidebar, updateIsEnd, updateScore } from '../../redux/slices/app';
import { useDispatch } from 'react-redux';
import AVATAR from '../../assets/Images/avatar.jpg'
import BackIcon from '@mui/icons-material/ArrowBack'
import { useNavigate } from 'react-router-dom';
import { updateIsRating, updateHistory } from '../../redux/slices/app';
import { useSelector } from 'react-redux';
import SaveIcon from '@mui/icons-material/Save';

const Header = ({
    type
}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const theme = useTheme();
    const { isRating, identify, history, isEnd } = useSelector(state => state.app)
    const [time, setTime] = useState('')

    function handleBack() {
        if (window.player) {
            window.player?.pause?.()
            window.isPlaying = false
        }
        dispatch(updateHistory({ history: [] }))
        dispatch(updateIsRating({ isRating: false }))
        dispatch(updateScore({ score: [] }))
        navigate('/index')
    }

    function handleEnd() {
        if (isRating) return
        window.isRating = true
        dispatch(updateHistory({ history: [] }))
        dispatch(updateIsRating({ isRating: true }))
        if (window.ws) {
            window.ws.send(JSON.stringify({ cmd: 'score' }));
        }
    }

    function handleConfirm() {
        handleEnd()
        dispatch(updateIsEnd({ isEnd: false }))
    }

    useEffect(() => {
        if (identify === 'chat') return
        const nowTs = Date.now()
        const targetTs = nowTs + 15 * 60 * 1000
        let timer = setInterval(() => {
            const ts = Date.now()
            if (ts >= targetTs) {
                setTime('00:00')
                clearInterval(timer)
                handleEnd()
                return
            }
            const differ = Math.floor((targetTs - ts) / 1000)
            let seconds = differ % 60
            let minutes = (differ - seconds) / 60
            seconds = seconds < 10 ? '0' + seconds : seconds
            minutes = minutes < 10 ? '0' + minutes : minutes
            setTime(`${minutes}:${seconds}`)
        }, 1000)

        return () => {
            if (timer) clearInterval(timer)
        }
    }, [])

    return (
        <Box p={2} sx={{ width: '100%', height: '74px', backgroundColor: theme.palette.mode === 'light' ? '#F8FAFF' : theme.palette.background.paper, boxShadow: '0px 0px 2px rgba(0,0,0,0.25)' }}>
            <Stack alignItems={'center'} direction='row' justifyContent={'space-between'}
                sx={{ width: '100%', height: '100%' }}>
                <Stack sx={{ width: '100%' }} onClick={() => {
                    dispatch(ToggleSidebar());
                }} direction={'row'} justifyContent={'space-between'} spacing={2}>
                    {/* <Box>
                <StyledBadge  overlap="circular"
                anchorOrigin={{ // position
                    vertical: "bottom",
                    horizontal: "right",
                }}
                variant="dot">
                          <Avatar src={AVATAR}/>
                </StyledBadge>
                
            </Box> */}

                    <BackIcon onClick={handleBack} />
                    {
                        type === 'score' ? null :
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', columnGap: '18px' }}>
                                {
                                    identify !== 'chat' ?
                                        <div>{time}</div> : null
                                }
                                
                                {
                                    identify !== 'chat' ? (
                                        isRating ?
                                            <LoadingButton
                                                endIcon={<SaveIcon />}
                                                loading={true}
                                                loadingPosition="end"
                                                variant="contained"
                                            >
                                                <span>评分中</span>
                                            </LoadingButton>
                                            :
                                            <Button variant="contained" onClick={handleEnd} color="success" style={{ backgroundColor: '#39b213', color: '#FFF' }}>结束并评分</Button>)
                                        : null
                                }
                            </div>
                    }
                </Stack>
                {/* <Stack direction='row' alignItems='center' spacing={3}>
            <IconButton>
                <VideoCamera/>
            </IconButton>
            <IconButton>
                <Phone/>
            </IconButton>
            <IconButton>
                <MagnifyingGlass/>
            </IconButton>
            <Divider orientation='vertical' flexItem/>
            <IconButton>
                <CaretDown/>
            </IconButton>
        </Stack> */}
            </Stack>


            {/* <Dialog
                open={true}
                onClose={handleConfirm}
            >
                <DialogTitle>提示</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        考试已结束
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button type="submit" onClick={handleConfirm}>确认</Button>
                </DialogActions>
            </Dialog> */}

            {
                isEnd ? 
                    <div style={{ position: 'fixed', zIndex: 10000, top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{ borderRadius: '10px', background: '#fff', padding: '16px 24px', width: '80%', display: 'flex', flexDirection: 'column' }}>
                            <div style={{ fontSize: '18px', color: '#212B36', fontWeight: 700 }}>提示</div>
                            <div style={{ fontSize: '16px', color: '#637381', marginTop: '12px' }}>考试已结束</div>
                            <div style={{ color: '#0162C4', fontSize: '14px', cursor: 'pointer', marginTop: '24px', width: 'fit-content', alignSelf: 'flex-end' }} onClick={handleConfirm}>确定</div>
                        </div>
                    </div>
                : null
            }
        </Box>
    )
}

export default Header