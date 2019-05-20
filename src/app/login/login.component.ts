import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  token = '';
  loginError;
  loginSuccess;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  login(e) {
    e.preventDefault();
    let username = e.target.elements[0].value;
    let password = e.target.elements[1].value;
    let admin = e.target.elements[2].value;


    fetch('http://localhost:3000/user/signin', {
      method: 'POST',
      body: JSON.stringify({user: {username: username, password: password, admin: admin}}),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then((res) => {
      res.json().then((data) => {
        if(data.error) {
          this.loginError = data.error;
          setTimeout(() => {
            this.loginError = '';
          }, 4000);
        } else {
          console.log(data);
          this.token = data.sessionToken;
          localStorage.setItem('token', data.sessionToken)
          console.log(this.token);

          console.log(data.message);
          
          this.loginSuccess = data.message;

          setTimeout(() => {
            this.loginSuccess = '';
            this.router.navigate(['home']);
          }, 2000);

        }
      }).catch((err) => {
        console.log(err);
        
      })
    })
  }

}
