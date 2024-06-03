import { Box, Divider, IconButton, Link, Stack, Typography, Menu, MenuItem, CircularProgress } from '@mui/material';
import { useTheme } from '@mui/material/styles'
import { DotsThreeVertical, DownloadSimple, Image } from 'phosphor-react';
import React, { useEffect, useMemo, useRef } from 'react';
import { Message_options } from '../../data'
import AudioWave from '../AudioWave/AudioWave'
import ICON_VOICE from '../../assets/svg/voice.svg'
import { useDispatch, useSelector } from 'react-redux'
import { appendHistory, updateAudioDuration, updateAudioIsPlaying, updateHistoryItem, updatePreview } from '../../redux/slices/app'
import { formatDuration } from '../../utils';
import IMG_ROBOT from '../../assets/svg/robot.svg'
import IMG_USER from '../../assets/svg/user.svg'
import IMG_RATE from '../../assets/svg/rate.svg'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typewriter from '../Typewriter';

const DocMsg = ({ el, menu }) => {
  const theme = useTheme();
  return (
    <Stack direction='row' justifyContent={el.incoming ? 'start' : 'end'}>
      <Box p={1.5} sx={{
        backgroundColor: el.incoming ? theme.palette.background.default :
          theme.palette.primary.main, borderRadius: 1.5, width: 'max-content'
      }}>
        <Stack spacing={2}>
          <Stack p={2} spacing={3} direction='row' alignItems='center'
            sx={{ backgroundColor: theme.palette.background.paper, borderRadius: 1 }}>
            <Image size={48} />
            <Typography variant='caption'>
              Abstract.png
            </Typography>
            <IconButton>
              <DownloadSimple />
            </IconButton>
          </Stack>
          <Typography variant='body2' sx={{ color: el.incoming ? theme.palette.text : '#fff' }} >
            {el.message}
          </Typography>
        </Stack>
      </Box>
      {menu && <MessageOptions />}

    </Stack>
  )
}

const LinkMsg = ({ el, menu }) => {
  const theme = useTheme();
  return (
    <Stack direction='row' justifyContent={el.incoming ? 'start' : 'end'}>
      <Box p={1.5} sx={{
        backgroundColor: el.incoming ? theme.palette.background.default :
          theme.palette.primary.main, borderRadius: 1.5, width: 'max-content'
      }}>
        <Stack spacing={2}>
          <Stack p={2} spacing={3} alignItems='start'
            sx={{ backgroundColor: theme.palette.background.paper, borderRadius: 1 }}>
            <img src={el.preview} alt={el.message} style={{ maxHeight: 210, borderRadius: '10px' }} />
            <Stack spacing={2}>
              <Typography variant='subtitle2'>Creating Chat App</Typography>
              <Typography variant='subtitle2' sx={{ color: theme.palette.primary.main }}
                component={Link} to="//https://www.youtube.com">www.youtube.com</Typography>
            </Stack>
            <Typography variant='body2' color={el.incoming ? theme.palette.text : '#fff'}>
              {el.message}
            </Typography>
          </Stack>
        </Stack>
      </Box>
      {menu && <MessageOptions />}
    </Stack>
  )
}

const ReplyMsg = ({ el, menu }) => {
  const theme = useTheme();
  return (
    <Stack direction='row' justifyContent={el.incoming ? 'start' : 'end'}>
      <Box p={1.5} sx={{
        backgroundColor: el.incoming ? theme.palette.background.default :
          theme.palette.primary.main, borderRadius: 1.5, width: 'max-content'
      }}>
        <Stack spacing={2}>
          <Stack p={2} direction='column' spacing={3} alignItems='center'
            sx={{ backgroundColor: theme.palette.background.paper, borderRadius: 1 }}>
            <Typography variant='body2' color={theme.palette.text}>
              {el.message}
            </Typography>
          </Stack>
          <Typography variant='body2' color={el.incoming ? theme.palette.text : '#fff'}>
            {el.reply}
          </Typography>
        </Stack>
      </Box>
      {menu && <MessageOptions />}
    </Stack>
  )
}

const MediaMsg = ({ el, menu }) => {
  const dispatch = useDispatch()
  const theme = useTheme();

  function handlePreview() {
    dispatch(updatePreview({
      isShow: true,
      url: el.content
    }))
  }

  return (
    <Stack direction='row' justifyContent={el.incoming ? 'start' : 'end'}>
      <Box p={1.5} sx={{
        backgroundColor: el.incoming ? theme.palette.background.default :
          theme.palette.primary.main, borderRadius: 1.5, width: 'max-content'
      }}>
        <Stack spacing={1}>
          <img onClick={handlePreview} src={el.content} alt={el.content} style={{ maxHeight: 210, borderRadius: '10px' }} />
          {/* <Typography variant='body2' color={el.incoming ? theme.palette.text : '#fff'}>
            {el.message}
          </Typography> */}
        </Stack>
      </Box>
      {menu && <MessageOptions />}
    </Stack>
  )
}

const TextMsg = ({ el, menu }) => {
  const theme = useTheme();
  return (
    el.creator === 'assistant_score' ?
      <Card sx={{ minWidth: 275 }} style={{ position: 'relative' }}>
        <img src={IMG_RATE} style={{ position: 'absolute', bottom: '-10px', right: '-10px' }} />
        <CardContent style={{ position: 'relative', wordBreak: 'break-all' }}>
          { el.content }
        </CardContent>
      </Card>
    :
    (
        el.creator === 'assistant' && !el.isShow ? null :
        <Stack direction='row' justifyContent={el.incoming ? 'start' : 'end'} alignItems={'flex-start'} style={{ flex: 1 }}>
          {
            el.incoming ?
              <img style={{ marginRight: '12px' }} src={IMG_ROBOT} />
              : null
          }
          <Box p={1.5} sx={{
            backgroundColor: el.incoming ? theme.palette.background.default :
              theme.palette.primary.main, borderRadius: 1.5, width: 'max-content'
          }}>
            <Typography variant='body2' color={el.incoming ? theme.palette.text : '#fff'} style={{ whiteSpace: 'pre-line' }}>
              {el.creator === 'assistant' ? <Typewriter originalText={el.content} /> : el.content}
            </Typography>
              {/* <Typography variant='body2' color={el.incoming ? theme.palette.text : '#fff'} style={{ whiteSpace: 'pre-line' }}>
                {el.creator === 'assistant' ? el.content : el.content}
              </Typography> */}
          </Box>
          {
            !el.incoming ?
              <img style={{ marginLeft: '12px' }} src={IMG_USER} />
              : null
          }
          {/* {menu && <MessageOptions />} */}
        </Stack>
    )
  )
}

const AudioMsg = ({ el, menu }) => {
  const audioRef = useRef()
  const theme = useTheme()
  const dispatch = useDispatch()
  const { history } = useSelector(store => store.app)
  const durationText = useMemo(() => {
    return formatDuration(el?.metadata?.duration || 0)
  }, [el])

  useEffect(() => {
    if (!el?.metadata) return
    if (el.metadata.isPlaying) {
      audioRef.current.play()
    } else {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
  }, [el])

  useEffect(() => {
    // return () => {
    //   console.log('as=da=sd=')
    //   audioRef.current = null
    // }
  }, [])

  function handleLoadedData() {
    dispatch(updateAudioDuration({
      id: el.id,
      duration: Math.ceil(audioRef.current?.duration || '')
    }))
    if (history.find(item => item.subtype === 'audio' && item.metadata.isPlaying)) return
    dispatch(updateAudioIsPlaying({
      id: el.id,
      isPlaying: true
    }))
  }

  function handleCanPlay() {
    // console.log('das-dsa-dsa', e, audioRef.current.duration)
    // if (history.find(item => item.subtype === 'audio' && item.metadata.isPlaying)) return
    // dispatch(updateHistoryItem({
    //   id: el.id,
    //   target: {
    //     metadata: {
    //       // ref: audioRef,
    //       isPlaying: true,
    //       duration: Math.ceil(audioRef.current.duration)
    //     }
    //   }
    // }))
    // audioRef.current.play()
    // console.log('da-sdas-d-as-d')
    // if (history.find(item => item.subtype === 'audio' && item.metadata.isPlaying)) return
    // dispatch(updateAudioIsPlaying({
    //   id: el.id,
    //   isPlaying: true
    // }))
  }

  function handlePlay() {
    const audioItem = history.find(item => item.subtype === 'audio' && item.metadata.isPlaying)
    // if (audioItem) {
    //   dispatch(updateHistoryItem({
    //     id: audioItem.id,
    //     target: {
    //       metadata: {
    //         ...audioItem.metadata,
    //         isPlaying: false
    //       }
    //     }
    //   }))
    //   // audioItem.metadata.ref.current.pause()
    //   // audioItem.metadata.ref.current.currentTime = 0
    // }
    // dispatch(updateHistoryItem({
    //   id: el.id,
    //   target: {
    //     metadata: {
    //       // ref: audioRef,
    //       isPlaying: !el.metadata.isPlaying,
    //       duration: Math.ceil(audioRef.current.duration)
    //     }
    //   }
    // }))
    if (audioItem) {
      dispatch(updateAudioIsPlaying({
        id: audioItem.id,
        isPlaying: false
      }))
    }
    dispatch(updateAudioIsPlaying({
      id: el.id,
      isPlaying: true
    }))
  }

  function handlePlayEnded() {
    dispatch(updateAudioIsPlaying({
      id: el.id,
      isPlaying: false
    }))
    // dispatch(updateHistoryItem({
    //   id: el.id,
    //   target: {
    //     metadata: {
    //       // ref: audioRef,
    //       isPlaying: false,
    //       duration: Math.ceil(audioRef.current.duration)
    //     }
    //   }
    // }))
  }

  return (
    <Stack direction='row' justifyContent={el.incoming ? 'start' : 'end'}>
      <Box p={1.5} sx={{
        backgroundColor: el.incoming ? theme.palette.background.default :
          theme.palette.primary.main, borderRadius: 1.5, width: 'max-content'
      }}>
        <div style={{ display: 'flex', alignItems: 'center' }} onClick={handlePlay}>
          <img src={ICON_VOICE} style={{ width: '24px', marginRight: '8px' }} />
          <AudioWave isPlaying={el?.metadata?.isPlaying} />
          <audio on ref={audioRef} onLoadedData={handleLoadedData} onCanPlay={handleCanPlay} onEnded={handlePlayEnded} src={el.content}></audio>
          <span style={{ marginLeft: '12px' }}>{durationText}</span>
        </div>
      </Box>
      {menu && <MessageOptions />}
    </Stack>
  )
}

const ProgressMsg = ({ el, menu }) => {
  const dispatch = useDispatch()
  const theme = useTheme();

  return (
    <Stack direction='row' justifyContent={el.incoming ? 'start' : 'end'}>
      <Box p={1.5} sx={{
        backgroundColor: el.incoming ? theme.palette.background.default :
          theme.palette.primary.main, borderRadius: 1.5, width: 'max-content'
      }}>
        <Stack spacing={1}>
          <CircularProgress value={el.content} variant="determinate" />
        </Stack>
      </Box>
      {menu && <MessageOptions />}
    </Stack>
  )
}

const TimeLine = ({ el }) => {
  const theme = useTheme();
  return <Stack direction='row' alignItems='center' justifyContent='center'>
    {/* <Divider width='46%' /> */}
    <Typography variant='caption' sx={{ color: theme.palette.text, whiteSpace: 'pre-wrap', textAlign: 'center' }}>
      {el.content}
    </Typography>
    {/* <Divider width='46%' /> */}
  </Stack>
}

const MessageOptions = () => {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <DotsThreeVertical
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        size={20}
      />

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <Stack spacing={1} px={1}>
          {Message_options.map((el) => (
            <MenuItem onClick={handleClick}>{el.title}</MenuItem>
          ))}
        </Stack>
      </Menu>
    </>
  )
}


// should not be default export, because we need to export multiple things
export { TimeLine, TextMsg, AudioMsg, MediaMsg, ReplyMsg, LinkMsg, DocMsg, ProgressMsg }