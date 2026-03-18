import { inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { AuthState } from "../../store/models/auth.model";
import { map, Observable, take } from "rxjs";
import { selectIsLoggedIn } from "../../store/selectors/auth.selectors";

@Injectable()
export class AuthGuard implements CanActivate {
  private router: Router = inject(Router);
  private store = inject(Store<AuthState>);

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> {
    return this.store.select(selectIsLoggedIn).pipe(
      take(1),
      map(isLoggedIn => {
        if (!isLoggedIn) {
          this.router.navigate(['/auth']);
        }
        return isLoggedIn;
      })
    );
  }
}
