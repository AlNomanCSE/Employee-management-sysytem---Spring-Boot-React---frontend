import React, {useEffect, useState} from "react";
import {deleteEmployeeById, listOfEmployees} from "../services/EmployeeService";
import {useNavigate} from "react-router-dom";
import {getDepartmentById} from "../services/DepartmentService.ts";

type PersonData = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    departmentId: number
};
type DepartmentNames = {
    [key: number]: string;
};

const EmployeeList: React.FC = () => {
    const [employees, setEmployees] = useState<PersonData[]>([]);
    const [departmentNames, setDepartmentNames] = useState<DepartmentNames>({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        getAllEmployees();
    }, []);
    useEffect(() => {
        if (employees.length > 0) {
            const uniqueDepartmentIds = [...new Set(employees.map(e => e.departmentId))];
            const departmentPromises = uniqueDepartmentIds.map(id =>
                getDepartmentById(id)
                    .then(response => ({id, name: response.data.departmentName}))
                    .catch(() => ({id, name: "Unknown"}))
            );

            Promise.all(departmentPromises)
                .then(results => {
                    const newDepartmentNames = results.reduce((acc, {id, name}) => {
                        acc[id] = name;
                        return acc;
                    }, {} as DepartmentNames);
                    setDepartmentNames(newDepartmentNames);
                })
                .catch(error => {
                    console.error("Error fetching department names:", error);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [employees]);
    const getAllEmployees = () => {
        setLoading(true);
        listOfEmployees()
            .then((response) => {
                setEmployees(response.data);
            })
            .catch((error) => {
                    setLoading(false)
                    console.error(error)
                }
            )
        ;
    }
    const updateEmployee = (id: number) => {
        navigate(`/edit-employee/${id}`);
    };
    const removeEmployee = (id: number) => {
        deleteEmployeeById(id).then(() => getAllEmployees()).catch(error => console.log(error));
    }
    if (loading) {
        return <div className="text-center mt-10">Loading...</div>;
    }
    return (
        <div className="max-w-[1000px] p-6 rounded-xl">
            <div className="w-full bg-white rounded-lg overflow-hidden">
                <table className="w-full border-collapse">
                    <thead className="bg-[#1dc5db] text-white">
                    <tr>
                        <th className="px-4 py-3 text-center font-semibold">#Id</th>
                        <th className="px-4 py-3 text-center font-semibold">First Name</th>
                        <th className="px-4 py-3 text-center font-semibold">Last Name</th>
                        <th className="px-4 py-3 text-center font-semibold">Email</th>
                        <th className="px-4 py-3 text-center font-semibold">Department</th>
                        <th className="px-4 py-3 text-center font-semibold">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {employees.map((data, index) => (
                        <tr
                            key={data.id}
                            className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                        >
                            <td className="px-4 py-3 font-medium text-center">{data.id}</td>
                            <td className="px-4 py-3 text-center">{data.firstName}</td>
                            <td className="px-4 py-3 text-center">{data.lastName}</td>
                            <td className="px-4 py-3 text-center">{data.email}</td>
                            <td className="px-4 py-3 text-center">{departmentNames[data.departmentId]}</td>
                            <td className="px-2 py-3 text-center flex justify-evenly">
                                <button
                                    className="bg-[#4379F2] text-white px-2 py-1 rounded-md transition duration-200 ease-in-out hover:scale-110 hover:shadow-md"
                                    onClick={() => updateEmployee(data.id)}
                                >
                                    Update
                                </button>

                                <button
                                    className="bg-[#F72464] text-white px-2 py-1 rounded-md transition duration-200 ease-in-out hover:scale-110 hover:shadow-md"
                                    onClick={() => removeEmployee(data.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EmployeeList;