import type { RootState } from './store';
import { useSelector, useDispatch } from 'react-redux';
import { addBlankPage, setActivePage } from '../app/rootReducer';
import TabItem from '../features/Page/TabItem';
import TabContent from '../features/Page/TabContent';

import './App.css';
import { useEffect } from 'react';

const App = () => {
    const { pages, order, active } = useSelector((state: RootState) => state);
    const dispatch = useDispatch();

    return (
        <div className="notebook">
            <div className="tab-list">
                {order.map((id) => {
                    const { pageId, title } = pages[id];
                    return (
                        <TabItem
                            key={pageId}
                            index={pageId}
                            title={title}
                            active={active}
                        />
                    );
                })}
                <div
                    className="add-tab-button"
                    onClick={() => dispatch(addBlankPage())}
                >
                    +
                </div>
            </div>
            <div>
                {order.map((id) => {
                    const { pageId, entries, order } = pages[id];
                    return (
                        <TabContent
                            key={pageId}
                            index={pageId}
                            active={active}
                            entries={entries}
                            order={order}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default App;
