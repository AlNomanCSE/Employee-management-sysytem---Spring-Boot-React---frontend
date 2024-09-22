import axios from "axios";
const REST_API_URL: string = "http://localhost:8080/api/employees";
export const listOfEmployees = () => axios.get(REST_API_URL);
