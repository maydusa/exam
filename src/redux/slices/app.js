import { createSlice } from "@reduxjs/toolkit";
import { dispatch } from "../store";
import { formatText } from "../../utils";

// define initial state
const initialState = {
  sidebar: {
    open: false,
    type: "CONTACT",// can be CONTACT, STARRED,SHARED
  },
  history: [
    // {
    //   id: 0,
    //   type: "divider",
    //   content: "系统消息，旁白",
    // },
    // {
    //   id: 1,
    //   type: "msg",
    //   subtype: "audio",
    //   content: "http://47.102.107.196:5000/audio/multi_modal/text2voice/output/1710559910762.wav",
    //   incoming: true,
    //   outgoing: false,
    //   metadata: {
    //     isPlaying: false,
    //     duration: 0
    //   }
    // }
//     {
//       id: '1',
//       type: 'msg',
//       subtype: '',
//       content: formatText(`<json>\n{\n\"答案命中\": {\"问题1\":{\"垭口套/垭口分\": \"0\", \"窗口套/窗口分\": \"0\", \"踢脚线/地脚线\": \"0\"}, \"问题2\":{\"防水门\": \"0\", \"竹木纤维\": \"0\"}, \"问题3\":{\"桥洞力学板\": \"0\", \"隔音降噪\": \"0\", \"桥洞回旋消音\": \"0\"}, \"问题4\":{\"优于国家标准\": \"0\", \"ENF\": \"0\"}, \"问题5\":{\"PUR封边\": \"0\", \"不可逆\": \"0\"}},\n\"语气表达\": \"6\",\n\"语言逻辑性\": \"5\",\n\"话术技巧\": \"15\",\n\"打分理由\": \"用户的回答缺乏详细信息和关键词，无法满足问题中的具体查询。
// 在问题1中，没有提及配套产品如垭口套、窗口套、踢脚线等，未能展示对产品的全面了解。
// 问题2的回答过于简短，没有提及关键词'防水门'和'竹木纤维'，缺乏说服力。
// 问题3的回答也没有提到隔音相关的关键词，没有解释为什么门能隔音。
// 问题4和问题5的回答同样没有涉及到'优于国家标准'、'ENF'、'PUR封边'和'不可逆'等关键词。
// 在语气表达方面，用户的回答虽然简洁，但缺乏委婉和详细解释，显得不够专业。
// 在话术技巧方面，用户的回答未能准确解答客户问题，没有表现出识别客户需求的能力，沟通技巧和说服力不足，无法有效解决客户异议，缺乏跟进和维护客户关系的措施。
// \"\n}\n</json>`),
//       incoming: true,
//       outgoing: false,
//       metadata: {
//         duration: 0,
//         isPlaying: false
//       },
//       isShow: true,
//       creator: 'assistant',
//       audio: []
//     }
  ],
  preview: {
    isShow: false,
    url: ''
  },
  isRating: false,
  identify: '',
  isEnd: false,
  score: []
}

// create slice
const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    //Toggle sidebar
    toggleSidebar(state, action) {
      state.sidebar.open = !state.sidebar.open
    },
    updateSidebarType(state, action) {
      state.sidebar.type = action.payload.type;
    },
    updateHistory(state, action) {
      state.history = action.payload.history
    },
    appendHistory(state, action) {
      state.history = [
        ...state.history,
        ...(Array.isArray(action.payload) ? action.payload.map((item, index) => ({
          ...item,
          id: item.id || (state.history.length + index)
        })) : [action.payload])
      ]
    },
    updateHistoryItemById(state, action) {
      state.history = state.history.map(item => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            ...action.payload.data,
            id: item.id
          }
        } else {
          return item
        }
      })
    },
    updateHistoryItem(state, action) {
      state.history = state.history.map(item => {
        return {
          ...item,
          ...action.payload.target,
          metadata: {
            ...(item.metadata || {}),
            ...(item.id === action.payload.id ? (action.payload.target?.metadata || {}) : {}),
            isPlaying: item.id === action.payload.id ? action.payload.target?.metadata?.isPlaying : false
          }
        }
      })
      // const temp = [...state.history]
      // const targetIndex = temp.findIndex(item => item.id === action.payload.id)
      // if (targetIndex < 0) return
      // temp[targetIndex] = {
      //   ...temp[targetIndex],
      //   ...action.payload.target
      // }
      // console.log(temp)
      // state.history = temp
    },
    updateAudioDuration(state, action) {
      const temp = state.history.find(item => item.id === action.payload.id)
      temp.metadata.duration = action.payload.duration
    },
    updateAudioIsPlaying(state, action) {
      const temp = state.history.find(item => item.id === action.payload.id)
      temp.metadata.isPlaying = action.payload.isPlaying
    },
    updatePreview(state, action) {
      state.preview = {
        ...action.payload
      }
    },
    updateIsRating(state, action) {
      state.isRating = action.payload.isRating
    },
    updateIdentify(state, action) {
      state.identify = action.payload.identify
    },
    updateIsEnd(state, action) {
      state.isEnd = action.payload.isEnd
    },
    updateScore(state, action) {
      state.score = action.payload.score
    }
  }
});

// export reducer
export default slice.reducer;

//thunk functions - perform async operations
export function ToggleSidebar() {
  return async () => {
    dispatch(slice.actions.toggleSidebar());
  }
}

export function UpdateSidebarType(type) {
  return async () => {
    dispatch(slice.actions.updateSidebarType({
      type
    }))
  }
}

export function updateHistory(newHistory) {
  return async () => {
    dispatch(slice.actions.updateHistory(newHistory))
  }
}

export function appendHistory(newHistory) {
  return async () => {
    dispatch(slice.actions.appendHistory(newHistory))
  }
}

export function updateHistoryItemById(historyItem) {
  return async () => {
    dispatch(slice.actions.updateHistoryItemById(historyItem))
  }
}

export function updateHistoryItem(historyItem) {
  return async () => {
    dispatch(slice.actions.updateHistoryItem(historyItem))
  }
}

export function updateAudioDuration(audio) {
  return async () => {
    dispatch(slice.actions.updateAudioDuration(audio))
  }
}

export function updateAudioIsPlaying(audio) {
  return async () => {
    dispatch(slice.actions.updateAudioIsPlaying(audio))
  }
}

export function updatePreview(preview) {
  return async () => {
    dispatch(slice.actions.updatePreview(preview))
  }
}

export function updateIsRating(params) {
  return async () => {
    dispatch(slice.actions.updateIsRating(params))
  }
}

export function updateIdentify(params) {
  return async () => {
    dispatch(slice.actions.updateIdentify(params))
  }
}

export function updateIsEnd(params) {
  return async () => {
    dispatch(slice.actions.updateIsEnd(params))
  }
}

export function updateScore(params) {
  return async () => {
    dispatch(slice.actions.updateScore(params))
  }
}