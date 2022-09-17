import { useSelector } from 'react-redux';
import type { RootState } from './store';
import Page from '../features/Page';
import Entry from '../features/Entry';
import './App.css';

const App = () => {
    const { entries, order } = useSelector((state: RootState) => state);

    return (
        <div>
            <Page>
                {order.map((entryId) => {
                    const props = entries[entryId];
                    return <Entry key={entryId} {...props} />;
                })}
            </Page>
        </div>
    );
};

export default App;
