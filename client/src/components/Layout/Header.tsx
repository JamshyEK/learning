import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { sidebarRouteList } from "../../utils/sidebarItems";
// import { useServerHealth } from "../../hooks/usePolling";
import { roles } from "../../interface/role";
import { useProfileQuery } from "../../redux/services/authApi";

const user: { token: string; role: roles } = JSON.parse(
  localStorage.getItem("user") || "null"
);

// const ServerHealthChecker = ({ url }: { url: string }) => {
//   const status = useServerHealth(url, 5000);

//   return (
//     <div className="flex items-center space-x-1 text-sm">
//       <span
//         className={`h-3 w-3 rounded-full ${
//           status === "online" ? "bg-green-500" : "bg-red-500"
//         }`}
//       ></span>
//       <span className="text-white">{status}</span>
//     </div>
//   );
// };

const Header: React.FC = () => {
  const { data } = useProfileQuery();
  const { pathname } = useLocation();
  let titleName: string | undefined = "";
  if (user?.role) {
    titleName = sidebarRouteList[user.role].find(
      (item) => item.link === pathname
    )?.name;
  }

  const [isOpen, setIsOpen] = useState(false);
  // const URL = import.meta.env.VITE_API_URL;

  return (
    <header className='bg-white border-b border-gray-200 shadow-sm'>
      <div className='container mx-auto px-4 py-3 flex justify-between items-center'>
        <Link
          to='/'
          className='text-gray-800 text-xl font-semibold tracking-wide'>
          {titleName}
        </Link>

        <div className='hidden md:flex items-center space-x-6'>
          {/* <ServerHealthChecker url={`${URL}/health`} /> */}
          <span className='text-gray-600 font-medium'>{data?.name}</span>
          <Link
            to='/login'
            onClick={() => {
              localStorage.clear();
            }}
            className='text-gray-500 hover:text-gray-800 transition hover:underline'>
            Logout
          </Link>
        </div>

        <button
          className='md:hidden text-gray-600 focus:outline-none'
          onClick={() => setIsOpen(!isOpen)}
          aria-label='Toggle mobile menu'>
          <svg
            className='w-6 h-6'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d={
                isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"
              }></path>
          </svg>
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className='md:hidden px-4 pb-4 space-y-2 transition-all duration-300'>
          {sidebarRouteList?.[user?.role || "guest"]?.map((route) => (
            <Link
              to={route.link}
              key={route.link}
              className='block text-gray-700 text-base hover:underline'
              onClick={() => setIsOpen(false)}>
              {route.name}
            </Link>
          ))}
          <Link
            to='/login'
            className='block text-gray-700 text-base hover:underline'
            onClick={() => {
              localStorage.clear();
              setIsOpen(false);
            }}>
            Logout
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
