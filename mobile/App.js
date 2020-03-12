import React, { useEffect } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import io from 'socket.io-client';

export default function App() {
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
    const socket = io('http://192.168.0.130:3000');
  }, []);

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>TaxiApp</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Send a message" />
      </View>
    </>
  );
};
