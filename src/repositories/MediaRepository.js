import ApiClient from '../services/ApiClient';

class MediaRepository {
  listar() {
    return ApiClient.get('/medias');
  }

  salvar(dia, km) {
    return ApiClient.put('/medias/' + dia, { km });
  }
}

export default new MediaRepository();
