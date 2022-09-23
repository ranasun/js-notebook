import Tab from '../components/Tab';
import TabPanel from '../components/TabPanel';
import { Plus } from 'iconoir-react';
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

  const tabs = data.map(({ pageId, title }, i) => (
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
  ));

  const panels = data.map(({ pageId, entries, order }) => {
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
  });

  return (
    <main className="container mx-auto py-4 pt-24">
      <section
        className="flex flex-wrap border-l border-l-neutral-400"
        data-cy="tab-items"
      >
        {tabs}
        <div
          data-cy="add-page"
          className="flex items-center justify-center px-2 cursor-pointer"
          onClick={() => dispatch(addBlankPage())}
        >
          <Plus color="gray" fontSize={12} strokeWidth={3} />
        </div>
      </section>
      <section data-cy="tab-contents">{panels}</section>
    </main>
  );
};

export default Pages;
