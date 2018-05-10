import * as firebase from 'firebase';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import CleanupService from '../shared/cleanup.service';

@Injectable()
export class AuthenticationService {

  token = null;

  constructor(private router: Router,
              private cleanupService: CleanupService) {}

  signUp(email: string, password: string) {

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(response => {

        this.signIn(email, password);
      })
      .catch((e) => {
        console.log(`sign up error ${e}`);

      });
  }

  signIn(email: string, password: string) {
    this.token = null;
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((respone) => {
        const uid = respone.uid;
        this.router.navigate(['/recipes']);
        firebase.auth().currentUser.getIdToken()
        .then((token: string) => {
        this.token = {
          tok: token,
          uid: uid
          };
          this.cleanupService.cleanupObjects();
        });
      })
      .catch((e) => {
        console.log(`sign In error`);

      });
  }

  getToken() {
    firebase.auth().currentUser.getIdToken()
      .then((token: string) => {
        this.token.tok = token;
      });
    return this.token;
  }

  isAuthenticated() {
    if (this.token === null) {
      this.cleanupService.cleanupObjects();
    }
    return this.token != null;
  }

  logout() {

    firebase.auth().signOut();
    this.token = null;
    this.cleanupService.cleanupObjects();
    this.router.navigate(['/']);
  }

}
