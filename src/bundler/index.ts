import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from "./plugins/unpgk-path-plugin";
import { fetchPlugin } from "./plugins/fetch-plugin";

let service = false;

export const initBundler = async () => {
    await esbuild.initialize({
        worker: true,
        wasmURL: 'https://unpkg.com/esbuild-wasm@0.15.7/esbuild.wasm',
    })
    service = true;
}

export const bundle = async (rawCode: string) => {
    if (!service) {
        await initBundler();
    };

    try {
        const result = await esbuild.build({
            entryPoints: ['index.js'],
            bundle: true,
            write: false,
            minify: true,
            format: 'iife',
            // sourcemap: 'inline',
            plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
        });

        return {
            code: result.outputFiles[0].text,
            err: ''
        }
    } catch(err) {
        if (err instanceof Error) {
            return {
                code: '',
                err: err.message
            }
        } else {
            throw err;
        }
    }
}
