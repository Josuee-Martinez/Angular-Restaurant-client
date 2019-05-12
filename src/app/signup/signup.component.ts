import { Component, OnInit, Input } from '@angular/core';
import {Router} from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import {TokenService} from '../token.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  loggedIn;

  constructor(private router: Router, private tokenservice: TokenService) {
    this.loggedIn = false;
   }

  ngOnInit() {
  }

  run(e) {
    e.preventDefault();

    let username = e.target.elements[0].value;
    let password = e.target.elements[1].value;
    
    fetch('http://localhost:3000/user/createuser', {
      method: 'POST',
      body: JSON.stringify({user: {username: username, password: password}}),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then(res => res.json()).then((data) => {
       
      this.tokenservice.token = data.sessionToken;
       localStorage.setItem('token', this.tokenservice.token)
       console.log(this.tokenservice.token);
       
     }).then(() => {
       this.loggedIn = true;
       this.router.navigate(['home'])
     })
  }

}
