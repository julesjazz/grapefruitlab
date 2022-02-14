# Grapefruit Labs
> 11ty + Sanity  



## Sanity Studio
The Sanity studio should be treated as a different frontend project. The purpose is to provide a consistent accessible interface for content that can then be referenced into your front end of choice. To be clear, you are not accessing your content in your studio project, that content instead exists in the 'content lake' hosted storage. The studio gives you a handy method to access and update that cloud-stored content. And since the content lake is not otherwise defined, the studio lets you manage the structure of your content in one place - and it can also be a nice front end on its own for less tech savvy collaborators to add and access your content directly.  

### Running and deploying the studio. 
To run the studio in a dev environment:
- install the sanity cli, preferably globally: `npm install -g @sanity/cli`
- cd from the project directory to the studio `cd studio`
- run `sanity install` if you haven't yet to install your local dev environment
- run `sanity start` to run a local dev environment


- You may also extend your dev scripts from your primary node `package.json` if you choose
- The studio can be deployed very easily to Vercel, Netlify, or other preferred node project host as well.
  - _note: the schema structure can be different for deployed and dev environments, but you are accessing the same hosted content in both_

