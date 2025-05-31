// App.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { io } from 'socket.io-client';

const SOCKET_URL = 'http://192.168.2.104:3000'; // replace with your IP

export default function HelloWrold() {
  const [status, setStatus] = useState('Connecting...');

  useEffect(() => {
    const socket = io(SOCKET_URL, {
      transports: ['websocket'],
    });

    socket.on('connect', () => {
      console.log('Connected ✅', socket.id);
      setStatus('Connected ✅');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected ❌');
      setStatus('Disconnected ❌');
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.statusText}>Socket Status: {status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  statusText: { fontSize: 20, fontWeight: 'bold' },
});
