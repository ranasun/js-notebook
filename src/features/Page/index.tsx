import { useState } from 'react';
import TabItem from './TabItem';
import TabContent from './TabContent';
import type { Tab, Page } from '../../common/types';

const Page: React.FC<Page> = ({ id, title, entries, order, runCount }) => {
    const [active, setActive] = useState(1);
    const [tabs, setTabs] = useState<Tab[]>([
        {
            index: 1,
            name: `Page-1`,
            content: `Content 1`,
        },
    ]);

    function handleAddTab() {
        const id = tabs.length + 1;
        const tab = {
            index: id,
            name: `Page-${id}`,
            content: `Content ${id}`,
        };

        setTabs([...tabs, tab]);
        setActive(id);
    }

    function handleRemoveTab(index: number) {
        if (tabs.length === 1) return;
        setTabs(tabs.filter((tab) => tab.index !== index));
    }

    function handleRenameTab(index: number, name: string) {
        const newTabs = tabs.map((tab) => {
            if (tab.index === index) {
                tab.name = name;
            }

            return tab;
        });
        setTabs(newTabs);
    }

    return (
        <div>
            <div className="tab-list">
                {tabs.map(({ index, name }) => (
                    <TabItem
                        key={index}
                        index={index}
                        title={name}
                        active={active}
                        onClick={() => setActive(index)}
                        onRemove={handleRemoveTab}
                        onRename={handleRenameTab}
                    />
                ))}
                <div className="add-tab-button" onClick={handleAddTab}>
                    +
                </div>
            </div>
            {tabs.map(({ index, content }) => (
                <TabContent
                    key={index}
                    index={index}
                    content={content}
                    active={active}
                />
            ))}
        </div>
    );
};

export default Page;
