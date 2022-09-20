import { Plus } from 'iconoir-react';

const style = [
  'flex',
  'items-center',
  'justify-center',
  'px-2',
  'cursor-pointer',
].join(' ');

interface Props {
  onClick(): void;
}

const AddPageBtn: React.FC<Props> = ({ onClick }) => {
  return (
    <div className={style} onClick={onClick}>
      <Plus color="gray" fontSize={12} strokeWidth={3} />
    </div>
  );
};

export default AddPageBtn;
