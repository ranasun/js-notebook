import React, { useState, useEffect } from 'react';
import './Tab.css';

type TabType = {
    index: number;
    name: string;
    content: string;
};

interface TabItemProps {
    index: number;
    title: string;
    active: number;
    onClick(): void;
    onRemove(index: number): void;
    onRename(index: number, name: string): void;
}

interface TabContentProps {
    index: number;
    content: string;
    active: number;
}

const TabItem: React.FC<TabItemProps> = ({
    index,
    title,
    active,
    onClick,
    onRemove,
    onRename,
}) => {
    const className = active === index ? 'tab-item active' : 'tab-item';
    const [name, setName] = useState(title);

    function handleRemovePage() {
        onRemove(index);
    }

    function handleChange(e: any) {
        setName(e.target.value);
    }

    function onDoubleClick() {
        const newName = prompt('Enter new page name', name);
        if (newName) onRename(index, newName);
    }

    function onBlur() {
        onRename(index, name);
    }

    return (
        <>
            <div
                className={className}
                onClick={onClick}
                onDoubleClick={onDoubleClick}
                onBlur={onBlur}
            >
                <span>{title}</span>
                {active === index && (
                    <span
                        className="remove-page-button"
                        onClick={handleRemovePage}
                    >
                        x
                    </span>
                )}
            </div>
        </>
    );
};

const TabContent: React.FC<TabContentProps> = ({ index, content, active }) => {
    const className = active === index ? 'tab-content active' : 'tab-content';
    return <div className={className}>{content}</div>;
};

const Tab = () => {
    const [active, setActive] = useState(1);
    const [tabs, setTabs] = useState<TabType[]>([
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

export default Tab;
