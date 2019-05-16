import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-adminsignin',
  templateUrl: './adminsignin.component.html',
  styleUrls: ['./adminsignin.component.css']
})
export class AdminsigninComponent implements OnInit {
  loginError;

  constructor(private router: Router) { }

  ngOnInit() {
  }

    signin(e) {
    e.preventDefault();
    let username = e.target.elements[0].value;
    let password = e.target.elements[1].value;
    // let admin = e.target.elements[2].value;
      
    fetch('http://localhost:3000/admin/signinadmin', {
      method: 'POST',
      body: JSON.stringify({admin: {username: username, password: password}}),
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
          // this.token = data.sessionToken;
          localStorage.setItem('token', data.sessionToken)
          // console.log(this.token);
          
            this.router.navigate(['adminboard']);
           // this.router.navigate(['home']);
        }
      })
    })
  }
}
