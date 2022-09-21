interface EntryButtonProps {
  onClick(): void;
  children: JSX.Element;
}

const EntryButton: React.FC<EntryButtonProps> = ({ onClick, children }) => {
  return (
    <div
      className="flex items-center justify-center cursor-pointer w-[24px] h-[24px] hover:bg-gray-300"
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default EntryButton;
