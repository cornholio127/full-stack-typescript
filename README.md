# full-stack-typescript

## server/database
Create new migration file 'do-something'
```
npm run create do-something
```
Migrate to latest version
```
npm run migrate-up
```
Migrate 5 versions back
```
npm run migrate-down 5
```

## server/*-service
Generate database model
```
npm run gen-db
```
Generate GraphQL model
```
npm run gen-gql
```

## scripts
Build world
```
npx gulp installServices
npx gulp
npx gulp buildFrontendProxy
npx gulp buildCms
```
Load products
```
docker-compose -f server.yml up
npx ts-node product-generator.ts
```

## docker
Service development: Run database only
```
docker-compose -f db-only.yml up
```
Client development: Run services
```
docker-compose -f server.yml up
```
Run the whole application:
- Web: [http://localhost:8000](http://localhost:8000)
- API: [http://localhost:8000/api/](http://localhost:8000/api/)
- CMS: [http://localhost:1337/admin](http://localhost:1337/admin)
```
docker-compose up
```
