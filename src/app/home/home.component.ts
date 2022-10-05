import { AuthenticationService } from './../login/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  fruits: any = [
    {
      color: 'red',
      number: '0',
      text: 'Apple'
    },
    {
      color: 'orange',
      number: '0',
      text: 'Orange'
    },
    {
      color: 'purple',
      number: '0',
      text: 'Grapes'
    }
  ];
  updatedFruit: string = '';
  stack: any = [];
  displayCard:boolean = false;
  isOthers:boolean = true;

  constructor(private snackbar:MatSnackBar,private authService:AuthenticationService,
    private router:Router) { }

  ngOnInit() {
    if(this.authService.accessAll)
      this.isOthers = false;
    else
      this.isOthers = true;
  }

  addFruit(card, all) {
    all.map(fruit => {
      if (fruit.text === card.text) {
        if (fruit.number >= 0 && fruit.number < 10) {
          this.displayCard = true;
          fruit.number = parseInt(fruit.number) + 1;
          this.updateStack(fruit.color, 'add');
        }
        else{
          this.snackbar.open("Maxmimun quantity reached", "Warning", {
            duration: 2000,
          });
        }
        
      }
    });
  }

  removeFruit(card, all) {
    all.map(fruit => {
      if (fruit.text === card.text) {
        if (fruit.number > 0) {
          fruit.number = parseInt(fruit.number) - 1;
          this.updateStack(fruit.color, 'remove');
        }
        else{
          this.snackbar.open("No item to remove", "Warning", {
            duration: 2000,
          });
        }
      }
    });
  }

  updateStack(color: string, condition: string) {
    if (condition === 'add') {
      this.stack.push(color);
    }
    else {
      if (this.stack.indexOf(color) > -1) {
        let index = this.stack.lastIndexOf(color);
        this.stack.splice(index, 1);
      }
    }
  }

  logout() {
    this.router.navigate(['']);
  }

}
