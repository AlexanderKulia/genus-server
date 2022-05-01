import { Body, Controller, Get, Post, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";
import { IResponse } from "../types";
import { AuthService } from "./auth.service";
import { SignInDto } from "./dto/sign-in.dto";
import { SignUpDto } from "./dto/sign-up.dto";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("signup")
  signUp(@Body() signUpDto: SignUpDto): Promise<IResponse> {
    return this.authService.signUp(signUpDto);
  }

  @Post("signin")
  async signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ accessToken: string }> {
    const { accessToken, refreshToken } = await this.authService.signIn(
      signInDto,
    );
    res.cookie("jid", refreshToken, { httpOnly: true });

    return { accessToken };
  }

  @Post("refresh_token")
  async refreshTokens(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ accessToken: string }> {
    const refreshToken = req.cookies.jid;
    const { newAccessToken, newRefreshToken } =
      await this.authService.refreshTokens(refreshToken);
    res.cookie("jid", newRefreshToken, { httpOnly: true });

    return { accessToken: newAccessToken };
  }

  @Get("logout")
  logout(@Res({ passthrough: true }) res: Response): boolean {
    // res.cookie("jid", "null", {
    //   httpOnly: true,
    //   maxAge: 0,
    //   expires: new Date(),
    // });
    res.clearCookie("jid");
    return true;
  }

  @Get("verify_user")
  verifyCurrentUser(@Req() req: Request): boolean {
    const refreshToken = req.cookies?.jid;
    return this.authService.verifyCurrentUser(refreshToken);
  }
}
