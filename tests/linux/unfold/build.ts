import * as esbuild from "npm:esbuild@0.20.2";
import { denoPlugins } from "jsr:@luca/esbuild-deno-loader@^0.11.1";

async function main() {
  const _result = await esbuild.build({
    plugins: [...denoPlugins()],
    entryPoints: ["./main.ts"],
    outfile: "main.js",
    bundle: true,
    format: "cjs",
    minify: true,
  });

  esbuild.stop();
}

main();
