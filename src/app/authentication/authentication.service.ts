import * as firebase from 'firebase';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable()
export class AuthenticationService {

  token = null;

  constructor(private router: Router) {}

  signUp(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch((e) => console.log(`sign up error ${e}`));
  }

  signIn(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((respone) => {
      this.router.navigate(['/']);
      firebase.auth().currentUser.getIdToken()
        .then((token: string) => {
        this.token = token;
        });

      })
      .catch((e) => console.log(`sign up error ${e}`));
  }

  getToken() {
    firebase.auth().currentUser.getIdToken()
      .then((token: string) => {
        this.token = token;
      });
    return this.token;
  }

  isAuthenticated() {
    return this.token != null;
  }

  logout() {
    firebase.auth().signOut();
    this.token = null;
    this.router.navigate(['/']);
  }

}
