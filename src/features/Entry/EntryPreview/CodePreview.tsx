import { useRef, useState, useEffect } from 'react';

const html = `
<html>
    <head>
        <style>
            html, body {
                margin: 0;
                padding: 0;
            }
            .__error {
                background-color: #ffdddd; 
                padding: 10px; 
                font-family: monospace;
            }
        </style>
        <script>
            const handleError = (err) => {
                const root = document.getElementById('root');
                root.innerHTML = '<div class="__error">'+err+'</div>';
                console.error(err);
            }

            const updateSize = () => {
                const height = window.document.getElementsByTagName("html")[0].scrollHeight;
                window.parent.postMessage({id, height }, '*');
            }

            window.addEventListener('error', (event) => {
                event.preventDefault();
                handleError(event.error);
                updateSize();
            });

            window.addEventListener('message', (event) => {
                id = event.data.entryId;
                try {
                    if (event.data.error !== '') throw event.data.error;
                    eval(event.data.code);
                } catch(err) {
                    handleError(err);
                } finally {
                    updateSize();
                }
            }, false);
        </script>
    </head>
    <body>
        <div id="root"></div>
    </body>
</html>
`

interface CodePreviewProp {
    entryId: string;
    code: string;
    error: string;
}

const CodePreview: React.FC<CodePreviewProp> = ({ entryId, code, error }) => {
    const iframe = useRef<any>();
    const [height, setHeight] = useState('');

    useEffect(() => {
        setHeight('0px');
        iframe.current.srcdoc = html;
        setTimeout(() => {
            iframe.current.contentWindow.postMessage({ entryId, code, error }, '*');
        }, 50)

    }, [code, error])

    useEffect(() => {
        window.addEventListener('message', listener, false);

        return () => {
            window.removeEventListener('message', listener, false);
        }
    }, []);

    function listener(event: any) {
        if (event.data.id === entryId) {
            setHeight(event.data.height + 'px');
        }
    }

    return <iframe
        ref={iframe}
        style={{ border: 0, marginTop: '5px' }}
        sandbox='allow-scripts'
        srcDoc={html}
        height={height}
        width="100%">
    </iframe>;
}

export default CodePreview;