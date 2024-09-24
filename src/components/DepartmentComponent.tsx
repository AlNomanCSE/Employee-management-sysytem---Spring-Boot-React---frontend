import {useState, FormEvent, useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {addDepartment, getDepartmentById, updateDepartmentById} from "../services/DepartmentService";

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
    const {id} = useParams();
    const saveAndUpdateDepartment = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrors({});  // Clear any previous errors
        const formData = {departmentName, departmentDescription};

        if (id) {
            updateDepartmentById(Number(id), formData)
                .then(() => navigate("/departments"))
                .catch(error => console.log(error));
        } else {
            addDepartment(formData)
                .then(() => {
                    navigate("/departments");
                })
                .catch(error => {
                    console.log(error);
                    if (error.response && error.response.status === 400) {
                        // Handle the specific errors returned by your Java backend
                        setErrors(error.response.data);
                    } else {
                        // Handle unexpected errors
                        setErrors({general: "An unexpected error occurred. Please try again."});
                    }
                });
        }
    };

    function pageTitle() {
        if (id) {
            return <h2 className="text-2xl font-bold mb-4 text-gray-800">
                Update Department
            </h2>
        } else {
            return <h2 className="text-2xl font-bold mb-4 text-gray-800">
                Add New Departement
            </h2>
        }
    }

    useEffect(() => {
        if (id) getDepartmentById(Number(id)).then((response) => {
            setDepartmentName(response.data.departmentName);
            setDepartmentDescription(response.data.departmentDescription);

        }).catch(error => console.log(error))
    }, [id]);
    return (
        <div className="mt-10">
            <div className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                {pageTitle()}

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