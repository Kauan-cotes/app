import React from 'react';
import { SafeAreaView, ScrollView, Text, StatusBar, StyleSheet } from 'react-native';
import useMoto from '../hooks/useMoto';
import AlertaRevisao from '../components/AlertaRevisao';
import OdometroCard from '../components/OdometroCard';
import MediaSemanaCard from '../components/MediaSemanaCard';
import ItensCard from '../components/ItensCard';
import { cores } from '../theme/cores';

export default function HomeScreen() {
  const moto = useMoto();
  const atrasados = moto.itens.filter((i) => i.km_alvo - moto.km <= 0);

  return (
    <SafeAreaView style={estilos.tela}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={estilos.conteudo} keyboardShouldPersistTaps="handled">
        <Text style={estilos.titulo}>Manutenção da moto</Text>

        {moto.erro && <AlertaRevisao texto={moto.erro} />}
        {atrasados.map((i) => (
          <AlertaRevisao key={i.id} texto={`Pode ter chegado a hora da revisão: ${i.nome}`} />
        ))}

        <OdometroCard km={moto.km} onAjustar={moto.ajustarKm} />
        <MediaSemanaCard medias={moto.medias} onMudar={moto.mudarMedia} />
        <ItensCard
          itens={moto.itens}
          km={moto.km}
          onAdicionar={moto.adicionarItem}
          onConcluir={moto.concluirItem}
          onRemover={moto.removerItem}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  tela: { flex: 1, backgroundColor: cores.fundo },
  conteudo: { padding: 16, paddingTop: 40, gap: 14 },
  titulo: { fontSize: 28, fontWeight: '700', color: cores.texto },
});
