import { Box, Stack } from '@mui/material'
import React from 'react';
import { useSelector } from 'react-redux'
import { DocMsg, LinkMsg, MediaMsg, ReplyMsg, TextMsg, TimeLine, AudioMsg, ProgressMsg } from './MsgTypes';

const Message = ({menu}) => {
  const { history } = useSelector((store) => store.app);
  console.log(history)
  return (
    <Box p={3}>
        <Stack spacing={3}>
        {history.map((el, index)=>{
                switch (el.type) {
                    case 'divider':
                      return null
                    // return <TimeLine el={el} key={el.message} />
                        
                    case 'msg':
                        switch (el.subtype) {
                            case 'image':
                              return <MediaMsg el={el} key={index} />
                            case 'doc':
                            return <DocMsg el={el} key={index} />
                            case 'audio':
                            return <AudioMsg el={el} key={index} />
                            case 'link':
                            return <LinkMsg el={el} key={index} />
                            case 'reply':
                            return <ReplyMsg el={el} key={index} />
                            case 'progress':
                            return <ProgressMsg el={el} key={index} />
                        
                            default:
                            return <TextMsg el={el} key={index} />
                        }
                        break;
                
                    default:
                      return <></>;
                }
            })}
        </Stack>
    </Box>
  )
}

export default Message