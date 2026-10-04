import ConfigRepository from '../repositories/ConfigRepository';
import MediaRepository from '../repositories/MediaRepository';
import { iso, lerIso, hoje } from '../utils/data';

class OdometroService {
  // Soma a média de cada dia que passou desde a última data base.
  async sincronizar() {
    let km = Number(await ConfigRepository.buscar('km', '0'));
    const base = await ConfigRepository.buscar('base', iso(new Date()));
    const medias = await MediaRepository.listar();

    const fim = hoje();
    const dia = lerIso(base);
    while (dia < fim) {
      km += Number(medias[dia.getDay()]) || 0;
      dia.setDate(dia.getDate() + 1);
    }

    await ConfigRepository.salvar('km', km);
    await ConfigRepository.salvar('base', iso(fim));
    return km;
  }

  // Ajuste manual: define o km real da moto a partir de hoje.
  async ajustar(valor) {
    await ConfigRepository.salvar('km', valor);
    await ConfigRepository.salvar('base', iso(new Date()));
  }

  // Quantos dias até o km faltante chegar a 0, usando as médias.
  diasAteZerar(faltam, medias) {
    let resta = faltam;
    const dia = hoje();
    for (let i = 0; i < 1000; i++) {
      resta -= Number(medias[dia.getDay()]) || 0;
      if (resta <= 0) return i;
      dia.setDate(dia.getDate() + 1);
    }
    return null;
  }
}

export default new OdometroService();
