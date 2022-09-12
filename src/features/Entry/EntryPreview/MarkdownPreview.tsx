import Markdown from 'markdown-to-jsx';
import '/node_modules/github-markdown-css/github-markdown-light.css';

interface MarkdownPreviewProps {
    children: any,
}

const MarkdownPreview: React.FC<MarkdownPreviewProps> = ({ children }) => {
    return (
        <div className="markdown-body">
            <Markdown>{children}</Markdown>
        </div>
    )
}

export default MarkdownPreview;