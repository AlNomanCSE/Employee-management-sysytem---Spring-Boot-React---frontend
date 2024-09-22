type PersonData = {
  id: number;
  firtName: string;
  lastName: string;
  mail: string;
};

const EmployeeList = () => {
  const dummyData: Array<PersonData> = [
    {
      id: 1,
      firtName: "Abdullah",
      lastName: "Al Noman",
      mail: "abdullahalnomna@gmail.com",
    },
    {
      id: 2,
      firtName: "Nahid",
      lastName: "Islam",
      mail: "nadidislam@gmail.com",
    },
  ];
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
            {dummyData.map((data, index) => (
              <tr
                key={data.id}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="px-4 py-3 font-medium text-center">{data.id}</td>
                <td className="px-4 py-3 text-center">{data.firtName}</td>
                <td className="px-4 py-3 text-center">{data.lastName}</td>
                <td className="px-4 py-3 text-center">{data.mail}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeList;
