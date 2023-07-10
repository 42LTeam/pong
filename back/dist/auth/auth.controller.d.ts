import { Response } from "express";
export declare class AuthController {
    login(): void;
    redirect(res: Response): void;
    status(): void;
    logout(): void;
}
