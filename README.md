# News

News is a (fake) application to edit your news before mailing. 

View the [Demo](https://jlcanela.github.io/news/) on github pages.

Data security: 
- the application is hosted in github pages, there is no backend

# Run

To run locally the application
```
pnpm run dev
```

# Publish module

Configure GitHub Authentication:
- Create a GitHub Personal Access Token (PAT) with packages:read and packages:write permissions
- Add your GitHub token to your .npmrc:
```bash
echo "//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN" >> ~/.npmrc
```

and then: 
```
cd packages/news-mailing && pnpm publish --access public
```

# Use MailingRemote Feature

Start the feature locally

```
pnpm run mailing-remote
```

You can now access MailingRemote feature locally from [Demo](https://jlcanela.github.io/news/).