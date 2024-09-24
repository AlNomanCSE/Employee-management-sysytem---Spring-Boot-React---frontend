import React, {useEffect, useState} from "react";
import {deleteDepartmentById, listOfDepartments} from "../services/DepartmentService.ts";
import {useNavigate} from "react-router-dom";


type DepartmentData = {
    id: number;
    departmentName: string;
    departmentDescription: string;
};

const DepartmentList: React.FC = () => {
    const [department, setDepartment] = useState<DepartmentData[]>([]);
  const navigate = useNavigate();
    useEffect(() => {
        getAllDepartments();
    }, []);

    const getAllDepartments = () => {
        listOfDepartments()
            .then((response) => {
                setDepartment(response.data);
            })
            .catch((error) => console.error(error));
    }
  function updateDepartment(id:number){
      navigate(`/add-department/${id}`);
  }
    function removeDepartment(id: number) {
        deleteDepartmentById(id)
            .then(() => getAllDepartments())
            .catch(error => console.log(error))
    }

    return (
        <div className="max-w-[1000px] p-6 rounded-xl">
            <div className="w-full bg-white rounded-lg overflow-hidden shadow-lg">
                <table className="w-full border-collapse">
                    <thead className="bg-[#1dc5db] text-white">
                    <tr>
                        <th className="px-4 py-3 text-center font-semibold">Department ID</th>
                        <th className="px-4 py-3 text-center font-semibold">Department Name</th>
                        <th className="px-4 py-3 text-center font-semibold">Description</th>
                        <th className="px-4 py-3 text-center font-semibold">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {department.map((data, index) => (
                        <tr
                            key={data.id}
                            className={index % 2 === 0 ? "bg-white" : "bg-purple-100"}
                        >
                            <td className="px-4 py-3 font-medium text-center">{data.id}</td>
                            <td className="px-4 py-3 text-center">{data.departmentName}</td>
                            <td className="px-4 py-3 text-center text-gray-600">{data.departmentDescription}</td>
                            <td className="px-2 py-3 text-center">
                                <div className="flex justify-evenly">
                                    <button
                                        className="bg-[#4379F2] text-white px-2 py-1 rounded-md transition duration-200 ease-in-out hover:bg-[#2c5cd9] hover:shadow-md"
                                        onClick={()=>updateDepartment(data.id)}
                                    >
                                        Update
                                    </button>
                                    <button
                                        className="bg-[#F72464] text-white px-2 py-1 rounded-md transition duration-200 ease-in-out hover:bg-[#d81355] hover:shadow-md"
                                        onClick={()=>removeDepartment(data.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DepartmentList;