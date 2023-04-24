# Quasar, Vue,Apollo,GraphQL,MongoDB App (quasar-auth-apollo)

A Quasar Framework app and Apollo with GraphQL

## copy local src of app
```bash
git clone https://github.com/alexxsub/quasar-auth-apollo.git
```

## run MongoDB
## need docker and compose or install docker desktop
```bash
cd quasar-auth-apollo
docker compose up - d
```

## Install the dependencies (change)
this app for node 12 and quasar 1.x
```bash
nvm install 12.22.12
nvm use 12.22.12
npm i
```

## Init demo data
```bash
npm run db-init
```

### Start the backend app in development mode (hot-code reloading, error reporting, etc.)
```bash
npm run server
```
### Start the frontend app in development mode (hot-code reloading, error reporting, etc.)
this app for node 12 and quasar 1.x
```bash
nvm use 12.22.12
npm run client
```

### open http://localhost:8080

### Lint the files
```bash
npm run lint
```

### Build the app for production
```bash
quasar build
```

### Customize the configuration
See [Configuring quasar.conf.js](https://quasar.dev/quasar-cli/quasar-conf-js).
