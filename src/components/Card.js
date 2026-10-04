import React from 'react';
import { View, StyleSheet } from 'react-native';
import { cores } from '../theme/cores';

export default function Card({ children }) {
  return <View style={estilos.card}>{children}</View>;
}

const estilos = StyleSheet.create({
  card: {
    backgroundColor: cores.card,
    borderRadius: 10,
    padding: 16,
    gap: 10,
    borderWidth: 1,
    borderColor: cores.linha,
  },
});
