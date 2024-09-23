import axios from "axios";

const REST_API_URL: string = "http://localhost:5000/api/employees";
export const listOfEmployees = () => axios.get(REST_API_URL);

type PersonData = {
    firstName: string;
    lastName: string;
    email: string;
};
export const addEmployee = (employee: PersonData) =>
    axios.post(REST_API_URL, employee);

export const getEmployeeById = (id: number) => axios.get(REST_API_URL + "/" + id);

export const updateEmployeeById = (id: number, employee: PersonData) => axios.put(REST_API_URL + "/" + id, employee);

export const deleteEmployeeById = (id:number)=>axios.delete(REST_API_URL+"/"+id);