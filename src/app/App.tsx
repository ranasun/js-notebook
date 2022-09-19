import type { RootState } from './store';
import { useSelector, useDispatch } from 'react-redux';
import { addBlankPage, setActivePage } from '../app/rootReducer';
import TabItem from '../features/Page/TabItem';
import TabContent from '../features/Page/TabContent';

import './App.css';
import { useEffect } from 'react';
import { Plus } from 'iconoir-react';

const App = () => {
    const { pages, order, active } = useSelector((state: RootState) => state);
    const dispatch = useDispatch();

    return (
        <div className="notebook">
            <nav>JSNotebook</nav>
            <main>
                <section className="tab-list">
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
                        <Plus fontSize={12} strokeWidth={3} />
                    </div>
                </section>
                <section>
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
                </section>
            </main>
        </div>
    );
};

export default App;
