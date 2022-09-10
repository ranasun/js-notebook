import { useState, useEffect } from 'react';

interface PreviewProp {
    input: string
}

const Preview: React.FC<PreviewProp> = ({ input }) => {
    const [output, setOutput] = useState('');

    useEffect(() => {
        setOutput(input);
    }, [input])

    return (
        <>
            {output && <div>{output}</div>}
        </>
    );
}

export default Preview;