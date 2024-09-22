import { useEffect, useState } from "react";
import { listOfEmployees } from "../services/EmployeeService";

type PersonData = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
};

const EmployeeList = () => {
  const [employees, setEmployees] = useState(Array<PersonData>);
  useEffect(() => {
    listOfEmployees()
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => console.error(error));
  }, []);
  return (
    <div className="w-full p-6 rounded-xl">
      <div className="w-full bg-white rounded-lg overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-[#1dc5db] text-white">
            <tr>
              <th className="px-4 py-3 text-center font-semibold">#Id</th>
              <th className="px-4 py-3 text-center font-semibold">
                First Name
              </th>
              <th className="px-4 py-3 text-center font-semibold">Last Name</th>
              <th className="px-4 py-3 text-center font-semibold">Email</th>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeList;
