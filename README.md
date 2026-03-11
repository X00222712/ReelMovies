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
- [X] Create the home page
    - [X] Use cookies to get user data
    - [X] Reward point recommendation element
    - [X] Movie recommendation element
    - [ ] Screening times of top movies
    - [ ] About Reel movies blurb

    - [X] movie recommendation DB
        - [X] Create movie recommendation Service
        - [X] Create movie recommendation Data Access
        - [ ] Create movie recommendation DB

- [X] Create signing page
    - [X] Signin tokens
    - [X] Signout
    - [X] Service layers
    - [X] Data access layer
    - [ ] DB

- [X] Create signup page
    - [X] Create profiles
    - [X] Auto login
     
- [X] Create book ticket page
    - [X]  Create movie select
    - [X]  Create seat select
    - [X]  Create movie times DBL
    - [X]  Create seat bookings DBL
    - [ ]  Create movie times DB
    - [ ]  Create seat bookings DB

## ALEX
- [X] Create navigation bar
- [X] Create footer
- [X] Create a feedback page
- [X] Create a contact page
- [X] Create movie search page
- [X] Create about us PAGE
- [X] Create layout style

## LAUREN 
- [X] Check usability and accessibility
- [X] Create menu search page



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
