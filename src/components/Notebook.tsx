import { ReactNode } from 'react';

interface NotebookProps {
  children: ReactNode;
}

const Notebook: React.FC<NotebookProps> = ({ children }) => {
  return <main className="container mx-auto">{children}</main>;
};

export default Notebook;
