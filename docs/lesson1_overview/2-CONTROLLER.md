# LESSON 2 - CONTROLLER

## I. What is a Controller?
- A Controller is a class that is responsible for handling incoming requests from the client and returning a response to the client.
- Controller plays a role of an input of the application, defines endpoints that end-users or other applications can access
- Syntax:

```ts
import { Controller, Get } from '@nestjs/common';

@Controller('cats')
export class CatsController {
    @Get()
    findAll(): string {
        return 'This action returns all cats';
    }
}
```

- To create a controller using the CLI, simply execute the following command:
```bash
# Full name of the command
nest g controller [name]

# Short name of the command
nest g co [name]
```

