import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <header className="bg-[#ACE2E1] py-4 text-center">
            <h1 className="text-3xl font-bold text-gray-700">
                EMS
            </h1>
            <nav className="flex justify-center mt-4">
                <ul className="flex space-x-4">
                    <li>
                        <NavLink
                            to="/employees"
                            className={({ isActive }) =>
                                `text-gray-600 hover:text-gray-900 transition duration-300 ease-in-out ${
                                    isActive ? 'text-pink-600' : ''
                                }`
                            }
                        >
                            Employees
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/departments"
                            className={({ isActive }) =>
                                `text-gray-600 hover:text-gray-900 transition duration-300 ease-in-out ${
                                    isActive ? 'text-pink-600' : ''
                                }`
                            }
                        >
                            Departments
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;