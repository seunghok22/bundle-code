import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) { }

    async validateUser(details: any) {
        const { email, googleId, firstName, lastName } = details;
        const user = await this.userService.findByEmail(email);
        if (user) {
            if (!user.googleId) {
                // If user exists but no googleId (e.g. created via other means?), update it.
                // For now just return user.
                // Or update googleId?
                await this.userService.updateGoogleId(user.id, googleId);
            }
            return user;
        }
        console.log('Creating new user', details);
        const newUser = await this.userService.create({
            email,
            googleId,
            nickname: `${firstName} ${lastName}`,
        });
        return newUser;
    }

    async login(user: any) {
        const payload = { email: user.email, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
            user,
        };
    }
}
