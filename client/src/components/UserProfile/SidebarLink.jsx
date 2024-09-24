import React from 'react';
import { NavLink } from 'react-router-dom';


const SidebarLink = ({ to, icon: Icon, label, isHidden = false }) => {
  if (isHidden) return null; 

  return (
    <li className="w-full">
      <NavLink
        to={to}
        className="flex flex-row py-6 px-6 items-center gap-4 hover:text-blue-400"
      >
        <Icon className="text-lg" /> 
        <span className="font-semibold text-base">{label}</span>
      </NavLink>
    </li>
  );
};

export default SidebarLink;
