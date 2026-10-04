import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { cores } from '../theme/cores';

export default function AlertaRevisao({ texto }) {
  return (
    <View style={estilos.caixa}>
      <Text style={estilos.texto}>{texto}</Text>
    </View>
  );
}

const estilos = StyleSheet.create({
  caixa: { backgroundColor: cores.alerta, borderRadius: 8, padding: 12 },
  texto: { color: '#fff', fontWeight: '700' },
});
