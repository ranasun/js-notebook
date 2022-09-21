import { ReactNode } from 'react';

interface TabPanelProps {
  active: boolean;
  children: ReactNode;
}

const TabPanel: React.FC<TabPanelProps> = ({ active, children }) => {
  return (
    <div className={active ? '' : 'hidden'}>
      <div className="bg-white px-5 py-2 border-l border-l-neutral-400 border-r border-r-neutral-400 border-b border-b-neutral-400">
        {children}
      </div>
    </div>
  );
};

export default TabPanel;
