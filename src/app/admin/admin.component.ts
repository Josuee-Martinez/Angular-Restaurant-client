import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  token = '';

  constructor(private router: Router) { }

  ngOnInit() {
  }

    admin(e) {
    e.preventDefault();
    let username = e.target.elements[0].value;
    let password = e.target.elements[1].value;
    // let admin = e.target.elements[2].value;
      
    fetch('http://localhost:3000/admin/createadmin', {
      method: 'POST',
      body: JSON.stringify({admin: {username: username, password: password}}),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then((res) => {
      res.json().then((data) => {
        console.log(data);
        this.token = data.sessionToken;
        localStorage.setItem('token', data.sessionToken)
        console.log(this.token);
        
          this.router.navigate(['adminboard']);
         // this.router.navigate(['home']);
      })
    })
  }

}
