import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  token = '';

  constructor(private router: Router) { }

  ngOnInit() {
  }

  login(e) {
    e.preventDefault();
    let username = e.target.elements[0].value;
    let password = e.target.elements[1].value;

    fetch('http://localhost:3000/user/signin', {
      method: 'POST',
      body: JSON.stringify({user: {username: username, password: password}}),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then((res) => {
      console.log(res.json().then((data) => {
        console.log(data);
        this.token = data.sessionToken;
        localStorage.setItem('token', data.sessionToken)
        console.log(this.token);
        
          this.router.navigate(['home']);
         // this.router.navigate(['home']);
      }))
    })
  }

}
