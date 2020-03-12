import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import io from 'socket.io-client';

let socket;

export default function App() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      flex: 1,
      padding: 16
    },

    textInput: {
      height: 60,
      backgroundColor: '#EFEFEF',
      width: '100%',
      paddingHorizontal: 8,
      borderRadius: 7,
      position: 'absolute',
      bottom: 16
    },

    title: {
      backgroundColor: '#383838',
      paddingHorizontal: 8,
      paddingVertical: 4,
      fontWeight: 'bold',
      color: '#FFF',
      borderRadius: 7
    }
  });

  useEffect(() => {
    socket = io('http://192.168.0.130:3000');
  }, []);

  function sendMessage() {
    const newMessage = {
      text: message,
      sended: true,
      date: new Date()
    };

    messages.push(newMessage);

    socket.emit('newMessage', newMessage.text);

    setMessage('');
  }

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>TaxiApp</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Send a message"
          value={message}
          onChangeText={message => setMessage(message)}
          onSubmitEditing={() => sendMessage()} />
      </View>
    </>
  );
};
