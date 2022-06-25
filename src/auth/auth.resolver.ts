import { Public } from '@common/decorators/public.decorator';
import { UserEntity } from '@common/entities/user.entity';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreateUserInput } from './dto/create-user.input';
import { EmailConfirmationInput } from './dto/email-confirmation.input';
import { AuthService } from './services/auth.service';
import { EmailConfirmationService } from './services/email-confirmation.service';

@Public()
@Resolver(of => UserEntity)
export class AuthResolver {
    constructor(
        private readonly authService: AuthService,
        private readonly emailConfirmationService: EmailConfirmationService,
    ) {}

    @Query(returns => UserEntity)
    async auth() {}

    @Mutation(returns => UserEntity)
    async createUser(@Args('createUserData') createUserData: CreateUserInput) {
        return await this.authService.signup(createUserData);
    }

    @Mutation(returns => UserEntity)
    async confirmEmail(
        @Args('emailConfirmationData')
        emailConfirmationData: EmailConfirmationInput,
    ) {
        return await this.emailConfirmationService.confirm(
            emailConfirmationData,
        );
    }
}
