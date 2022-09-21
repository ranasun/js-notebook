import Tab from '../components/Tab';
import TabPanel from '../components/TabPanel';
import AddPageButton from '../components/AddPageButton';
import type { RootState } from '../app/store';
import { useSelector, useDispatch } from 'react-redux';
import {
  addBlankPage,
  removePage,
  renamePage,
  setActivePage,
} from '../app/rootReducer';

const Pages = () => {
  const { pages, order, active } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  const data = order.map((id) => pages[id]);

  return (
    <main className="container mx-auto py-4 pt-24">
      <section className="flex flex-wrap border-l border-l-neutral-400">
        {data.map(({ pageId, title }, i) => (
          <Tab
            key={pageId}
            title={title}
            isActive={active === pageId}
            onClick={() => dispatch(setActivePage(pageId))}
            onDoubleClick={() => dispatch(renamePage({ pageId, title }))}
            onRemove={() => {
              dispatch(removePage(pageId));
            }}
          />
        ))}
        <AddPageButton onClick={() => dispatch(addBlankPage())} />
      </section>
      <section>
        {data.map(({ pageId, entries, order }) => {
          const props = {
            key: pageId,
            index: pageId,
            active: active === pageId,
            entries: entries,
            order: order,
          };
          return <TabPanel {...props} />;
        })}
      </section>
    </main>
  );
};

export default Pages;
