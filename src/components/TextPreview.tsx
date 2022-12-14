import Markdown from 'markdown-to-jsx';
import '/node_modules/github-markdown-css/github-markdown-light.css';

interface TextPreviewProps {
  children: string;
}

const TextPreview: React.FC<TextPreviewProps> = ({ children }) => {
  return (
    <div className="markdown-body" data-cy="text-preview">
      <Markdown>{children}</Markdown>
    </div>
  );
};

export default TextPreview;
