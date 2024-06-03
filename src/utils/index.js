export function formatDuration(duration) {
  const seconds = duration % 60
  return `${(duration - seconds) / 60}’${seconds}’`
}

export function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      resolve(e.target.result);
    };
    fileReader.readAsDataURL(blob);
    fileReader.onerror = () => {
      reject(new Error('blobToBase64 error'));
    };
  });
}

export function dataURItoBlob(base64DataArr) {
  var byteString;
  base64DataArr.forEach(item => {
    byteString += window.atob(item);
  })
  var mimeString = 'audio/mp3';

  var ia = new Uint8Array(byteString.length);//创建视图
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  var blob = new Blob([ia], {
    type: mimeString
  });
  return blob;
}

function calcScore(json) {
  let score = 0
  for (let key in json) {
    if (!isNaN(Number(json[key]))) {
      score += Number(json[key])
    } else if (typeof json[key] === 'object') {
      score += calcScore(json[key])
    }
  }

  return score
}

export function formatText(originalText) {
  if (!originalText) return ''

  const text = originalText.replace('顾客：', '').replace('销售：', '')

  const m = text.match(/<json[^>]*>([^<]|<(?!\/json))*(<\/json>)/)

  if (!m) return text

  let json = null
  try {
    json = JSON.parse(m[0].slice('<json>'.length, m[0].length - m[2].length).replaceAll('\n', ''))
  } catch(e) {
    console.error('json parse error')
  }
 
  let reason = json['打分理由']
  const score = calcScore(json)

  const otherTexts = text.split(m[0])

  return `${otherTexts[0]}\n得分：${score}分\n打分理由：${reason}\n${otherTexts[1]}`
}