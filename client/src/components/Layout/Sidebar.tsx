import React from "react";
import { Link, useLocation } from "react-router-dom";
import { sidebarRouteList } from "../../utils/sidebarItems";
import { roles } from "../../interface/role";

const user: { token: string; role: roles; name: string } = JSON.parse(
  localStorage.getItem("user") || "null"
);

const Sidebar: React.FC<{ isOpen: boolean }> = ({ isOpen }) => {
  const location = useLocation();

  return (
    <div
      className={`fixed inset-y-0 left-0 z-30 bg-sidebar p-6 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:w-64 shadow-lg`}>
      <Link
        to='/'
        className='text-gray-800 text-xl font-semibold tracking-wide'>
        <h2 className='text-white text-xl font-bold mb-6 tracking-wide text-center w-full'>
          My App
        </h2>
      </Link>

      {/* User Profile (optional) */}
      {user ? (
        <div className='flex flex-col items-center mb-8'>
          <img
            src='/avatar.jpg' // Placeholder profile image
            className='w-16 h-16 rounded-full border-2 border-white'
            alt='User Avatar'
          />
          <p className='text-white mt-2 text-sm font-semibold'>{user.name}</p>
          <p className='text-white text-xs opacity-70'>{user.role}</p>
        </div>
      ) : null}

      <nav className='space-y-2'>
        {/* <SidebarLink to='/' currentPath={location.pathname} label='Dashboard' /> */}
        {sidebarRouteList?.[user?.role || "guest"]?.map((route) => (
          <SidebarLink
            key={route.link}
            to={route.link}
            label={route.name}
            currentPath={location.pathname}
          />
        ))}
      </nav>
    </div>
  );
};

const SidebarLink: React.FC<{
  to: string;
  label: string;
  currentPath: string;
}> = ({ to, label, currentPath }) => {
  const isActive = currentPath === to;

  return (
    <Link
      to={to}
      className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium text-sm transition-all duration-200 ${
        isActive
          ? "bg-active text-white shadow-inner"
          : "text-white/80 hover:bg-white/10 hover:text-white"
      }`}>
      {/* Optional icon can go here */}
      {label}
    </Link>
  );
};

export default Sidebar;
