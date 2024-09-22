import EmployeeList from "./components/EmployeeList";
import { useNavigate } from "react-router-dom";
export default function App() {
  const navigate = useNavigate();
  const handleAddEmployeeClick = () => {
    navigate("/add-employee"); // Navigate to /add-employee route
  };
  return (
    <div className="w-full">
      <div className="max-w-[1000px] m-auto">
        <h3 className="text-xl font-bold text-center">Employee List</h3>
        <button
          className="bg-[#8b62ec] font-bold hover:bg-[#5C2FC2] active:bg-[#381e75] focus:outline-none focus:ring rounded-md text-gray-200 py-2 px-2 ml-6 transition duration-300 ease-in-out hover:scale-110 hover:shadow-md"
          onClick={handleAddEmployeeClick}
        >
          Add Employee
        </button>
        <EmployeeList />
      </div>
    </div>
  );
}
