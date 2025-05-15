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
    "btn 2xl:min-h-[52px] 3xl:min-h-[64px] btn-ghost btn-block justify-start transition-colors duration-200 hover:bg-[#3b82f600] focus:bg-[#3b82f63f] dark:hover:bg-[#3b82f600] dark:focus:bg-[#3b82f63f]";

  return (
    <li className="flex flex-col items-stretch w-full gap-2">
      <span className="hidden xl:block menu-label">
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
                  ? `${baseClasses} text-[#2563eb] bg-[#3b82f63f]`
                  : `${baseClasses} hover:text-[#2563eb] focus:text-[#3b82f6]`
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
              className={`${baseClasses} hover:text-[#2563eb] focus:text-[#3b82f6] dark:hover:text-[#2563eb] dark:focus:text-[#3b82f6]`}
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
