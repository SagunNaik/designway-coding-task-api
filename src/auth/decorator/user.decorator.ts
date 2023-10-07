import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { IUserPayload } from "src/users/interfaces/user-payload.interface";


let user: IUserPayload;

export const updateUser = (payload: any) => {

    user = payload

}

export const User = createParamDecorator(
    (data: string, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        const user = request.user;

        return data ? user?.[data] : user;
    },
)