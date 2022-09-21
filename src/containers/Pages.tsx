import Tab from '../components/Tab';
import TabPanel from '../components/TabPanel';
import AddPageButton from '../components/AddPageButton';
import Entry from '../containers/Entry';
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
            onDoubleClick={() => {
              const newTitle = prompt('Enter new title', title);
              if (newTitle) dispatch(renamePage({ pageId, title: newTitle }));
            }}
            onRemove={() => dispatch(removePage(pageId))}
          />
        ))}
        <AddPageButton onClick={() => dispatch(addBlankPage())} />
      </section>
      <section>
        {data.map(({ pageId, entries, order }) => {
          return (
            <TabPanel key={pageId} active={active === pageId}>
              {order.map((id, i) => {
                const { index, content, type, entryId } = entries[id];
                return (
                  <Entry
                    index={index}
                    key={entryId}
                    entryId={entryId}
                    pageId={pageId}
                    content={content}
                    type={type}
                  />
                );
              })}
            </TabPanel>
          );
        })}
      </section>
    </main>
  );
};

export default Pages;
