import Navbar from '../components/Navbar';
import Pages from '../containers/Pages';
import './App.css';
import { SunLight } from 'iconoir-react';
import { MenuGroup, Menu, MenuItem } from '../components/Menu';
import { useSelector, useDispatch } from 'react-redux';
import {
  setState,
  addBlankPage,
  removePage,
  renamePage,
  renameNotebook,
} from './rootReducer';
import { RootState, persistor } from '../app/store';
import { downloadJSON } from '../common/utils';
import { useRef } from 'react';

const App = () => {
  const state = useSelector((state: RootState) => state);
  const { pages, active, title } = state;
  const file = useRef<any>();

  const dispatch = useDispatch();

  const onRenamePage = () => {
    const title = pages[active].title;
    const newTitle = prompt('Enter new title', title);
    if (newTitle) dispatch(renamePage({ pageId: active, title: newTitle }));
  };

  const onDownload = () => {
    downloadJSON(state.title + '.jsnb', state);
  };

  const onOpenNotebook = () => {
    file.current.click();
  };

  const onFileUpload = (e: any) => {
    const data = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (data: any) => {
      const json = JSON.parse(data.target.result);
      dispatch(setState(json));
    };
    reader.readAsText(data);
    file.current.value = '';
  };

  const onSetTitle = () => {
    const newTitle = prompt('Enter new title', title);
    if (newTitle) dispatch(renameNotebook(newTitle));
  };

  const onNewNotebook = () => {
    persistor.purge().then(() => {
      location.reload();
    });
  };

  return (
    <div className="dark">
      <input
        ref={file}
        type="file"
        accept=".jsnb"
        hidden
        onChange={onFileUpload}
      />
      <Navbar>
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <a className="font-light py-2" href="#">
                JS Notebook
              </a>
              <div
                className="ml-4 py-2 font-medium cursor-default hover:bg-gray-100"
                onClick={onSetTitle}
              >
                {title}
              </div>
            </div>
            <div className="flex gap-2">
              <SunLight strokeWidth={2} color="gray" />
            </div>
          </div>
        </div>
        <hr />
        <MenuGroup>
          <Menu text="File">
            <MenuItem onClick={onNewNotebook}>New Notebook</MenuItem>

            <MenuItem onClick={onOpenNotebook}>Open Notebook</MenuItem>
            <hr />
            <MenuItem onClick={onSetTitle}>Save Notebook As</MenuItem>
            <hr />
            <MenuItem onClick={onDownload}>Download</MenuItem>
          </Menu>
          <Menu text="Page">
            <MenuItem onClick={() => dispatch(addBlankPage())}>
              New Page
            </MenuItem>
            <MenuItem onClick={onRenamePage}>Rename Page</MenuItem>
            <hr />
            <MenuItem onClick={() => {}}>Run Page</MenuItem>
            {/* <hr />
            <MenuItem onClick={() => {}}>Reset Page</MenuItem>
            <MenuItem onClick={() => {}}>Run and Reset Page</MenuItem> */}
            <hr />
            <MenuItem onClick={() => dispatch(removePage(active))}>
              Remove Page
            </MenuItem>
          </Menu>
          <Menu text="Entry">
            <MenuItem onClick={() => {}}>Run Entry</MenuItem>
            <MenuItem onClick={() => {}}>Clear Entry</MenuItem>
            <hr />
            <MenuItem onClick={() => {}}>New Entry Above</MenuItem>
            <MenuItem onClick={() => {}}>New Entry Below</MenuItem>
            <hr />
            <MenuItem onClick={() => {}}>Move Entry Up</MenuItem>
            <MenuItem onClick={() => {}}>Move Entry Down</MenuItem>
            <hr />
            <MenuItem onClick={() => {}}>Remove Entry</MenuItem>
          </Menu>
          <Menu text="Help">
            <MenuItem onClick={() => {}}>Documentation</MenuItem>
            <hr />
            <MenuItem onClick={() => {}}>Keyboard Shortcuts</MenuItem>
            <MenuItem onClick={() => {}}>Markdown Reference</MenuItem>
            <hr />
            <MenuItem onClick={() => {}}>About JS Notebook</MenuItem>
          </Menu>
        </MenuGroup>
      </Navbar>
      <Pages />
    </div>
  );
};

export default App;
