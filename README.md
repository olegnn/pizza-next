This's a demo pizza project based on ReactJS (Next.js) and GraphQL.

## Getting Started

First, install dependencies

```bash
npm install
# or
yarn
```

And then...

Run development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

Run production server:

```bash
npm run build
# or
yarn build
```

and then to run on port 3000

```bash
PORT=3000 npm run start
# or
PORT=3000 yarn start
```

To run tests:

```bash
npm run test
# or
yarn test
```

## Project structure

All application routes are defined in `pages/` folder.

Code base including utils, models, Redux-related stuff like reducers, selectors etc, is located in `app/` folder.

HOCS (Higher Order Components) are stored in `hocs/` folder.

Hooks defined in `hooks/` folder.

Containers (components with `Apollo`/`Redux` data - bound) are located in `containers/` folder.

Reusable components take place in `components/` folder.