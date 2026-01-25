import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

export default defineConfig({
    plugins: [
        svelte({
            compilerOptions: {
                customElement: true,
            },
        }),
    ],
    build: {
        outDir: "static/components",
        emptyOutDir: true,
        lib: {
            entry: "assets/elements.ts",
            formats: ["es"],
            fileName: () => "elements.js",
        },
    },
});
