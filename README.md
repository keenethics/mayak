This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Copy `.env.example` to `.env` and populate it with missing/relevant environment variables.

### Docker

```sh
docker compose up
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Note: installing new packages require image re-build with `docker compose up --build`

### Local

#### Requirements

- Node.js 20+
- Postgres 16+ running somewhere, and `.env` database variables populated

1. `npm install`
2. `npm run dev`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## How-To's

To see additional useful information about project check separate [howto](./docs/HOWTO.md) doc.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Prisma](https://www.prisma.io/) - used ORM.
- [react-query](https://tanstack.com/query/latest)
- [react-admin](https://marmelab.com/react-admin/Tutorial.html) - open-source admin panel for react.
- [zod](https://zod.dev/) - validation library.
