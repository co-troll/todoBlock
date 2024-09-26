import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest<Request>();

        const token = request.cookies['userToken'];
        if(!token) {
            throw new UnauthorizedException('token not found')
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            // console.log("autg가드: ", decoded)
            request['uid'] = decoded;

            return true;
        } catch(err) {
            console.log(err.message);
            throw new UnauthorizedException("invalid token");
        }

    }
}