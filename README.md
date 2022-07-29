<!-- <p align="center" width="100%" height="100%">
    <img width="55%" height="50%" src="https://user-images.githubusercontent.com/20285232/181688126-ad1d015c-4f67-4b00-b870-f73e59f05efa.png"> 
</p> -->

This is an example front-end for the confere example app. It uses nextjs, react-query, tailwind, and nhost as a backend (authentication, postgres database, graphql api.) This is an example front-end for the confere example app. It uses nextjs, react-query, tailwind, and nhost as a backend (authentication, postgres database, graphql api).

- [Getting Started](#getting-started)
- [Deploy to Nhost](#deploy-to-nhost)
  - [Connecting your Nhost application to a GitHub repository](#connecting-your-nhost-application-to-a-github-repository)
- [Deploying the front-end](#deploying-the-front-end)

## Getting Started

<details><summary><h3>Steps for setting up the Nhost Backend</h3></summary>

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

<details><summary><h3>Project structure walk along<h3></summary>


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


<details><summary><h4>GraphQL API Schema and Example Queries</h4></summary>
<p>

- Get a featured conference

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

</p>
</details>

## Deploy to Nhost
    
<img align="left" width="33%" src="https://user-images.githubusercontent.com/20285232/181691897-1269d9d3-94fb-4958-ac27-83a70ab00309.png" > 

Nhost is an open source Firebase alternative with GraphQL. Nhost is doing for the backend, what Netlify and Vercel are doing for the frontend. More importantly, by creating a project with Nhost you automatically get the following:

- Database: PostgreSQL
- Instant GraphQL API: Hasura
- Authentication: Hasura Auth
- Storage: Hasura Storage

We make it easy to build and deploy this backend using our platform that takes care of configuration, security, and performance. Things just works and scale automatically so you can focus on your product and on your business.

<details><summary>Steps for creating an Nhost application.</summary>
<p>

First things first, we need to create a new Nhost project.

So, log in to your Nhost dashboard and click the **Create your first app** button.

![Creating an Nhost Application](https://docs.nhost.io/assets/images/create-app-step-1-64d13fc87fac1d0989da25857e1c3811.png)

Next, give your new Nhost app a name, select a geographic region for your Nhost services and click Create App.

![Creating an Nhost Application](https://docs.nhost.io/assets/images/create-app-step-2-823c33a87887cbe28da98a85219dcc59.png)

After a few seconds, you should get a PostgreSQL database, a GraphQL API with Hasura, file storage, and authentication set up.

</p>
</details>

### Connecting your Nhost application to a GitHub repository

Nhost supports a git-based workflow which means that you can safely work locally with the CLI and when you are ~~confident~~ with your changes, you can push to your repository and your application will be automatically deployed (any following updates you push to your code will also be automatically be deployed.) To allow this, you need to connect this repository to your Nhost projects through the Nhost console:

<details><summary>Steps to connect this repository to your Nhost application</summary>

1. Fork/clone this repository to your GitHub account.

2. Provide the require permissions to select this repository to the official Nhost GitHub application.

3. Find your repository on the Nhost Console & connect it:

<p align="center" width="100%">
    <img width="55%" height="80%" src="https://user-images.githubusercontent.com/20285232/181070306-851187ca-6595-4cdc-b458-b62b479479db.png"> 
</p>


4. Once connected, the application will automatically deploy.

<p align="center" width="100%" height="100%">
    <img width="55%" height="500px" src="https://user-images.githubusercontent.com/20285232/181070624-f12571a4-6b77-4a2f-acab-9e156306b392.png"> 
</p>

5. Add changes to your application. Any changes you push to your repository will also be automatically be deployed (you can see your deployments on the "Deployments" section of the console)


<p align="center" width="100%">
    <img width="55%" height="500px" src="https://user-images.githubusercontent.com/20285232/181070633-c3c67e94-981c-4574-954b-c643448f387e.png"> 
</p>

</p>
</details>

## Deploying the front-end

