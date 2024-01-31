For deploy [Vercel](https://vercel.com/docs/getting-started-with-vercel/projects-deployments) is used.

## Getting Started

1. Install Vercel cli globally with `npm i -g vercel`
2. Sign in into Vercel ( with github for example )
3. Login cli with `vercel login`

## How to deploy current app state to your own Vercel instance

1. Initialize Vercel project with `vercel link`, and accept all defaults
![vercel link](https://github.com/keenethics/mayak/assets/21224705/83782cc0-090f-49d3-8308-b45709d61ad8)
2. Better will be to set nearest to you region. For it, please, visit `Settings` => `Functions` and set `Function Region` to `Frankfurt` or other one.
3. Create DB on Vercel. Visit tab `Storage` and create postgres DB.
4. Open created project in Vercel dashboard, go to settings, and fill required environment variables
![fill environment](https://github.com/keenethics/mayak/assets/21224705/812af0ee-a738-4b3e-938e-280579290599)
![saved environment](https://github.com/keenethics/mayak/assets/21224705/a9d5a1e2-bb5b-4231-b6b0-30fb5c262c83)
5. Deploy your app with `vercel deploy`
```sh
❯ vercel deploy
Vercel CLI 33.3.0
🔍  Inspect: https://vercel.com/alex-popov-tech/mayak-2/7v5j7Ysq6nuzAFNto7ZxRcGcyWtA [1s]
✅  Preview: https://mayak-2-gl0htomud-alex-popov-tech.vercel.app [1s]
📝  To deploy to production (mayak-2.vercel.app), run `vercel --prod`
```
`Preview` is the url of deployed app which already can be shared with others ( but might require login to Vercel ).

You can use dev toolbar at the bottom of the page to make truly public link with `share` button.