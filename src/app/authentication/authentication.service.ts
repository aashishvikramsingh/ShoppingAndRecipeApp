import * as firebase from 'firebase';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class AuthenticationService {

  token = null;
  email = '';
  cleanupRequired = new Subject<Boolean>();

  constructor(private router: Router) {}

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
        this.email = respone.email;
        const uid = respone.uid;
        this.router.navigate(['/recipes']);
        firebase.auth().currentUser.getIdToken()
        .then((token: string) => {
        this.token = {
          tok: token,
          uid: uid
          };
          this.cleanupRequired.next(true);
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
      this.cleanupRequired.next(true);
    }
    return this.token != null;
  }

  logout() {

    firebase.auth().signOut();
    this.token = null;
    this.cleanupRequired.next(true);
    this.router.navigate(['/']);
  }

  getUsername() {
    return this.email.split('@')[0];
  }

}
