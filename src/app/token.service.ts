import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  token = localStorage.getItem('token');

  // retrieveToken() {
  //   this.token = sessionStorage.getItem('token');
  //   console.log(this.token);
    
  // }

  constructor() { }
}
