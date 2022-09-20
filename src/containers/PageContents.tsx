import type { RootState } from '../app/store';
import { useSelector } from 'react-redux';
import TabContent from '../features/Page/TabContent';

const PageContents = () => {
  const { pages, order, active } = useSelector((state: RootState) => state);

  const data = order.map((id) => pages[id]);

  return (
    <section>
      {data.map(({ pageId, entries, order }) => {
        const props = {
          key: pageId,
          index: pageId,
          active,
          entries,
          order,
        };
        return <TabContent {...props} />;
      })}
    </section>
  );
};

export default PageContents;
