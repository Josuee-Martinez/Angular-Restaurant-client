import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {TokenService} from '../token.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // ids: number;
  // names: string;
  // ratings: number;
  // typeoffoods: string; 
  // reviews: string;

  restaurantData: Object;

  constructor(private authservice: AuthService, private tokenservice: TokenService, private router: Router) { }

  ngOnInit() {
    this.getrest();
  }

  addRestaurant(e) {
    let name = e.target.elements[0].value;
    let typeoffood = e.target.elements[1].value;
    let review = e.target.elements[2].value;
    let rating = e.target.elements[3].value;

    fetch('http://localhost:3000/user/restaurant', {
      method: 'POST',
      body: JSON.stringify({restaurant: {name: name, typeOfFood: typeoffood, review: review, rating: rating}}),
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': this.tokenservice.token
      })
    }).then((res) => {
      console.log(res.json().then((resp) => {
        console.log(resp);
        // this.names = resp.restaurantdata.name;
        // this.typeoffoods = resp.restaurantdata.typeOfFood;
        // this.reviews = resp.restaurantdata.review;
        // this.ratings = resp.restaurantdata.rating;
        this.getrest()
      })); 

    })
    e.preventDefault();  
  }


  getrest() {
    
    fetch('http://localhost:3000/user/restaurant', {
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

  deleteRest(e) {
    fetch(`http://localhost:3000/user/restaurant/${e.target.id}`, {
      method: 'DELETE',
      body: JSON.stringify({restaurant: {id: e.target.id}}),
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': this.tokenservice.token
      }) 
    }).then((res) => {
      this.getrest();
    })
    e.preventDefault()
  }

  updateRest(e) {
    let updatedname = e.target.elements[0].value;
    let updatedfood = e.target.elements[1].value;
    let updatedreview = e.target.elements[2].value;
    let updatedrating= e.target.elements[3].value;
    
    fetch(`http://localhost:3000/user/restaurant/${e.target.id}`, {
          method: 'PUT',
          body: JSON.stringify({restaurant: {id: e.target.id, name: updatedname, typeOfFood: updatedfood, review: updatedreview, rating: updatedrating}}),
          headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': this.tokenservice.token
          }) 
        }).then((res) => {
          console.log(res);
          this.getrest()       
        })
    console.log(updatedname);
    e.preventDefault() 
  }

  logOut(e) {
    localStorage.clear()
  }

}