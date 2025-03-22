+++
title = 'Global state in Svelte 5'
summary = "Svelte state for dummies (it's me, I'm dummies)"
description = "Managing global state in Svelte 5"
date = '2025-01-01'
tags = ['Svelte', 'beginner']
keywords = ['Svelte', 'Sveltekit', 'Svelte 5', 'Svelte state']
showReadingTime = false
showComments = true
+++

I've been having a blast with [Svelte 5](https://svelte.dev/blog/svelte-5-is-alive) but it took me a sec to figure out how to get global state that "just works" with runes.
So far, this is my favorite pattern:

```ts
// src/lib/state/user.svelte.ts
const emptyUser = {
    username: "",
    email: "",
    profile: {},
    createdAt: new Date(),
    updatedAt: new Date(),
};

const loggedInUser = await getSession() ?? emptyUser;

export const cUser = user(loggedInUser);

function user(init: User) {
    // fns modifying User
    let user = $state(init);

    return {
        get get() {
            return { ...user };
        },
        set set(newUser: User) {
            user = newUser;
        },
        set profile(profile: Profile) {
            user.profile = profile;
        },
        get username() {
            return user.username;
        },
        get email() {
            return user.email;
        },
        get profile() {
            return user.profile;
        }
    };
}
```

Access the state like this:
```svelte
<script>
import { cUser } from '$lib/state/user.svelte';
let user: User | Record<string, never> = cUser.get;
</script>

<h3 class="h3">Welcome back, {user.username}!</h3>
```