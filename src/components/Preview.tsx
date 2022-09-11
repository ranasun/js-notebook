import { useState, useEffect, useRef } from 'react';

interface PreviewProp {
    code: string;
    error: string;
    id: number;
}

const html = `
    <html>
        <head>
            <style>
                html, body {
                    margin: 0;
                    padding: 0;
                }
            </style>
        </head>
        <body>
            <div id="root"></div>
            <script>
                const handleError = (err) => {
                    const root = document.getElementById('root');
                    root.innerHTML = '<div style="background-color: #ffdddd; padding: 10px; font-family: monospace;">'+err+'</div>';
                    console.error(err);
                }

                window.addEventListener('error', (event) => {
                    event.preventDefault();
                    handleError(event.error);
                });

                window.addEventListener('message', (event) => {
                    try {
                        const body = document.querySelector('body');
                        const script = document.createElement('script');
                        script.text = event.data.code;
                        body.append(script);
                        // eval(event.data.code);
                    } catch(err) {
                        handleError(err);
                    }

                    const height = window.document.getElementsByTagName("html")[0].scrollHeight;
                    window.parent.postMessage({id: event.data.id, height }, '*');
                }, false);


            </script>
        </body>
    </html>
`

const Preview: React.FC<PreviewProp> = ({ code, error, id }) => {
    const iframe = useRef<any>();
    const [height, setHeight] = useState('0px');

    useEffect(() => {
        iframe.current.srcdoc = html;

        setTimeout(() => {
            iframe.current.contentWindow.postMessage({ id, code }, '*');
        }, 100)

    }, [code])

    useEffect(() => {
        window.addEventListener('message', listener, false)
        return () => {
            window.removeEventListener('message', listener, false);
        }
    }, []);

    function listener(event: any) {
        if (event.data.id === id) {
            console.log(id, event)
            setHeight(event.data.height + 'px');
        }
    }

    return (
        <>
            <iframe ref={iframe} style={{ border: 0, marginTop: '5px' }} sandbox='allow-scripts' srcDoc={html} height={height} width="100%"></iframe>
        </>
    );
}

export default Preview;