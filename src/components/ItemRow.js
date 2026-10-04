import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { cores } from '../theme/cores';
import { formatarKm } from '../utils/formatar';

export default function ItemRow({ item, km, onConcluir, onRemover }) {
  const faltam = item.km_alvo - km;
  const atrasado = faltam <= 0;

  return (
    <View style={estilos.linha}>
      <View style={{ flex: 1 }}>
        <Text style={estilos.nome}>{item.nome}</Text>
        <Text style={estilos.suave}>
          {atrasado ? 'Passou do ponto de troca' : 'faltam'}
          {item.repetir > 0 ? ` · repete a cada ${formatarKm(item.repetir)} km` : ''}
        </Text>
      </View>
      <Text style={[estilos.falta, atrasado && { color: cores.alerta }]}>
        {atrasado ? '0 km' : `${formatarKm(faltam)} km`}
      </Text>
      <View style={{ gap: 6 }}>
        <Pressable style={estilos.botao} onPress={() => onConcluir(item)}><Text>Feito</Text></Pressable>
        <Pressable style={estilos.botao} onPress={() => onRemover(item)}><Text>Remover</Text></Pressable>
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  linha: { flexDirection: 'row', alignItems: 'center', gap: 10, borderTopWidth: 1, borderTopColor: cores.linha, paddingVertical: 10 },
  nome: { fontWeight: '700', fontSize: 16 },
  suave: { color: cores.suave, fontSize: 13 },
  falta: { fontSize: 24, fontWeight: '700' },
  botao: { borderWidth: 1, borderColor: cores.linha, borderRadius: 6, paddingVertical: 6, paddingHorizontal: 10, alignItems: 'center' },
});
