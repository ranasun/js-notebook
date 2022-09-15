import Markdown from 'markdown-to-jsx';
import '/node_modules/github-markdown-css/github-markdown-light.css';

interface TextPreviewProps {
    children: any;
}

const TextPreview: React.FC<TextPreviewProps> = ({ children }) => {
    return (
        <div className="markdown-body">
            <Markdown>{children}</Markdown>
        </div>
    );
};

export default TextPreview;
