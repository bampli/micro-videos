# micro-videos
Video catalog admin backend

### DDD

![image](https://user-images.githubusercontent.com/86032/169137869-414c9e67-19a6-4458-a453-76c7d8273562.png)

### Nest.js

[more](https://github.com/bampli/micro-videos/issues/10)

![image](https://user-images.githubusercontent.com/86032/170346318-6e89b8f9-d51d-45df-a7bf-a09fd2512472.png)

### Monorepo with @core & nestjs

```
- dev tools
- app node.js + typescript
- domain category entity validation
- unit & integration tests
- use-case & repository

- other entities: genre, cast member, video

- nest.js api rest
- RabbitMQ & Encoder integration
- E2E tests

- entity: crucial rules (exist)
- services: app rules (persist)

```

## Templates


```

npm install typescript @types/node --save-dev
npm install npm@8.8.0 --save
npm install jest @types/jest --save-dev
npm install @swc/core @swc/jest --save-dev
npm install lodash @types/lodash --save-dev
npm install uuid @types/uuid --save
npm install create-ts-index --save-dev

npm install @swc/jest --save-dev -w nestjs
npm install @swc/core --save-dev -w nestjs

# TODO: check why it was NOT necessary to install
# Test InMemoryRepository part 1 (7:10)
npm install regenerator-runtime --save-dev

```

### Workflow

```

# Build @core
npm run build -w @fc/micro-videos

# Start nestjs development
npm run start:dev

# Create index.ts
npm run cti:@core -w @fc/micro-videos

# Compile @core --noEmit
npm run tsc:check -w @fc/micro-videos

# Tests @core & nestjs
npm run test
npm run test -- --projects src/@core
npm run test -- --projects src/nestjs

npm run test -w @fc/micro-videos

```

## Versions

```
jest @28.0.3
uuid @8.3.2
class-validator @0.13.2

```
