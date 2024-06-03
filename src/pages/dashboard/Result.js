import { useEffect, useMemo, useRef, useState } from "react"
import { Card, CardContent, Typography } from "@mui/material"
import { useSelector } from "react-redux"
import IMG_RATE from '../../assets/svg/rate.svg'
import VIDEO from '../../assets/course.mp4'
import IMG_COVER from '../../assets/cover.png'
import IMG_PLAY from '../../assets/svg/play.svg'
import AUDIO from '../../assets/speech.mp3'
import Typewriter from "../../components/Typewriter"
import Header from "../../components/Conversation/Header"
import ReactECharts from 'echarts-for-react';
import '../../css/loading.css'
import Rectangle from '../../assets/Images/rectangle.png'

// const score = [
//   {
//     score_name: 'adasdsadd',
//     score: 10,
//     content: 'asdasdsad'
//   },
//   {
//     score_name: 'bqwwqeqwew',
//     score: 20,
//     content: 'asdasdsad'
//   },
//   {
//     score_name: 'casdasdsa',
//     score: 40,
//     content: 'asdasdsad'
//   },
//   {
//     score_name: 'dwqeqwewqewq',
//     score: 60,
//     content: 'asdasdsad'
//   },
//   {
//     score_name: '总分',
//     score: 20,
//     content: 'asdasdsad'
//   }
// ]

export default function Result() {
  const { history, identify, score } = useSelector((store) => store.app)
  const [isShowVideoPlanel, setIsShowVideoPanel] = useState()

  const echartsRef = useRef()

  const rateText = useMemo(() => {
    const historyItem = history?.[history.length - 1]
    return historyItem?.isShow ? historyItem?.content : ''
  }, [history])

  const options = useMemo(() => {
    if (!score.length) return null
    const otherItems = score.filter(item => item.score_name !== '总分')
    const indicator = otherItems.map(item => ({
      name: item.score_name,
      max: 100
    }))
    const value = otherItems.map(item => Number(item.score))
    const option = {
      title: {
        show: false
      },
      tooltip: {},
      legend: {
        show: false
      },
      label: {
        show: true
      },
      radar: {
        // shape: 'circle',
        indicator: indicator,
        radius: '50%'
      },
      series: [{
        type: 'radar',
        // areaStyle: {normal: {}},
        data: [
          {
            value: value,
          },
        ]
      }]
    };

    return option
  }, [score])

  const otherItems = useMemo(() => {
    if (!score.length) return []

    const items = score.filter(item => item.score_name !== '总分')

    return items
  }, [score])

  const totalItem = useMemo(() => {
    if (!score.length) return null

    const item = score.find(item => item.score_name === '总分')

    return item
  }, [score])

  useEffect(() =>  {
    echartsRef?.current?.getEchartsInstance?.()?.resize?.()
  }, [score])

  function handleVideo() {
    setIsShowVideoPanel(true)
  }

  function handleClose(e) {
    setIsShowVideoPanel(false)
  }

  function handlePlay() {
    window.player?.pause?.()
    window.isPlaying = false
  }

  return (
    <div style={{ width: '100%', backgroundColor: '#F0F4FA', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Header type="score" />
      
      {
        score?.length ?
          <div style={{ width: '88vw', marginTop: '22px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ marginBottom: '16px', fontWeight: 'bold', alignSelf: 'flex-start' }}>{`您本次考试综合得分${totalItem?.score}分。各维度得分如下：`}</div>
            <ReactECharts
              ref={echartsRef}
              option={options}
              style={{ width: '100%' }}
            />

            <div style={{ width: '88vw' }}>
              {
                otherItems.map((item, index) => {
                  return (
                    <div style={{ width: '100%', marginTop: index > 0 ? '18px' : '0' }} key={item.score_name}>
                      <div style={{ backgroundImage: `url(${Rectangle})`, backgroundSize: '160px 6px', backgroundRepeat: 'no-repeat', backgroundPosition: 'bottom 2px left', fontSize: '18px', fontWeight: 'bold' }}>{item.score_name}</div>
                      <div style={{ fontSize: '16px', marginTop: '4px' }}>{item.content}</div>
                    </div>
                  )
                })
              }
              <div style={{ fontSize: '16px', fontWeight: 'bold', marginTop: '24px' }}>{totalItem.content}</div>
            </div>
          </div>
          :
        <div style={{ marginTop: '22px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className="loader"></div>
          <div style={{ fontSize: '14px', marginTop: '12px' }}>评分中，请耐心等待</div>
        </div>
      }


      {/* {
        identify !== 'chat' || true ?
          <div style={{ width: '100%', marginTop: '22px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ marginBottom: '16px' }}>{`您本次考试综合得分${totalItem.score}分。各维度得分如下：`}</div>
            <ReactECharts
              option={options}
              style={{ width: '80%' }}
            />

            <div>
            </div>
          </div>

          // <div style={{ marginTop: '22px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          //   <div className="loader"></div>
          //   <div style={{ fontSize: '14px', marginTop: '12px' }}>评分中，请耐心等待</div>
          // </div>
          : null
      } */}

      <div style={{ marginTop: '62px', marginBottom: '16px' }}>建议课程如下...</div>
      <ol style={{ width: '88vw', paddingLeft: '16px', marginBottom: '18px' }}>
        <li>环保 7 号板材产品知识卖点一览.</li>
        <li>顾家家居华东区Top sales顾佳佳销售话术</li>
        <li>顾家家居产品设计部-.环保 7 号板材产品开发设计思路</li>
      </ol>
      

      {/* {
        isShowVideoPlanel ?
          <div style={{ width: '88vw', height: '50vw', borderRadius: '10px', overflow: 'hidden' }}>
            <Plyr ref={plyrRef} source={{
              type: 'video',
              sources: [{
                src: VIDEO,
                type: 'video/mp4',
              }],
              poster: IMG_COVER
            }} />
          </div> :
          <div style={{ width: '88vw', height: '50vw', borderRadius: '10px', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }} onClick={handleVideo}>
            <img src={IMG_COVER} style={{ width: '100%', height: '100%', position: 'absolute', top: '0', left: '0' }} />
            <div style={{ width: '100%', height: '100%', position: 'absolute', top: '0', left: '0', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}></div>
            <img src={IMG_PLAY} style={{ position: 'relative' }} />
          </div>
      } */}

      {/* <div style={{ width: '88vw', height: '50vw', borderRadius: '10px', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }} onClick={handleVideo}>
        <img src={IMG_COVER} style={{ width: '100%', height: '100%', position: 'absolute', top: '0', left: '0' }} />
        <div style={{ width: '100%', height: '100%', position: 'absolute', top: '0', left: '0', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}></div>
        <img src={IMG_PLAY} style={{ position: 'relative' }} />
      </div> */}


      <div style={{ width: '88vw', height: '157vw', borderRadius: '10px', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }} onClick={handleVideo}>
        <video src={VIDEO} controls style={{ width: '100%' }} />
      </div>


      {
        isShowVideoPlanel ?
          <div style={{ width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.7)', position: 'fixed', top: 0, left: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }} onClick={handleClose}>
            <video src={VIDEO} style={{ width: '100%' }} controls onPlay={handlePlay} />
          </div>
        : null
      }
    </div>
  )
}