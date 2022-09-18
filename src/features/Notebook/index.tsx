import './style.css';

interface PageProp {
    children: React.ReactNode;
}

const Page: React.FC<PageProp> = ({ children }) => {
    return <div className="page">{children}</div>;
};

export default Page;
