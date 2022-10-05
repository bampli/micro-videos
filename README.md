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

- Monorepo:
    src/
      project1/
          package.json
      project2/
          package.json

- entity: crucial rules (exist)
- services: app rules (persist)

```

![image](https://user-images.githubusercontent.com/86032/193650879-9226ec52-6939-477a-9399-5fb8e2c57cbe.png)

```
END-TO-END TESTS
- how to create end-to-end tests
- speed up end-to-end tests (mysql, migrations)
- error handling
- validation errors
- serialization - data wrapper

TEST /categories
- levantar aplicação (config artefatos e db)
- fazer na prática requisicao HTTP
- verificar resposta HTTP (status code, body, headers, etc)

```

## Templates

### API

```
{ data: {id: 1, name: 'cat1', ...}}
{ data: [], meta: {}}

```

### Install


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
npm install sequelize sequelize-typescript -w @fc/micro-videos --save
npm install sqlite3 -w @fc/micro-videos --save
npm install chance -w @fc/micro-videos --save
npm install @types/chance -w @fc/micro-videos --save-dev

# TODO: check why it was NOT necessary to install
# Test InMemoryRepository part 1 (7:10)
npm install regenerator-runtime --save-dev

```

### Nest.js

```

❯ cd src/nestjs
❯ nest g resource
? What name would you like to use for this resource (plural, e.g., "users")? categories
? What transport layer do you use? REST API
? Would you like to generate CRUD entry points? Yes
CREATE src/categories/categories.controller.spec.ts (616 bytes)
CREATE src/categories/categories.controller.ts (989 bytes)
CREATE src/categories/categories.module.ts (282 bytes)
CREATE src/categories/categories.service.spec.ts (488 bytes)
CREATE src/categories/categories.service.ts (667 bytes)
CREATE src/categories/dto/create-category.dto.ts (34 bytes)
CREATE src/categories/dto/update-category.dto.ts (185 bytes)
CREATE src/categories/entities/category.entity.ts (25 bytes)
UPDATE package.json (1747 bytes)
UPDATE src/app.module.ts (332 bytes)
✔ Packages installed successfully.


```

### Workflow

```

# Build @core
npm run build -w @fc/micro-videos
npm run build -w nestjs

# Start nestjs development
npm run start:dev

# Create index.ts
npm run cti:make -w @fc/micro-videos

# Compile @core --noEmit
npm run tsc:check -w @fc/micro-videos

# Tests @core & nestjs
npm run test
npm run test -- --projects src/@core
npm run test -- --projects src/nestjs

npm run test -w @fc/micro-videos
npm run test:cov -w @fc/micro-videos

# Install @core
npm install -w @fc/micro-videos dotenv

# Install nestjs
npm install -w nestjs @nestjs/config
npm install -w nestjs joi

nest g module config
CREATE src/config/config.module.ts (83 bytes)
UPDATE src/app.module.ts (733 bytes)

# Database module
cd src/nestjs
nest g module database

npm install @nestjs/sequelize -w nestjs
npm install --save-dev @types/sequelize -w nestjs

npm install mysql2 -w @fc/micro-videos

npm install class-transformer -w nestjs

nest g interceptor @share/interceptors/wrapper-data

```

## Versions

```
jest @28.0.3
uuid @8.3.2
class-validator @0.13.2
sequelize @6.20.0
sequelize-typescript @2.1.3
@types/sequelize @4.28.14
sqlite3 @5.0.8
chance @1.1.8
@nestjs/sequelize @9.0.0
mysql2 @2.3.3

```

## Entity generator

There is a script to generate a new entity, similar to 'Category'. It will be replicated.

### Usage

```
./new-entity.sh entity-name-singular entity-name-plural [save]

Examples:

# Do not change, just show the commands to create the "cyclo" entity:
./new-entity.sh cyclo cyclos

# Create the "stage" entity:
./new-entity.sh stage stages save

```

Without 'save' there will be no changes, just to check generated commands.

With 'save' option you change only files names. You should then use vscode to "replace in files" all *category/Category* and *categories/Categories* contents for the corresponding new entity.

After running the script, do some adjustments at:

- src/@core/.swcrc
- src/@core/cti.sh
- src/@core/package.json
- src/@core/tsconfig.json
- src/nestjs/jest.config.ts

And finally run:

```
  npm run cti:make -w @fc/cyclo-back
  npm run build -w @fc/cyclo-back
```
