import { ExecutionContext, createParamDecorator } from "@nestjs/common";

// El decorador GetUser se encarga de extraer el usuario del objeto request y retornarlo.
// Este decorador es un decorador personalizado que se encarga de extraer el usuario del objeto request y retornarlo.
export  const GetUser = createParamDecorator(
    (data: string,  ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        const user = request.user;
        return data ? user[data] : user;
    }
)