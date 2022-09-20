import type { Entry } from '../common/types';
import EntryComponent from '../features/Entry';
import './style.css';

interface TabPanelProps {
  index: string;
  active: string;
  order: string[];
  entries: Record<string, Entry>;
}

const TabPanel: React.FC<TabPanelProps> = ({
  index,
  active,
  order,
  entries,
}) => {
  const className = active === index ? 'tab-content active' : 'tab-content';
  return (
    <div className={className}>
      <div className="page">
        {order.map((id) => {
          const { index: idx, entryId, content, type } = entries[id];

          return (
            <EntryComponent
              key={entryId}
              index={idx}
              pageId={index}
              entryId={entryId}
              content={content}
              type={type}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TabPanel;
