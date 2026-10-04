import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import OdometroService from './OdometroService';
import ItemRepository from '../repositories/ItemRepository';

class NotificacaoService {
  constructor() {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldShowBanner: true,
        shouldShowList: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });
  }

  async pedirPermissao() {
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('revisoes', {
        name: 'Revisões da moto',
        importance: Notifications.AndroidImportance.MAX,
      });
    }
    const { status } = await Notifications.getPermissionsAsync();
    if (status !== 'granted') await Notifications.requestPermissionsAsync();
  }

  // Recalcula e agenda o aviso de cada item para o dia estimado, às 8h.
  async reagendar(itens, km, medias) {
    await Notifications.cancelAllScheduledNotificationsAsync();

    for (const item of itens) {
      const faltam = item.km_alvo - km;
      let quando;

      if (faltam <= 0) {
        if (item.avisado) continue;
        quando = new Date(Date.now() + 3000);
        await ItemRepository.marcarAvisado(item.id);
      } else {
        const dias = OdometroService.diasAteZerar(faltam, medias);
        if (dias === null) continue;
        quando = new Date();
        quando.setDate(quando.getDate() + dias + 1);
        quando.setHours(8, 0, 0, 0);
      }

      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Revisão da moto',
          body: `Pode ter chegado a hora da revisão: ${item.nome}`,
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.DATE,
          date: quando,
          channelId: 'revisoes',
        },
      });
    }
  }
}

export default new NotificacaoService();
