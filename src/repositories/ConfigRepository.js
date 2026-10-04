import ApiClient from '../services/ApiClient';

class ConfigRepository {
  async buscar(chave, padrao) {
    const r = await ApiClient.get('/config/' + chave);
    return r.valor === null ? padrao : r.valor;
  }

  salvar(chave, valor) {
    return ApiClient.put('/config/' + chave, { valor });
  }
}

export default new ConfigRepository();
