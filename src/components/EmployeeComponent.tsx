import { useState, FormEvent, useEffect } from "react";
import { addEmployee, getEmployeeById, updateEmployeeById } from "../services/EmployeeService";
import { useNavigate, useParams } from "react-router-dom";
import { listOfDepartments } from "../services/DepartmentService.ts";

interface ErrorType {
    firstName?: string;
    lastName?: string;
    email?: string;
    departmentId?: string;
}

interface Department {
    id: number;
    departmentName: string;
}

export default function AddEmployee() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [departmentId, setDepartmentId] = useState("");
    const [departments, setDepartments] = useState<Department[]>([]);
    const [errors, setErrors] = useState<ErrorType>({});
    const navigator = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        listOfDepartments()
            .then((response) => {
                setDepartments(response.data);
            })
            .catch((error) => console.error(error));

        if (id) {
            getEmployeeById(parseInt(id)).then((response) => {
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setEmail(response.data.email);
                setDepartmentId(response.data.departmentId);
            }).catch(error => console.log(error));
        }
    }, [id]);

    const saveAndUpdateEmployee = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = { firstName, lastName, email, departmentId };
        const errors = validateForm(formData);
        if (Object.keys(errors).length > 0) {
            setErrors(errors);
        } else {
            if (id) {
                updateEmployeeById(Number(id), formData).then((response) => {
                    console.log(response);
                    navigator("/employees");
                }).catch(error => console.log(error));
            } else {
                addEmployee(formData).then((response) => {
                    console.log(response);
                    navigator("/employees");
                }).catch(error => console.log(error));
            }
        }
    };

    const validateForm = (formData: {
        firstName: string;
        lastName: string;
        email: string;
        departmentId: string;
    }): ErrorType => {
        const errors: ErrorType = {};
        if (!formData.firstName) {
            errors.firstName = "First name is required";
        }
        if (!formData.lastName) {
            errors.lastName = "Last name is required";
        }
        if (!formData.email) {
            errors.email = "Email is required";
        } else if (
            !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)
        ) {
            errors.email = "Invalid email address";
        }
        if (!formData.departmentId) {
            errors.departmentId = "Department is required";
        }
        return errors;
    };

    return (
        <div className="mt-10">
            <div className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">
                    {id ? "Update Employee" : "Add New Employee"}
                </h2>
                <p className="mb-4 text-gray-600">
                    Enter the details of the employee below.
                </p>
                <form onSubmit={saveAndUpdateEmployee} className="space-y-4">
                    <div>
                        <label
                            htmlFor="firstName"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            First Name
                        </label>
                        <input
                            id="firstName"
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        {errors.firstName && (
                            <p className="text-red-500 text-sm">{errors.firstName}</p>
                        )}
                    </div>
                    <div>
                        <label
                            htmlFor="lastName"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Last Name
                        </label>
                        <input
                            id="lastName"
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        {errors.lastName && (
                            <p className="text-red-500 text-sm">{errors.lastName}</p>
                        )}
                    </div>
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm">{errors.email}</p>
                        )}
                    </div>
                    <div>
                        <label
                            htmlFor="departmentId"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Select Department
                        </label>
                        <select
                            id="departmentId"
                            value={departmentId}
                            onChange={(e) => setDepartmentId(e.target.value)}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        >
                            <option value="">Select a department</option>
                            {departments.map((dept) => (
                                <option key={dept.id} value={dept.id}>
                                    {dept.departmentName}
                                </option>
                            ))}
                        </select>
                        {errors.departmentId && (
                            <p className="text-red-500 text-sm">{errors.departmentId}</p>
                        )}
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="bg-[#8b62ec] hover:bg-[#6338c7] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                        >
                            {id ? "Update Employee" : "Add Employee"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}