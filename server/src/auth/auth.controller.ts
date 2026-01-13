import { Controller, Get, Req, UseGuards, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import type { Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) { }

    @Get('google')
    @UseGuards(GoogleAuthGuard)
    async googleAuth(@Req() req) { }

    @Get('google/callback')
    @UseGuards(GoogleAuthGuard)
    async googleAuthRedirect(@Req() req, @Res() res: Response) {
        const { access_token, user } = await this.authService.login(req.user);
        // Redirect to frontend with token
        res.redirect(`http://localhost:5173/login?token=${access_token}`);
    }
}
