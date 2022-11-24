class APIHandler {
  constructor(baseUrl) {
    this.BASE_URL = baseUrl;
    this.api = axios.create({
      baseURL: baseUrl,
    });
  }

  getFullList() {
    return this.api.get("/characters");
  }

  getOneRegister(characterId) {
    return this.api.get(`/characters/${characterId}`);
  }

  createOneRegister(data) {
    return this.api.post(`/characters`, data);
  }

  updateOneRegister(characterId, data) {
    return this.api.put(`/characters/${characterId}`, data);
  }

  deleteOneRegister(characterId) {
    return this.api.delete(`/characters/${characterId}`);
  }
}
