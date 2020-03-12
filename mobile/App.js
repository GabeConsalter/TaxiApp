import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import io from 'socket.io-client';

export default function App() {
  useEffect(() => {
    const socket = io('http://192.168.0.130:3000');
  }, []);

  return (
    <>
      <View>
        <Text>Hello TaxiApp</Text>
      </View>
    </>
  );
};
