class APIHandler {
  constructor() {
    this.api = axios.create({
      baseURL: "http://localhost:8000",
    });
  }

  getFullList = () => {
    return this.api.get("/characters");
  };

  getOneCharacter = (characterId) => {
    return this.api.get(`/characters/${characterId}`);
  };

  createOneCharacter = (characterInfo) => {
    return this.api.post(`/characters`, characterInfo);
  };

  updateOneCharacter = (characterId, characterInfo) => {
    return this.api.put(`/characters/${characterId}`, characterInfo);
  };

  deleteOneCharacter = (characterId) => {
    return this.api.delete(`/characters/${characterId}`);
  };
}
