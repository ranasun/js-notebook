import { ReactNode } from 'react';

interface MenuProps {
  children: ReactNode;
}
export const Menu: React.FC<MenuProps> = ({ children }) => {
  return (
    <ul className="container mx-auto flex text-sm font-light">{children}</ul>
  );
};

interface MenuItemProps {
  text: string;
}

export const MenuItem: React.FC<MenuItemProps> = ({ text }) => {
  return <li className="px-2 py-1 hover:bg-gray-100 cursor-default">{text}</li>;
};
