import { useEffect, useMemo, useRef, useState } from "react"
import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateIdentify } from "../../redux/slices/app";

export default function Home() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [mode, setMode] = useState('')
  const [examMode, setExamMode] = useState('')

  const audioRef = useRef()

  const disabled = useMemo(() => {
    return !mode || (mode === 'exam' && !examMode)
  }, [mode, examMode])

  function handleMode(event) {
    const value = event.target.value
    setMode(value)
    localStorage.setItem('mode', value)
  }

  function handleExamMode(event) {
    const value = event.target.value
    setExamMode(value)
    localStorage.setItem('examMode', value)
  }

  function handleBegin() {
    navigate('/chat')
  }

  function handleTest() {
    try {
      window.player = new Audio()
      window.player.src = ''
      window.player.play()?.then(() => {
        window.player.pause()
      })?.catch(e => {console.log('----')})
    } catch(e) {
      console.log(e)
    }
  }

  function handleGuide() {
    handleTest()
    dispatch(updateIdentify({ identify: 'exercise' }))
    handleBegin()
  }

  function handleGuest() {
    handleTest()
    dispatch(updateIdentify({ identify: 'chat' }))
    handleBegin()
  }

  function handleExam() {
    handleTest()
    dispatch(updateIdentify({ identify: 'exam' }))
    handleBegin()
  }

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      {/* <FormControl>
        <InputLabel id="demo-simple-select-label">模式</InputLabel>
        <Select
          style={{ width: '220px' }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={mode}
          label="模式"
          onChange={handleMode}
        >
          <MenuItem value={'exam'}>考试</MenuItem>
          <MenuItem value={'exercise'}>练习</MenuItem>
        </Select>
      </FormControl>
      
      {
        mode === 'exam' ?
          <FormControl style={{marginTop: '18px'}}>
            <InputLabel id="demo-simple-select-label-exammode">考试内容</InputLabel>
            <Select
              style={{ width: '220px' }}
              labelId="demo-simple-select-label-exammode"
              id="demo-simple-select-exammode"
              value={examMode}
              label="考试内容"
              onChange={handleExamMode}
            >
              <MenuItem value={'panel'}>panel</MenuItem>
              <MenuItem value={'wardrobe'}>wardrobe</MenuItem>
              <MenuItem value={'wallboard'}>wallboard</MenuItem>
            </Select>
          </FormControl>
          : null
      } */}
      <audio src="" ref={audioRef} />
      <Button variant="contained" style={{ width: '180px', marginTop: '28px' }} onClick={handleGuide}>练习（导购）</Button>
      <Button variant="contained" style={{ width: '180px', marginTop: '28px' }} onClick={handleGuest}>练习（顾客）</Button>
      <Button variant="contained" style={{ width: '180px', marginTop: '28px' }} onClick={handleExam}>考试</Button>
    </div>
  )
}