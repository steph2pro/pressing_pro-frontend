import React from 'react';
import { NavLink } from 'react-router-dom';
import { IconType } from 'react-icons';

interface MenuItemProps {
  onClick?: () => void;
  catalog: string;
  listItems: Array<{
    isLink: boolean;
    url?: string;
    icon: IconType;
    label: string;
    onClick?: () => void;
  }>;
}

const MenuItem: React.FC<MenuItemProps> = ({
  onClick,
  catalog,
  listItems,
}) => {
  const baseClasses =
    "btn 2xl:min-h-[52px] 3xl:min-h-[64px] btn-ghost btn-block justify-start transition-all duration-200 rounded-xl text-[15px] font-medium hover:scale-[1.02]";

  return (
    <li className="flex flex-col items-stretch w-full gap-2">
      <span className="hidden xl:block text-[#772953] font-semibold uppercase tracking-wide">
        {catalog}
      </span>

      {listItems.map((listItem, index) => {
        if (listItem.isLink) {
          return (
            <NavLink
              key={index}
              onClick={onClick}
              to={listItem.url || ''}
              className={({ isActive }) =>
                isActive
                  ? `${baseClasses} text-white bg-[#E95420] shadow-md`
                  : `${baseClasses} text-[#772953] hover:text-[#E95420] hover:bg-[#E9542015] focus:bg-[#E9542030]`
              }
            >
              <listItem.icon className="xl:text-2xl 2xl:text-3xl 3xl:text-4xl" />
              <span className="menu-label">
                {listItem.label}
              </span>
            </NavLink>
          );
        } else {
          return (
            <button
              key={index}
              onClick={listItem.onClick}
              className={`${baseClasses} text-[#772953] hover:text-[#E95420] hover:bg-[#E9542015] focus:bg-[#E9542030]`}
            >
              <listItem.icon className="xl:text-2xl 2xl:text-3xl 3xl:text-4xl" />
              <span className="menu-label">
                {listItem.label}
              </span>
            </button>
          );
        }
      })}
    </li>
  );
};

export default MenuItem;
