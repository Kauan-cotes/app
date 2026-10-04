import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import Card from './Card';
import { cores } from '../theme/cores';
import { formatarKm } from '../utils/formatar';

export default function OdometroCard({ km, onAjustar }) {
  const [valor, setValor] = useState('');

  function ajustar() {
    const numero = Number(valor);
    if (!valor || !(numero >= 0)) return;
    onAjustar(numero);
    setValor('');
  }

  return (
    <Card>
      <Text style={estilos.suave}>Km atual (estimado)</Text>
      <Text style={estilos.km}>{formatarKm(km)} km</Text>
      <View style={estilos.linha}>
        <TextInput
          style={estilos.input}
          placeholder="Ajustar km (ex: 63500)"
          keyboardType="numeric"
          value={valor}
          onChangeText={setValor}
        />
        <Pressable style={estilos.botao} onPress={ajustar}>
          <Text style={estilos.botaoTexto}>Ajustar</Text>
        </Pressable>
      </View>
    </Card>
  );
}

const estilos = StyleSheet.create({
  suave: { color: cores.suave, fontSize: 13 },
  km: { fontSize: 46, fontWeight: '700', color: cores.principal },
  linha: { flexDirection: 'row', gap: 8 },
  input: { flex: 1, borderWidth: 1, borderColor: cores.linha, borderRadius: 6, padding: 10, backgroundColor: cores.fundo, fontSize: 16 },
  botao: { backgroundColor: cores.principal, borderRadius: 6, padding: 12, justifyContent: 'center' },
  botaoTexto: { color: '#fff', fontWeight: '700' },
});
