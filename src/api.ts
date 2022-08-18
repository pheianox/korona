import axios from "axios";

export const baseURL = "https://disease.sh/v3/covid-19";

export default axios.create({ baseURL });
