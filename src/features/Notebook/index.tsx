import './style.css';

interface NotebookProp {
    children: any;
}

const Notebook: React.FC<NotebookProp> = ({ children }) => {
    return <div className="notebook-container">{children}</div>;
};

export default Notebook;
