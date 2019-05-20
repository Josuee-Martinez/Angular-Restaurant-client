import { Component, OnInit } from '@angular/core';
import {TokenService} from '../token.service';
import { log } from 'util';

@Component({
  selector: 'app-adminboard',
  templateUrl: './adminboard.component.html',
  styleUrls: ['./adminboard.component.css']
})
export class AdminboardComponent implements OnInit {
  restaurantData: Object;

  constructor(private tokenservice: TokenService) { }

  ngOnInit() {
    this.getAll()
  }

  getAll() {
    
    fetch('http://localhost:3000/user/getall', {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': this.tokenservice.token
      })
    }).then((res) => res.json()).then((response) => {
      this.restaurantData = response;  
      console.log(this.restaurantData);
      
    })   
  }

  deleteItem(e) {
    fetch(`http://localhost:3000/user/restaurant/deleteadmin/${e.target.id}`, {
      method: 'DELETE',
      body: JSON.stringify({restaurant: {id: e.target.id}}),
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': this.tokenservice.token
      }) 
    }).then((res) => {
      console.log(res)
      this.getAll();
    })
    console.log(e.target.id)
    e.preventDefault()
  }

  logOut(e) {
    localStorage.clear()
  }
}
