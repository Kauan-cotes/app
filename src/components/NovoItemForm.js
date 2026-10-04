import React, { useState } from 'react';
import { View, TextInput, Pressable, Text, StyleSheet } from 'react-native';
import { cores } from '../theme/cores';

export default function NovoItemForm({ onAdicionar }) {
  const [nome, setNome] = useState('');
  const [faltam, setFaltam] = useState('');
  const [repetir, setRepetir] = useState('');

  function adicionar() {
    const f = Number(faltam);
    if (!nome.trim() || !(f > 0)) return;
    onAdicionar(nome.trim(), f, Number(repetir) || 0);
    setNome('');
    setFaltam('');
    setRepetir('');
  }

  return (
    <View style={{ gap: 10 }}>
      <TextInput style={estilos.input} placeholder="Item (óleo, pneu, relação...)" value={nome} onChangeText={setNome} />
      <View style={estilos.linha}>
        <TextInput style={[estilos.input, { flex: 1 }]} placeholder="Trocar em (km)" keyboardType="numeric" value={faltam} onChangeText={setFaltam} />
        <TextInput style={[estilos.input, { flex: 1 }]} placeholder="Repetir a cada" keyboardType="numeric" value={repetir} onChangeText={setRepetir} />
      </View>
      <Pressable style={estilos.botao} onPress={adicionar}>
        <Text style={estilos.botaoTexto}>Adicionar item</Text>
      </Pressable>
    </View>
  );
}

const estilos = StyleSheet.create({
  linha: { flexDirection: 'row', gap: 8 },
  input: { borderWidth: 1, borderColor: cores.linha, borderRadius: 6, padding: 10, backgroundColor: cores.fundo, fontSize: 16 },
  botao: { backgroundColor: cores.principal, borderRadius: 6, padding: 12, alignItems: 'center' },
  botaoTexto: { color: '#fff', fontWeight: '700' },
});
