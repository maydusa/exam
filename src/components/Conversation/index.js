import { Box, Stack } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from "@mui/material/styles";
import Header from './Header';
import Footer from './Footer';
import Message from './Message';
import { Chat_History } from '../../data'
import { useSelector, useDispatch } from 'react-redux'
import { appendHistory, updateAudioInstance, updateHistoryItem, updatePreview } from '../../redux/slices/app'

const Conversation = () => {
  const { history, preview } = useSelector((store) => store.app);
  const dispatch = useDispatch()
  const theme = useTheme();
  const scrollContainer = useRef(null)

  // const timer = useRef(null)

  function handleClosePreview() {
    dispatch(updatePreview({
      isShow: false,
      url: ''
    }))
  }

  useEffect(() => {
    scrollContainer.current.scrollTo({
      top: Number.MAX_SAFE_INTEGER,
      behavior: 'smooth'
    })
  }, [history.length])

  return (
    <Stack height={'100%'} width={'auto'}>
      {/* Chat header */}
      <Header />
      {/* <div onClick={() => {
        console.log(history)
      }}>click</div> */}
      {/* Msg */}
      <Box className='scrollbar' ref={scrollContainer} width={"100%"} sx={{ flex: 1, overflowY: 'scroll' }}>
        <Message />
      </Box>
      {/* Chat footer */}
      {
        preview.isShow &&
        <div onClick={handleClosePreview} style={{ zIndex: 1000, position: 'fixed', width: '100vw', height: '100vh', backgroundColor: 'rgba(0, 0, 0, 0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img style={{ width: window.isMobile ? '100%' : '70%' }} src={preview.url} />
        </div>
      }
      <Footer />
    </Stack>
  )
}

export default Conversation