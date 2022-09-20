import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const Navbar: React.FC<Props> = ({ children }) => {
  return (
    <nav className="bg-white select-none shadow-md fixed w-full z-50">
      <div>{children}</div>
    </nav>
  );
};

export default Navbar;
