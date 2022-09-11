import { useState, useEffect, useRef } from 'react';

interface PreviewProp {
    code: string;
    error: string;
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
                        script.text = event.data;
                        body.append(script);
                        // eval(event.data);
                    } catch(err) {
                        handleError(err);
                    }
                }, false);
            </script>
        </body>
    </html>
`

const Preview: React.FC<PreviewProp> = ({ code, error }) => {
    const iframe = useRef<any>();
    const [height, setHeight] = useState('0px');

    useEffect(() => {
        iframe.current.srcdoc = html;
        // setHeight(iframe.current.contentWindow.document.body.scrollHeight);
        // console.log(iframe.current.contentWindow)
        setTimeout(() => {
            iframe.current.contentWindow.postMessage(code, '*');
        }, 100)
    }, [code])

    return (
        <>
            <iframe ref={iframe} style={{ border: 0, marginTop: '5px', resize: 'vertical' }} sandbox='allow-scripts' srcDoc={html} height="50px" width="100%"></iframe>
        </>
    );
}

export default Preview;