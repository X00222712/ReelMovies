# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```sh
# create a new project
npx sv create my-app
```

To recreate this project with the same configuration:

```sh
# recreate this project
npx sv create --template minimal --no-types --add prettier eslint vitest="usages:unit,component" playwright sveltekit-adapter="adapter:auto" drizzle="database:sqlite+sqlite:libsql" --install npm reelMovies
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```sh
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```sh
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.


# TODO

## GLEN
- [ ] Create the home page
    - [X] Movie recommendation element
        - [ ] Create movie recommendation DB
- [ ] Create an account signup page
- [X] Create a navigation bar
- [X] Create a footer

## ALEX
- [ ] Create a feedback element
- [ ] Create the layout style
- [ ] Verify layout styling is consisent

## LAUREN 
- [ ] Create a contact page
- [ ] Check usability and accessibility
- [ ] Verify layout styling is consisent


# What we are doing

## Overview
We are making Reel Movies, a cinima with food and movies browsing where users can purchase tickets and if they have an account or reference number can buy food with their seat.

Reference numbers are sent via email to the customer and looks like this.
`http://{domain}/purchases/view?ref=34Fh-p4v2-F4l0-35gR`

To help make this a reference helps
    `https://www.youtube.com/watch?v=qa-Sh0iM-kM`

## Main feature
    - Main page for navigation and landing
    - Food discovery page for viewing our menu
    - Movie discovery page for looking for movies and times
    - Seat selection screen
    - Payment screen for seats
    - Payment screen for food
    - Contact us page
    - Feedback page
    - Account signup page
    - Account signin page
    - Purchases page
    - View purchase details page
