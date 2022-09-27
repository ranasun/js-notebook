interface EntryButtonProps {
  onClick(): void;
  children: JSX.Element;
  title?: string;
}

const EntryButton: React.FC<EntryButtonProps> = ({
  onClick,
  children,
  title,
}) => {
  return (
    <div
      className="flex items-center justify-center cursor-pointer w-[24px] h-[24px] hover:bg-gray-300"
      onClick={onClick}
      title={title}
    >
      {children}
    </div>
  );
};

export default EntryButton;
