import type { RootState } from '../app/store';
import { useSelector, useDispatch } from 'react-redux';
import {
  addBlankPage,
  removePage,
  renamePage,
  setActivePage,
} from '../app/rootReducer';
import Tab from '../components/Tab';
import AddPageButton from '../components/AddPageButton';

const PageTabs = () => {
  const { pages, order, active } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const data = order.map((id) => pages[id]);

  return (
    <section className="flex flex-wrap border-l border-l-black">
      {data.map(({ pageId, title }) => {
        return (
          <Tab
            key={pageId}
            title={title}
            isActive={active === pageId}
            onClick={() => dispatch(setActivePage(pageId))}
            onDoubleClick={() => dispatch(renamePage({ pageId, title }))}
            onRemove={() => dispatch(removePage(pageId))}
          />
        );
      })}
      <AddPageButton onClick={() => dispatch(addBlankPage())} />
    </section>
  );
};

export default PageTabs;
