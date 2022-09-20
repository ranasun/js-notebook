import Logo from '../components/Logo';
import Navbar from '../components/Navbar';
import Notebook from '../components/Notebook';
import Pages from '../containers/Pages';
import './App.css';
import { SunLight } from 'iconoir-react';
import { Menu, MenuItem } from '../components/Menu';

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
        <Menu>
          <MenuItem text="File" />
          <MenuItem text="Page" />
          <MenuItem text="Entry" />
          <MenuItem text="Help" />
          <MenuItem text="About" />
        </Menu>
      </Navbar>
      <Pages />
    </div>
  );
};

export default App;
