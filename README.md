This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Populate your `.env.local` with `cp .env.example .env.local`

### Docker

```sh
docker compose up
```

Note: installing new packages require image re-build with `docker compose up --build`

### Local

1. Start `postgres` database somewhere and populate your `.env` with relevant environment variables.
2. Install dependencies with `npm install`
3. Run `npm run dev`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

#### Linting & Formatting

Linting is enabled on pre-commit hook, and manually you can run it with `npm run lint` or
`npm run lint:fix` to automatically apply fixes.

## Git conventions & guides

Check out [separate](./docs/GITFLOW.md) doc.

## Deploy on Vercel

Check out [separate](./docs/DEPLOY.md) doc for deploy instructions.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Prisma](https://www.prisma.io/) - used ORM.
- [react-query](https://tanstack.com/query/latest)
- [react-admin](https://marmelab.com/react-admin/Tutorial.html) - open-source admin panel for react.
- [zod](https://zod.dev/) - validation library.

## Deployment

We are using Vercel for all the deployments.

You can setup your own deployment. Check out [separate](./docs/DEPLOY.md) doc for deploy instructions.
All merged pull-requests to the `dev` branch automatically deploy to [dev-server](https://mayak-dev.vercel.app/). <br />
