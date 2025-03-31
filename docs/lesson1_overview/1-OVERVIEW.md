# LESSON 1 - OVERVIEW

## 1. Prerequisites:
- Make sure that __Nodejs__ (version >= 20) is installed on your OS
  
## 2. Setup:
- Create a new folder
- Setup a new project with __Nest CLI__:
```bash
npm i -g @nestjs/cli
nest new <project-name>
```

**Warning**:   
- To create a new project with Typescript's stricter feature set, pass the `--strict` flag to the `nest new` command.
```bash
nest new --strict <project-name>
```

## 3. Project Structure:
```
src
├── app.controller.spec.ts
├── app.controller.ts
├── app.module.ts
├── app.service.ts
├── main.ts
```

| File | Description |
| --- | --- |
| `app.controller.ts` | The basic controller with a single route |
| `app.controller.spec.ts` | The unit tests for the controller |
| `app.module.ts` | The root module of the application |
| `app.service.ts` | The basic service with a single method |
| `main.ts` | The entry point of the application which uses the core function `NestFactory` to create a Nest application instance |

- The `main.ts` includes an async function, which will `bootstrap` the application:
```ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    await app.listen(3000);
}
void bootstrap().catch((error) => {
    console.error(error);
    process.exit(1);
});
```

## 4. Run the application:
- Run the application with the following command:
```bash
npm run start
```

- To watch for changes in your file, you can run the following command:
```bash 
npm run start:dev
```

## 5. Linting and formatting:
```bash
# Lint and autofix with eslint
npm run lint

# Format with prettier
npm run format
```