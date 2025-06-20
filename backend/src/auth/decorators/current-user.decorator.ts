import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtPayloadUser } from '../auth.types';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): JwtPayloadUser => {
    const ctx = GqlExecutionContext.create(context);
    const gqlContext = ctx.getContext<{ req: { user: JwtPayloadUser } }>();
    const user = gqlContext.req.user;
    return user;
  }
);
