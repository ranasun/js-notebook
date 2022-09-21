import type { Entry } from '../common/types';
import EntryComponent from '../features/Entry';

interface TabPanelProps {
  index: string;
  active: boolean;
  order: string[];
  entries: Record<string, Entry>;
}

const TabPanel: React.FC<TabPanelProps> = ({
  index,
  active,
  order,
  entries,
}) => {
  const className = active ? 'tab-content active' : 'tab-content hidden';
  return (
    <div className={className}>
      <div className="bg-white px-5 py-2 border-l border-l-neutral-400 border-r border-r-neutral-400 border-b border-b-neutral-400">
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
