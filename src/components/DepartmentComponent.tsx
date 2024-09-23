import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { addDepartment } from "../services/DepartmentService";

type Errors = {
    departmentName?: string;
    departmentDescription?: string;
    general?: string;
};
export default function AddDepartment() {
    const [departmentName, setDepartmentName] = useState("");
    const [departmentDescription, setDepartmentDescription] = useState("");
    const [errors, setErrors] = useState<Errors>({});
    const navigate = useNavigate();

    const saveAndUpdateDepartment = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrors({});  // Clear any previous errors
        const formData = { departmentName, departmentDescription };

        addDepartment(formData)
            .then((response) => {
                console.log(response);
                navigate("/departments");
            })
            .catch(error => {
                console.log(error);
                if (error.response && error.response.status === 400) {
                    // Handle the specific errors returned by your Java backend
                    setErrors(error.response.data);
                } else {
                    // Handle unexpected errors
                    setErrors({ general: "An unexpected error occurred. Please try again." });
                }
            });
    };

    return (
        <div className="mt-10">
            <div className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h2 className="text-2xl font-bold mb-4">Add Department</h2>

                {errors.general && (
                    <p className="text-red-500 text-sm mb-4">{errors.general}</p>
                )}

                <form onSubmit={saveAndUpdateDepartment} className="space-y-4">
                    <div>
                        <label
                            htmlFor="departmentName"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Department Name
                        </label>
                        <input
                            id="departmentName"
                            type="text"
                            value={departmentName}
                            onChange={(e) => setDepartmentName(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        {errors.departmentName && (
                            <p className="text-red-500 text-sm">{errors.departmentName}</p>
                        )}
                    </div>
                    <div>
                        <label
                            htmlFor="departmentDescription"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Department Description
                        </label>
                        <textarea
                            id="departmentDescription"
                            value={departmentDescription}
                            onChange={(e) => setDepartmentDescription(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            rows={4}
                        />
                        {errors.departmentDescription && (
                            <p className="text-red-500 text-sm">{errors.departmentDescription}</p>
                        )}
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="bg-[#8b62ec] hover:bg-[#6338c7] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}