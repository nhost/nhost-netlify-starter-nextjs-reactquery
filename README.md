https://user-images.githubusercontent.com/20285232/181749889-24593a54-2847-466c-8f73-6b3f754ad303.mp4

# Nhost Netlify Starter Template (nextjs-reactquery-graphql)

This is an example front-end for the multi-conference example app created with Nhost. It uses Next.js, React-Query, Tailwind, and Nhost as a backend (authentication, postgres database, graphql api) and Netlify to host the front-end.

- [Nhost Netlify Starter Template (nextjs-reactquery-graphql)](#nhost-netlify-starter-template-nextjs-reactquery-graphql)
  - [Getting Started](#getting-started)
  - [Deploy to Nhost](#deploy-to-nhost)
  - [Deploy to Netlify](#deploy-to-netlify)

## Getting Started

<details><summary><h6>Steps for setting up local development</h6></summary>

<p>
1. Clone the repository

```sh
git clone https://github.com/nhost/nhost
cd nhost
```

2. Install the dependencies

```sh
yarn install
```

3. Terminal 1: Start Nhost

```sh
nhost dev
```

4. Terminal 2: Start the Vue application

```sh
yarn dev
```

</p>
</details>

<details><summary><h6>Project structure walkthrough<h6></summary>

Inside this folder you are going to see both the specification for the backend (Nhost) and the front-end (Vue):

```
/
├── nhost/
├── .nhost/
├── public/
│   └── favicon.ico
├── src/
│   ├── components/
│   │   └── ...vue
│   └── pages/
│       └── IndexPage.vue
└── package.json
```

</details>

<details><summary><h6>GraphQL API Schema and Example Queries</h6></summary>
<p>

```graphql
query ConferencesQuery {
  conferences(where: {featured: {_eq: true}}) {
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

</p>
</details>

## Deploy to Nhost
    
<img align="left" width="40%" src="https://user-images.githubusercontent.com/20285232/181691897-1269d9d3-94fb-4958-ac27-83a70ab00309.png" > 

[Nhost](https://nhost.io/) is an open source Firebase alternative with GraphQL. Nhost is doing for the backend, what Netlify and Vercel are doing for the frontend. More importantly, by creating a project with Nhost you automatically get the following:
~~~
- Database: PostgreSQL.
- Instant GraphQL API: Hasura.
- Authentication: Hasura Auth.
- Storage: Hasura Storage.
- Serverless Functions: AWS Lambdas.
~~~

<details><summary><h6>Steps for creating an Nhost application</h6></summary>

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
<details><summary><h6>Connecting this repository to Nhost</h6></summary>
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

</p>
</details>
                                                                                                                                 
## Deploy to Netlify
                                                                                                                                 
<details><summary><h6>Steps for deploying this template to Netlify</h6></summary>
                                                                                                                                 
1. Clone this repo: ``
2. Make sure you are in the correct directory and run`yarn install` (or `npm install`.)
3. Run `yarn dev` (or `npm run dev`.)
4. Make your desired changes to the front-end.
5. Provide the necessary permissions to the Netlify application for your GitHub repository.
6. Add the correct environment variables from your Nhost application:

```
NEXT_PUBLIC_NHOST_SUBDOMAIN=YOUR_NHOST_APP_SUBDOMAIN
NEXT_PUBLIC_NHOST_REGION=YOUR_NHOST_APP_REGION
```
                                                                                                                                 
You can select these variables from your app overview:
                                                                                                                                 
<p align="center" width="100%">
<img width="50%"" src="https://user-images.githubusercontent.com/20285232/181790261-065d7e61-6986-4acc-94d7-5a7f828da76d.png"> 
</p>

Add the variables to your Netlify Deployment:     
  
<p align="center" width="100%">
<img width="50%"" src="https://user-images.githubusercontent.com/20285232/181789867-ebd6a197-8125-47a1-9bd1-8f8f01e24f29.png"> 
</p>
</details>
                                                                                                                             
