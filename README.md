# VueJS and Nhost Starter

This is an example project using Vue.js and Nhost to create a simple conference management application.

- Vuejs v3
- Tailwind v3.0
- Apollo (via nhost-apollo)

## Previews (WIP)
Backend: https://whffelfshrazjyufyihs.nhost.run/console/login
Front-end: https://friendly-khapse-f8288a.netlify.app/


## Features
- Conference organizers are able to register and log into the application.
- Conference organizers are able to create/edit/delete conferences and add speakers to them.

## Table of Contents:

- [VueJS and Nhost Starter](#vuejs-and-nhost-starter)
  - [Previews (WIP)](#previews-wip)
  - [Features](#features)
  - [Table of Contents:](#table-of-contents)
  - [Getting Started](#getting-started)
  - [Schema Description](#schema-description)
  - [Deploy to Nhost](#deploy-to-nhost)
    - [Creating a new Nhost Application](#creating-a-new-nhost-application)
    - [Connecting your Nhost application to a GitHub repository](#connecting-your-nhost-application-to-a-github-repository)
  - [Deploy to Netlify](#deploy-to-netlify)

## Getting Started

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

## Schema Description

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

## Deploy to Nhost

Nhost is the open source GraphQL backend (Firebase Alternative) and a development platform. Nhost is doing for the backend, what Netlify and Vercel are doing for the frontend. When deploying to Nhost you automatically get the following:

- Database: PostgreSQL
- Instant GraphQL API: Hasura
- Authentication: Hasura Auth
- Storage: Hasura Storage

We make it easy to build and deploy this backend using our platform that takes care of configuration, security, and performance. Things just works and scale automatically so you can focus on your product and on your business.

### Creating a new Nhost Application

First things first, we need to create a new Nhost project.

So, log in to your Nhost dashboard and click the **Create your first app** button.

![Creating an Nhost Application](https://docs.nhost.io/assets/images/create-app-step-1-64d13fc87fac1d0989da25857e1c3811.png)

Next, give your new Nhost app a name, select a geographic region for your Nhost services and click Create App.

![Creating an Nhost Application](https://docs.nhost.io/assets/images/create-app-step-2-823c33a87887cbe28da98a85219dcc59.png)

After a few seconds, you should get a PostgreSQL database, a GraphQL API with Hasura, file storage, and authentication set up.

### Connecting your Nhost application to a GitHub repository

Through the Nhost console interface you can connect this template to your Nhost application. When you do this, your application will be automatically deployed and any following updates you push to your code will also be automatically be deployed.

## Deploy to Netlify

