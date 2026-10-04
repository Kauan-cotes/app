import { API_URL } from '../config/api';

class ApiClient {
  async request(caminho, metodo = 'GET', corpo) {
    const resposta = await fetch(API_URL + caminho, {
      method: metodo,
      headers: { 'Content-Type': 'application/json' },
      body: corpo ? JSON.stringify(corpo) : undefined,
    });
    if (!resposta.ok) throw new Error('Erro na API: ' + resposta.status);
    const texto = await resposta.text();
    return texto ? JSON.parse(texto) : null;
  }

  get(caminho) { return this.request(caminho); }
  post(caminho, corpo) { return this.request(caminho, 'POST', corpo); }
  put(caminho, corpo) { return this.request(caminho, 'PUT', corpo); }
  delete(caminho) { return this.request(caminho, 'DELETE'); }
}

export default new ApiClient();
