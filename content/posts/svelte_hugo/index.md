+++
title = 'Embedding Svelte components in Hugo posts'
summary = "Have your static cake and interact with it too"
description = "Have your static cake and interact with it too"
date = '2026-01-25'
tags = ['Svelte', 'Hugo', 'advanced']
showReadingTime = false
showComments = true
showTableOfContents = true
+++

I've been working on a Sveltekit side project that uses [`mdsvex`](https://mdsvex.pngwn.io/) to render Svelte components in Markdown. 
It's been a whirlwind romance - I love Svelte and I love Markdown.
Finally, the twain meet.

I can't easily integrate `mdsvex` here because this site is generated via [Hugo](https://gohugo.io/). 
Static site generators like Hugo are popular for blogs because they're dead simple to manage if you choose not to color outside the lines.

That said, the more I play with `mdsvex`, the more I feel neglectful. 
Why should this side project have cooler posts than my own personal site?!
I tremble at the thought of porting this entire thing out of Hugo, too.

Luckily, it's possible to get the best of both worlds.
(Disclaimer: I didn't discover this hack. 
[This blog post](https://prashantb.dev/posts/svelte-components-in-hugo/) from Prashant B. gave me the general idea - I'm just bundling my components a bit differently.)

## The general idea
Hugo generates a static site (i.e., HTML/CSS/JS files) by performing Golang magic on input markdown + config files. The entire site is rendered once, at build time. 

Modern, interactive web apps are more complex. At runtime, components will render, re-render, manage state, respond to user input, etc.

I want interactive components in a static site. Here are the key ideas to exploit:
1. Svelte components can be compiled to [custom elements](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements). Custom elements are HTML elements that behave like self-contained interactive widgets - similar in spirit to `iframe`.
2. Hugo's [markdown parser](https://github.com/yuin/goldmark) can render raw HTML in input Markdown files. 
3. Hugo lets you embed any arbitrary `<script>` in any given page.

Putting it all together, the end-to-end flow is pretty simple:
- Create Svelte components
- Build + bundle them with Vite
- Embed the bundled .js in my base layout
- Use the custom element HTML tags in Markdown
- At runtime, the browser loads my .js and custom elements are hydrated

## The implementation
### Creating a Svelte component
Any component will do. I'm going to copy `mdsvex`'s [Boinger example](https://mdsvex.pngwn.io/playground):

```svelte
<svelte:options customElement="boinger-demo" />

<script lang="ts">
    import { flip } from "svelte/animate";
    import { crossfade, scale } from "svelte/transition";

    interface Props {
        color?: string;
    }

    let { color = "pink" }: Props = $props();

    const [send, receive] = crossfade({ fallback: scale });

    let boingers = $state([
        { val: 1, boinged: true },
        { val: 2, boinged: true },
        { val: 3, boinged: false },
        { val: 4, boinged: true },
        { val: 5, boinged: false },
    ]);

    function toggleBoing(id: number) {
        const index = boingers.findIndex((v) => v.val === id);
        boingers[index].boinged = !boingers[index].boinged;
    }
</script>

<div class="container">
    <div class="boingers">
        {#each boingers.filter((v) => !v.boinged) as { val } (val)}
            <div
                animate:flip
                in:receive={{ key: val }}
                out:send={{ key: val }}
                style="background:{color};"
                onclick={() => toggleBoing(val)}
                role="button"
                tabindex="0"
                onkeydown={(e) => e.key === "Enter" && toggleBoing(val)}
            >
                {val}
            </div>
        {/each}
    </div>

    <div class="boingers">
        {#each boingers.filter((v) => v.boinged) as { val } (val)}
            <div
                animate:flip
                in:receive={{ key: val }}
                out:send={{ key: val }}
                style="background:{color};"
                onclick={() => toggleBoing(val)}
                role="button"
                tabindex="0"
                onkeydown={(e) => e.key === "Enter" && toggleBoing(val)}
            >
                {val}
            </div>
        {/each}
    </div>
</div>
```

I'm omitting the `<style>` block for brevity, but you get the idea. 
There's a lot of Svelte-y, interactive stuff going on here.

I create this file as `assets/components/Boinger.svelte` in the root of my Hugo project. 
Then, I create `assets/elements.ts`:

```ts
// Import all custom element components
import "./components/Boinger.svelte";
```

`elements.ts` wraps all the components that I want to import into my blog.

### Building and bundling with Vite
I added a basic `package.json` to the root of my Hugo repo:

```json
{
    "name": "gibby-dev-components",
    "version": "1.0.0",
    "private": true,
    "type": "module",
    "scripts": {
        "build": "vite build"
    },
    "devDependencies": {
        "@sveltejs/vite-plugin-svelte": "^5.0.3",
        "svelte": "^5.20.0",
        "typescript": "^5.7.3",
        "vite": "^6.0.11"
    }
}
```

This imports all necessary Svelte + Vite dependencies. 

Then, I add a `svelte.config.js`:

```js
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

export default {
    preprocess: vitePreprocess(),
};
```

This is boilerplate for any project that builds Svelte with Vite.

Next, I add a `vite.config.ts`:

```ts
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
```

This is also basically boilerplate, but I set `customElement: true` to tell Svelte that I want to build custom elements from my components.

This block:
```js
lib: {
    entry: "assets/elements.ts",
    formats: ["es"],
    fileName: () => "elements.js",
},
```

tells Vite: "build a file called `elements.ts` under `assets/widgets` into `elements.js`. The output .js should be suitable for use in `<script type="module">` blocks."

Finally, I add a `tsconfig.json`:

```json
{
    "compilerOptions": {
        "target": "ESNext",
        "module": "ESNext",
        "moduleResolution": "bundler",
        "strict": true,
        "esModuleInterop": true,
        "skipLibCheck": true,
        "forceConsistentCasingInFileNames": true,
        "resolveJsonModule": true,
        "isolatedModules": true,
        "noEmit": true,
        "verbatimModuleSyntax": true
    },
    "include": [
        "assets/components/*",
        "assets/elements.ts",
        "vite.config.ts"
    ]
}
```

`compilerOptions` contains more Vite + Svelte boilerplate. 
`include` contains paths to all files which will contain `.ts` code.
This ensures that these .ts files are type-checked.
(I use TypeScript with Svelte because I like it 🙂)

### Using the component in Hugo
First, enable rendering of raw HTML in your Hugo markup config. In my `markup.toml`, I've already set:

```toml
[goldmark]
[goldmark.renderer]
  unsafe = true
```

(You might already have this set in your .toml too. I probably set this a while ago because a shortcode required it.)

{{< notice note >}}
**Why is raw HTML rendering called "unsafe"?** As evidenced by the flexibility of custom elements, HTML can be powerful.
If the source of your raw HTML is untrusted, then rendering raw HTML exposes a potential [cross-site scripting](https://owasp.org/www-community/attacks/xss/) vulnerability. 
As long as your Hugo markdown exclusively references HTML that you control and bundle yourself, there is no actual security concern.
{{< /notice >}}

Then, embed a reference to `elements.js` in your base layout.
I did this by editing my `vendor.html` partial to contain:

```html
<script type="module" src="/components/elements.js"></script>
```

I build the component that I created earlier via `npm run build`:

```bash
> gibby-dev-components@1.0.0 build
> vite build

vite v6.4.1 building for production...
✓ 107 modules transformed.
static/components/elements.js  77.48 kB │ gzip: 22.94 kB
✓ built in 556ms
```

Whenever I create a new component, I need to run `npm run build` to ensure that it's included in the bundled `elements.js`. 

I can include the Boinger component in any Hugo .md with a line like this: 

`<boinger-demo color="purple"></boinger>`

Let's do it live!

<boinger-demo color="purple"></boinger>

### Bonus: updating deployment scripts
I deploy this site with Netlify. 
I don't remember setting up my `netlify.toml` initially, so I'm probably using the default Hugo configuration.

In any case, my updated `netlify.toml` sets `NODE_VERSION = "22"` under each `context` block. 
I updated each `command` to have the prefix: `npm install && npm run build &&` (before any `hugo` command).
