import { useLocation, Link } from "react-router-dom";
const ProfileTab = () => {
    const { pathname } = useLocation();


    return (
        <div className="border-b mb-3 max-w-[1100px] mx-auto border-gray-200 dark:border-gray-700">
            <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 dark:text-gray-700">
                <li className="me-2">
                    <Link to="/profile" className={`inline-flex items-center justify-center p-4 ${pathname == "/profile" ? 'text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500 ' : ''} `}>
                        <svg className={`w-4 h-4  me-2  ${pathname == "/profile" ? 'text-blue-600  border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500 ' : ''} `} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                            <path stroke="currentColor" d="M4 4H1m3 4H1m3 4H1m3 4H1m6.071.286a3.429 3.429 0 1 1 6.858 0M4 1h12a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1Zm9 6.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z" />
                        </svg>
                        Profile
                    </Link>
                </li>
                <li className="me-2">
                    <Link to="/profile/my-Orders " className={`inline-flex items-center justify-center p-4 ${pathname == "/profile/my-Orders" ? 'text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500 ' : ''} `}>
                        <svg className={`w-4 h-4  me-2  ${pathname == "/profile/my-Orders" ? 'text-blue-600  border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500 ' : ''} `} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path fill="currentColor" d="M8 1V0v1Zm4 0V0v1Zm2 4v1h1V5h-1ZM6 5H5v1h1V5Zm2-3h4V0H8v2Zm4 0a1 1 0 0 1 .707.293L14.121.879A3 3 0 0 0 12 0v2Zm.707.293A1 1 0 0 1 13 3h2a3 3 0 0 0-.879-2.121l-1.414 1.414ZM13 3v2h2V3h-2Zm1 1H6v2h8V4ZM7 5V3H5v2h2Zm0-2a1 1 0 0 1 .293-.707L5.879.879A3 3 0 0 0 5 3h2Zm.293-.707A1 1 0 0 1 8 2V0a3 3 0 0 0-2.121.879l1.414 1.414ZM2 6h16V4H2v2Zm16 0h2a2 2 0 0 0-2-2v2Zm0 0v12h2V6h-2Zm0 12v2a2 2 0 0 0 2-2h-2Zm0 0H2v2h16v-2ZM2 18H0a2 2 0 0 0 2 2v-2Zm0 0V6H0v12h2ZM2 6V4a2 2 0 0 0-2 2h2Zm16.293 3.293C16.557 11.029 13.366 12 10 12c-3.366 0-6.557-.97-8.293-2.707L.293 10.707C2.557 12.971 6.366 14 10 14c3.634 0 7.444-1.03 9.707-3.293l-1.414-1.414ZM10 9v2a2 2 0 0 0 2-2h-2Zm0 0H8a2 2 0 0 0 2 2V9Zm0 0V7a2 2 0 0 0-2 2h2Zm0 0h2a2 2 0 0 0-2-2v2Z" />
                        </svg>
                        Orders
                    </Link>
                </li>
                <li className="me-2 ">
                    <Link to="/profile/change-password " className={`inline-flex items-center justify-center p-4 ${pathname == "/profile/change-password" ? 'text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500 ' : ''} `}>
                        <svg className={`w-4 h-4  me-2  ${pathname == "/profile/change-password" ? 'text-blue-600  border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500 ':''} ` } aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 12.25V1m0 11.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M4 19v-2.25m6-13.5V1m0 2.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M10 19V7.75m6 4.5V1m0 11.25a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM16 19v-2" />
                        </svg>Change-Password

                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default ProfileTab;
