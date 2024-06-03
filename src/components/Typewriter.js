import { useState, useEffect } from "react";

export default function Typewriter({
  originalText
}) {
  const [text, setText] = useState('')

  useEffect(() => {
    let startIndex = 0;
    if (text) {
      startIndex = text.length
    }
    let currentIndex = startIndex;
    const interval = setInterval(() => {
      if (currentIndex <= originalText.length - 1) {
        setText(text + originalText.slice(startIndex, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 200);

    return () => {
      clearInterval(interval);
    };
  }, [originalText]);

  return (
    <span style={{ whiteSpace: 'pre-line' }}>{text}</span>
  )
}