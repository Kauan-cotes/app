import ApiClient from '../services/ApiClient';

class ItemRepository {
  listar() {
    return ApiClient.get('/itens');
  }

  criar(nome, kmAlvo, repetir) {
    return ApiClient.post('/itens', { nome, kmAlvo, repetir });
  }

  remover(id) {
    return ApiClient.delete('/itens/' + id);
  }

  concluir(id, kmAtual) {
    return ApiClient.post('/itens/' + id + '/concluir', { kmAtual });
  }

  marcarAvisado(id) {
    return ApiClient.post('/itens/' + id + '/avisado');
  }
}

export default new ItemRepository();
