import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import Card from './Card';
import { cores } from '../theme/cores';

const DIAS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

export default function MediaSemanaCard({ medias, onMudar }) {
  return (
    <Card>
      <Text style={estilos.subtitulo}>Média de km por dia</Text>
      <View style={estilos.semana}>
        {DIAS.map((nome, i) => (
          <View key={nome} style={estilos.dia}>
            <Text style={estilos.suave}>{nome}</Text>
            <TextInput
              style={estilos.input}
              keyboardType="numeric"
              value={String(medias[i])}
              onChangeText={(texto) => onMudar(i, Number(texto) || 0)}
            />
          </View>
        ))}
      </View>
    </Card>
  );
}

const estilos = StyleSheet.create({
  subtitulo: { fontSize: 20, fontWeight: '700', color: cores.texto },
  suave: { color: cores.suave, fontSize: 13 },
  semana: { flexDirection: 'row', gap: 4 },
  dia: { flex: 1, alignItems: 'center', gap: 4 },
  input: { width: '100%', textAlign: 'center', borderWidth: 1, borderColor: cores.linha, borderRadius: 6, padding: 8, backgroundColor: cores.fundo, fontSize: 16 },
});
