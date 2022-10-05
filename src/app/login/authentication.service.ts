import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authData: any = {
    "user1": {
      "name": "Admin",
      "permission": "All",
      "password": "Admin"
    },
    "user2": {
      "name": "MyName",
      "permission": "none",
      "password": "test"
    }
  };
  accessAll:boolean = false;

  constructor() { }

  authenticate(un: string, pw: string) {
    if (un === this.authData.user1.name && pw === this.authData.user1.password) {
      this.accessAll = true;
      return this.authData.user1.permission;
    }
    else if (un === this.authData.user2.name &&  pw === this.authData.user2.password) {
      this.accessAll = false;
      return this.authData.user2.permission;
    } else {
      return "false";
    }
  }
}
