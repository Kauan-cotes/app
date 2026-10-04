import React from 'react';
import { Text, StyleSheet } from 'react-native';
import Card from './Card';
import ItemRow from './ItemRow';
import NovoItemForm from './NovoItemForm';
import { cores } from '../theme/cores';

export default function ItensCard({ itens, km, onAdicionar, onConcluir, onRemover }) {
  return (
    <Card>
      <Text style={estilos.subtitulo}>Itens para trocar</Text>
      {itens.length === 0 && (
        <Text style={estilos.suave}>Nenhum item ainda. Cadastre o primeiro abaixo.</Text>
      )}
      {itens.map((item) => (
        <ItemRow key={item.id} item={item} km={km} onConcluir={onConcluir} onRemover={onRemover} />
      ))}
      <NovoItemForm onAdicionar={onAdicionar} />
    </Card>
  );
}

const estilos = StyleSheet.create({
  subtitulo: { fontSize: 20, fontWeight: '700', color: cores.texto },
  suave: { color: cores.suave, fontSize: 13 },
});
