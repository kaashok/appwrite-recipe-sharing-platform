import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AppWriteService } from './app-write.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(private appWriteService: AppWriteService, private router: Router) { }

    canActivate(router: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const currentUser = this.appWriteService.currentUser.value
        if (currentUser !== null && currentUser !== undefined && currentUser !== "") {
            return true;
        }
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}
