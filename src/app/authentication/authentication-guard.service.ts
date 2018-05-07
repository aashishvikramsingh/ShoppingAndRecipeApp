import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {AuthenticationService} from './authentication.service';
import {Injectable} from '@angular/core';

@Injectable()
export class AuthenticationGuardService implements CanActivate {

  constructor(private authenticationService: AuthenticationService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.authenticationService.isAuthenticated();
  }
}
