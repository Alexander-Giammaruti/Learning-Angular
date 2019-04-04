import { Component, OnInit } from '@angular/core';
import { trigger } from '@angular/animations'
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('divstate', [
      
    ])
  ]
})
export class AppComponent implements OnInit {
  loadedTab = 'recipe';

  ngOnInit() {
    firebase.initializeApp({
      apiKey: "AIzaSyAoap19xdzI1Hy7CMvWnp7aSu74DnaCT94",
    authDomain: "ng-recipe-book-51696.firebaseapp.com",
    });
  }
  
  onNavigate(tab: string){
    this.loadedTab = tab;
  }
}
