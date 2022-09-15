import './style.css';

interface EntryButtonProps {
    onClick(): void;
    children: JSX.Element;
}

const EntryButton: React.FC<EntryButtonProps> = ({ onClick, children }) => {
    return (
        <div className="entry-button" onClick={onClick}>
            {children}
        </div>
    );
};

export default EntryButton;
