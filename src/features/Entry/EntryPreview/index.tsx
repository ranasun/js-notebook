import { useState } from 'react';

import CodePreview from './CodePreview';
import TextPreview from './TextPreview';

interface PreviewProp {
    data: string;
    type: string;
    entryId: number;
}


const EntryPreview: React.FC<PreviewProp> = ({ entryId, data, type, }) => {
    const [code, setCode] = useState('');
    const [error, setError] = useState('');

    return (
        <div>
            {type === 'code' ?
                <CodePreview entryId={entryId} code={code} error={error} /> :
                <TextPreview>{data}</TextPreview>
            }
        </div>
    );
}

export default EntryPreview;