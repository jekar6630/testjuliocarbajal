import React from 'react';
import { StyleSheet } from 'react-native';
import Banks from "./app/screens/Banks";

export default function App() {
  return (
    <Banks />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
