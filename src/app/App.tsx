import Logo from '../components/Logo';
import Navbar from '../components/Navbar';
import Notebook from '../components/Notebook';
import Pages from '../containers/Pages';
import './App.css';
import { SunLight } from 'iconoir-react';
import { MenuGroup, Menu, MenuItem } from '../components/Menu';

const App = () => {
  return (
    <div className="dark">
      <Navbar>
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <a className="font-light py-2" href="#">
                JS Notebook
              </a>
              <div className="ml-4 py-2 font-medium cursor-default hover:bg-gray-100">
                MyNotebook
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
            <MenuItem onClick={() => {}}>New Page</MenuItem>
            <hr />
            <MenuItem onClick={() => {}}>New Notebook</MenuItem>
            <MenuItem onClick={() => {}}>Save Notebook</MenuItem>
            <hr />
            <MenuItem onClick={() => {}}>Download</MenuItem>
          </Menu>
          <Menu text="Page">
            <MenuItem onClick={() => {}}>Run Page</MenuItem>
            <hr />
            <MenuItem onClick={() => {}}>Reset Page</MenuItem>
            <MenuItem onClick={() => {}}>Run and Reset Page</MenuItem>
            <hr />
            <MenuItem onClick={() => {}}>Remove Page</MenuItem>
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
