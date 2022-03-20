import axios from "axios";

axios.defaults.baseURL = "http://localhost:9000";

const addCard = async (body) => await axios.post("/add-card", body);

export { addCard };
