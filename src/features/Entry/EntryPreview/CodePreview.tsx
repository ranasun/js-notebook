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
        </head>
        <body>
        <div id='root'></div>
        <script>
            const handleError = (err) => {
                const body = document.querySelector('body');
                body.innerHTML = '<div id="root"><div class="__error">'+err+'</div></div>';
                console.error(err);
            }

            const updateHeight = () => {
                setTimeout(() => {
                    const height = window.document.querySelector("html").scrollHeight + 1;
                    window.parent.postMessage({id, height }, '*');
                }, 1);
            }

            window.addEventListener('error', (event) => {
                event.preventDefault();
                handleError(event.error);
                updateHeight();
            });

            window.addEventListener('message', (event) => {
                id = event.data.entryId;
                try {
                    eval(event.data.code);
                } catch(err) {
                    handleError(err);
                } finally {
                    updateHeight();
                }
            }, false);

            (() => {
                var logger = console.log;
    
                console.log = function () {
                    const __root = document.getElementById('root');
                    let __pre = document.createElement('pre');
                    __pre.style.whiteSpace = 'pre-wrap';
                    __root.append(__pre);
                    [...arguments].forEach(a => {
                        const span = document.createElement('span');
                        span.style.padding = '2px';
                        span.innerText = JSON.stringify(a);
                        __pre.append(span);
                    })
                    
                    updateHeight();
                    logger.apply(console, arguments);
                };
            })();
        </script>
    </body>
</html>
`;

interface CodePreviewProp {
    entryId: string;
    prev: string;
    code: string;
    error: string;
}

const CodePreview: React.FC<CodePreviewProp> = ({
    entryId,
    prev,
    code,
    error,
}) => {
    const iframe = useRef<any>();
    const [height, setHeight] = useState('');

    useEffect(() => {
        setHeight('0px');
        iframe.current.srcdoc = html;
        setTimeout(() => {
            iframe.current.contentWindow.postMessage(
                { entryId, prev, code, error },
                '*'
            );
        }, 50);
    }, [code, error]);

    useEffect(() => {
        window.addEventListener('message', listener, false);

        return () => {
            window.removeEventListener('message', listener, false);
        };
    }, [code]);

    function listener(event: any) {
        const { data } = event;
        if (data.id === entryId && Object.hasOwn(data, 'height')) {
            setHeight(data.height + 'px');
        }
    }

    return (
        <iframe
            ref={iframe}
            style={{ border: 0, marginTop: '5px' }}
            sandbox="allow-scripts"
            srcDoc={html}
            height={height}
            width="100%"
        ></iframe>
    );
};

export default CodePreview;
