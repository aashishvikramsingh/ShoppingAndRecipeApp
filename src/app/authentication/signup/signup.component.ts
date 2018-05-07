import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthenticationService} from '../authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

  signUp(signUpForm: NgForm) {
    const email = signUpForm.value.email;
    const password = signUpForm.value.password;
    this.authenticationService.signUp(email, password);
  }
}
