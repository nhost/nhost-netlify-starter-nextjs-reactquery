https://user-images.githubusercontent.com/20285232/181801170-ac201340-4fc1-48ea-8c78-5904ec293a6a.mp4

# Nhost Netlify Starter Template

This is an example front-end for the multi-conference example app created with Nhost. It uses Next.js, React-Query, Tailwind, Nhost as the backend (authentication, Postgres Database, GraphQL API) and Netlify to host the front-end.

- [Next.js](https://github.com/vercel/next.js/)
- [Tailwind v3](https://tailwindcss.com/) for styling.
- [React Query v4](https://github.com/TanStack/query).
- [TypeScript](https://typescriptlang.org) static type-safety.
- [ESLint](https://eslint.org) linting & [Prettier](https://prettier.io) code formatting.
- [GraphQL](https://graphql.org/) and [GraphQL Code Generator](https://www.graphql-code-generator.com/).

## Previews

- Backend: https://rhhvmcjwixtxiumktygi.nhost.run/console
- Front-end: https://fanciful-concha-7412d8.netlify.app/

## Table of Contents

- [Nhost Netlify Starter Template](#nhost-netlify-starter-template)
  - [Previews:](#previews)
  - [Table of Contents:](#table-of-contents)
  - [Getting Started](#getting-started)
  - [Deploy to Nhost](#deploy-to-nhost)
  - [Deploy to Netlify](#deploy-to-netlify)

## Getting Started

<details><summary><h5>Steps for setting up front-end local development</h5></summary>

1. Clone the repository

```sh
git clone https://github.com/nhost/nhost-netlify-starter-nextjs-reactquery.git
```

2. Install the dependencies

```sh
yarn install
```

3. Start the Next.js application

```sh
yarn dev
```

</details>

<details><summary><h5>Steps for setting up local development with the Nhost CLI</h5></summary>

When you start developing your front-end you will se that there's data already preloaded. This is coming from an environment Nhost has prepared to run the `conference` application. In order to make changes to the back-end (tables, columns, permissions, etc...) you need to start a local Nhost environment yourself.

1. Install the Nhost CLI

```sh
sudo curl -L https://raw.githubusercontent.com/nhost/cli/main/get.sh | bash
```

2. Start the Nhost application:

```sh
nhost up
```

Use localhost:1337 as the subdomain, and skip region when using the CLI and the JavaScript SDK:

```js
import { NhostClient } from "@nhost/nhost-js";

const nhost = new NhostClient({
  subdomain: "localhost:1337",
});
```

If you explore the network tab of the front-end, you will see that no data is returned:

```json
{
    "data": {
        "conferences": []
    }
}
```

This is because *there is* no data, you can go to `http://localhost:1337/` to start adding rows and/or modify your database schema.

</details>

<details><summary><h5>Project structure walkthrough</h5></summary>

Inside this folder you are going to see both the specification for the backend (Nhost) and the front-end (NextJS):

```
/
├── nhost/
├── .nhost/
├── src/
│   ├── components/
|   |
│   └── pages/
│       └── index.tsx
└── package.json
```

- `nhost` is the main specification of your backend: tables, permissions & roles.

</details>
<details><summary><h5>GraphQL API Schema and Example Queries</h5></summary>


```graphql
query ConferencesQuery {
  conferences(where: { featured: { _eq: true } }) {
    id
    name
    speakers {
      name
    }
    talks {
      name
      speaker {
        name
        bio
      }
    }
  }
}
```

```graphql
query Speakers {
  speakers {
    id
    name
    bio
    social
    job_description
    avatar_url
  }
}
```

```graphql
query Talks {
  talks {
    id
    name
    start_date
    end_date
    speaker {
      name
    }
  }
}
```

</details>

## Deploy to Nhost

<img align="left" width="35%" src="https://user-images.githubusercontent.com/20285232/181691897-1269d9d3-94fb-4958-ac27-83a70ab00309.png" >

[Nhost](https://nhost.io/) is an open source Firebase alternative with GraphQL. More importantly, by creating a project with Nhost you automatically get the following:

```
- Database: PostgreSQL.
- Instant GraphQL API: Hasura.
- Authentication: Hasura Auth.
- Storage: Hasura Storage.
- Serverless Functions: AWS Lambdas.
```


<details><summary><h5>Steps for creating an Nhost application</h5></summary>

Log in to your Nhost dashboard and click the **Create your first app** button.

<p align="center" width="100%">
    <img width="55%"" src="https://docs.nhost.io/assets/images/create-app-step-1-64d13fc87fac1d0989da25857e1c3811.png"> 
</p>

Next, give your new Nhost app a name, select a geographic region for your Nhost services and click Create App.

<p align="center" width="100%">
    <img width="55%"" src="https://docs.nhost.io/assets/images/create-app-step-2-823c33a87887cbe28da98a85219dcc59.png"> 
</p>

After a few seconds, you should get a PostgreSQL database, a GraphQL API with Hasura, file storage, and authentication set up.

</details>

<details><summary><h5>Connecting this repository to Nhost</h5></summary>

Nhost supports a git-based workflow which means that you can safely work locally with the CLI and when you are ~~confident~~ with your changes, you can push to your repository and your application will be automatically deployed (any following updates you push to your code will also be automatically be deployed.) To allow this, you need to connect this repository to your Nhost projects through the Nhost console:

1. Fork/clone this repository to your GitHub account.

2. Provide the require permissions to select this repository to the official Nhost GitHub application.

3. Find your repository on the Nhost Console & connect it:

<p align="center" width="100%">
    <img width="55%"" src="https://user-images.githubusercontent.com/20285232/181070306-851187ca-6595-4cdc-b458-b62b479479db.png"> 
</p>

4. Once connected, the application will automatically deploy.

<p align="center" width="100%" height="100%">
    <img width="55%"" src="https://user-images.githubusercontent.com/20285232/181070624-f12571a4-6b77-4a2f-acab-9e156306b392.png"> 
</p>

5. Add changes to your application. Any changes you push to your repository will also be automatically be deployed (you can see your deployments on the "Deployments" section of the console)

<p align="center" width="100%">
    <img width="55%"" src="https://user-images.githubusercontent.com/20285232/181070633-c3c67e94-981c-4574-954b-c643448f387e.png"> 
</p>

</details>
                                                                                                                                 
## Deploy to Netlify
                                                                                                                                 
<details><summary><h5>Steps for deploying this template to Netlify</h5></summary>
                                                                                                                            
1. Clone this repo: `https://github.com/nhost/nhost-netlify-starter-nextjs-reactquery.git`
2. Make sure you are in the correct directory and run`yarn install` (or `npm install`.)
3. Run `yarn dev` (or `npm run dev`.)
4. Make your desired changes to the front-end.
5. Provide the necessary permissions to the Netlify application for your GitHub repository.
6. Once you import the repository, add the correct environment variables from your Nhost application:

```
NEXT_PUBLIC_NHOST_SUBDOMAIN=YOUR_NHOST_APP_SUBDOMAIN
NEXT_PUBLIC_NHOST_REGION=YOUR_NHOST_APP_REGION
```

You can select these variables from your app overview:

<p align="center" width="100%">
<img width="33%"" src="https://user-images.githubusercontent.com/20285232/181790261-065d7e61-6986-4acc-94d7-5a7f828da76d.png"> 
</p>

Then add the variables to your Netlify Deployment:

<p align="center" width="100%">
<img width="50%"" src="https://user-images.githubusercontent.com/20285232/181789867-ebd6a197-8125-47a1-9bd1-8f8f01e24f29.png"> 
</p>
</details>
