import { inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
    authService = inject(AuthService);
    router: Router = inject(Router);

    canActivate(next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean {
        if (!this.authService.isUserLoggedIn) {
            this.router.navigate(['/auth']);
        }
        return this.authService.isUserLoggedIn;
    }
}