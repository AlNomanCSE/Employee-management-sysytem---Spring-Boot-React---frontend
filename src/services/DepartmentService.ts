import axios from "axios";

const REST_API_URL: string = "http://localhost:5000/api/departments";
export const listOfDepartments = () => axios.get(REST_API_URL);

type DepartmentData = {
    departmentName: string;
    departmentDescription: string;

};
export const addDepartment = (department: DepartmentData) =>
    axios.post(REST_API_URL, department);

// export const getEmployeeById = (id: number) => axios.get(REST_API_URL + "/" + id);
//
// export const updateEmployeeById = (id: number, employee: PersonData) => axios.put(REST_API_URL + "/" + id, employee);
//
// export const del