import React, { useEffect, useState } from 'react';

import {io} from 'socket.io-client'

import {ScrollView} from 'react-native';
import { api } from '../../services/api';

import { Message, MessageProps } from '../Message';

import { styles } from './styles';

let messagesQueue: MessageProps[] = []

const socket = io(String(api.defaults.baseURL))

socket.on('new_message', (newMessage)=> {
  messagesQueue.push(newMessage)
  console.log(newMessage)
})

export function MessagesList(){
  const [currentMessages, setCurentMessages ] = useState<MessageProps[]> ([]);

  useEffect(()=>{
    async function fetchMessages() {
      const messagesResponse = await api.get<MessageProps[]>('/messages/last3')
      setCurentMessages(messagesResponse.data)
    }
    fetchMessages()
  }, [])

  useEffect(()=> {
    const timer = setInterval(()=>{
      if(messagesQueue.length > 0) {
        setCurentMessages(prevState=> [messagesQueue[0], prevState[0], prevState[1]])
        messagesQueue.shift()
      }

      return() => clearInterval(timer)
    }, 3000)

  }, [])

  return (
    <ScrollView 
    style={styles.container}
    contentContainerStyle={styles.content}
    keyboardShouldPersistTaps='never'
    >
      
    {currentMessages.map((message)=> <Message key={message.id} data={message} /> )}
      
    
    </ScrollView>
  );
}