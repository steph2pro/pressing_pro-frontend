import React from 'react';
import { menu } from './data';
import MenuItem from './MenuItem';

const Menu = () => {
  return (
    <div className="w-full startbar">
      <div className="flex flex-col w-full gap-5 startbar-menu">
        <ul className="navbar-nav">
          {menu.map((item, index) => (
            <MenuItem
              key={index}
              catalog={item.catalog}
              listItems={item.listItems}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Menu;
