import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const Logo: React.FC<Props> = ({ children }) => {
  return <span className=" font-medium">{children}</span>;
};

export default Logo;
