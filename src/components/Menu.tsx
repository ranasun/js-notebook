import { ReactNode, useState } from 'react';

interface MenuGroupProps {
  children: ReactNode;
}
export const MenuGroup: React.FC<MenuGroupProps> = ({ children }) => {
  return (
    <div
      className="container mx-auto flex text-sm font-light"
      data-cy="menu-group"
    >
      {children}
    </div>
  );
};

interface MenuProps {
  text: string;
  children: ReactNode;
}
export const Menu: React.FC<MenuProps> = ({ text, children }) => {
  const [hidden, setHidden] = useState(true);

  const onBlur = () => {
    setHidden(true);
  };

  const onClick = () => {
    setHidden(!hidden);
  };

  return (
    <div
      tabIndex={1}
      onBlur={onBlur}
      className={`px-2 py-1  cursor-default relative whitespace-nowrap ${
        hidden ? 'hover:bg-gray-100' : 'shadow-md'
      }`}
      onClick={onClick}
    >
      <div>{text}</div>
      <div
        className={
          hidden
            ? 'hidden'
            : 'absolute bg-white py-1 shadow-md min-w-[200px] -ml-2'
        }
      >
        {children}
      </div>
    </div>
  );
};

interface MenuItemProps {
  children: ReactNode;
  onClick(): void;
}

export const MenuItem: React.FC<MenuItemProps> = ({ children, onClick }) => {
  return (
    <div className="hover:bg-gray-100 p-1 pl-5" onClick={onClick}>
      {children}
    </div>
  );
};
