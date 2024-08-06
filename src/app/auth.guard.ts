import { inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { UserService } from "./service/user.service";

@Injectable()
export class AuthGuard implements CanActivate {
    userService: UserService = inject(UserService);
    router: Router = inject(Router);

    canActivate(next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean {
        if (!this.userService.isUserLoggedIn) {
            this.router.navigate(['/auth']);
        }
        return this.userService.isUserLoggedIn;
    }
}