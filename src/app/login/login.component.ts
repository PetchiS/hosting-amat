import { RouterModule, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userName:string;
  password:string;
  isLogin:any;

  constructor(private authService:AuthenticationService,private router:Router,private snackbar:MatSnackBar) { }

  ngOnInit() {
  }

  onLogin(){
    this.isLogin = this.authService.authenticate(this.userName,this.password);
    if(this.isLogin !== "false"){
      this.router.navigate(['home']);
    } 
    else {
      this.snackbar.open("You are unauthorised", "Warning", {
        duration: 2000,
      });
    }
  }
}
