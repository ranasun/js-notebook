import { Cancel } from 'iconoir-react';
import React from 'react';
import { useDispatch } from 'react-redux';
import {
    addPage,
    removePage,
    renamePage,
    setActivePage,
} from '../../../app/rootReducer';
import { setFocus } from '../../Notebook/slice';

import './style.css';

interface TabItemProps {
    index: string;
    title: string;
    active: string;
}

const TabItem: React.FC<TabItemProps> = ({ index, title, active }) => {
    const dispatch = useDispatch();

    function onClick() {
        dispatch(setActivePage(index));
    }

    function handleRemovePage(e: React.MouseEvent<HTMLElement>) {
        e.stopPropagation();
        dispatch(removePage(index));
    }

    function onDoubleClick() {
        const newName = prompt('Enter new page name', title);
        if (newName) dispatch(renamePage({ pageId: index, title: newName }));
    }

    return (
        <div
            className={active === index ? 'tab-item active' : 'tab-item'}
            onClick={onClick}
            onDoubleClick={onDoubleClick}
        >
            <span>{title}</span>
            {active === index && (
                <span className="remove-page-button" onClick={handleRemovePage}>
                    <Cancel fontSize={10} strokeWidth={2} color="grey" />
                </span>
            )}
        </div>
    );
};

export default TabItem;
