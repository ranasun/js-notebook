import CodePreview from './CodePreview';
import TextPreview from './TextPreview';

interface PreviewProp {
    code: string;
    error: string;
    type: string;
    entryId: string;
}


const EntryPreview: React.FC<PreviewProp> = ({ entryId, code, error, type, }) => {

    return (
        <div>
            {type === 'code' ?
                <CodePreview entryId={entryId} code={code} error={error} /> :
                <TextPreview>{code}</TextPreview>
            }
        </div>
    );
}

export default EntryPreview;