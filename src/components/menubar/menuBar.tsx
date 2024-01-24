// components/MenuBar.tsx
import { useState } from "react";

interface MenuItem {
  text: string;
  url: string;
}

interface MenuBarProps {
  buttonLabel: string;
  menuItems: MenuItem[];
}

const MenuBar: React.FC<MenuBarProps> = ({ buttonLabel, menuItems }) => {
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
        onMouseEnter={() => setMenuVisible(true)}
      >
        {buttonLabel}
      </button>
      {menuVisible && (
        <div className="absolute top-0 left-0 mt-12 w-full bg-white border border-gray-300 rounded-md shadow-lg ">
          <div className="py-1  w-full flex flex-row">
            {menuItems.map((item, index) => (
              <a
                key={index}
                href={item.url}
                className="block px-4 py-2 text-gray-800 hover:bg-blue-100"
              >
                {item.text}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuBar;
