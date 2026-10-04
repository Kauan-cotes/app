import { useState, useEffect, useCallback } from 'react';
import { AppState } from 'react-native';
import OdometroService from '../services/OdometroService';
import NotificacaoService from '../services/NotificacaoService';
import MediaRepository from '../repositories/MediaRepository';
import ItemRepository from '../repositories/ItemRepository';

export default function useMoto() {
  const [km, setKm] = useState(0);
  const [medias, setMedias] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [itens, setItens] = useState([]);
  const [erro, setErro] = useState(null);

  const carregar = useCallback(async () => {
    try {
      const kmAtual = await OdometroService.sincronizar();
      const [listaMedias, listaItens] = await Promise.all([
        MediaRepository.listar(),
        ItemRepository.listar(),
      ]);
      setKm(kmAtual);
      setMedias(listaMedias);
      setItens(listaItens);
      setErro(null);
      try {
        await NotificacaoService.reagendar(listaItens, kmAtual, listaMedias);
      } catch (e) {
        console.warn('Notificações:', e.message);
      }
    } catch (e) {
      setErro('Não foi possível conectar à API. Confira se ela está rodando e se o IP em src/config/api.js está certo.');
    }
  }, []);

  useEffect(() => {
    NotificacaoService.pedirPermissao();
    carregar();
    const sub = AppState.addEventListener('change', (estado) => {
      if (estado === 'active') carregar();
    });
    return () => sub.remove();
  }, [carregar]);

  const ajustarKm = async (valor) => {
    await OdometroService.ajustar(valor);
    await carregar();
  };

  const mudarMedia = async (dia, valor) => {
    const novas = [...medias];
    novas[dia] = valor;
    setMedias(novas);
    await MediaRepository.salvar(dia, valor);
    await carregar();
  };

  const adicionarItem = async (nome, faltam, repetir) => {
    await ItemRepository.criar(nome, km + faltam, repetir);
    await carregar();
  };

  const concluirItem = async (item) => {
    await ItemRepository.concluir(item.id, km);
    await carregar();
  };

  const removerItem = async (item) => {
    await ItemRepository.remover(item.id);
    await carregar();
  };

  return { km, medias, itens, erro, ajustarKm, mudarMedia, adicionarItem, concluirItem, removerItem };
}
