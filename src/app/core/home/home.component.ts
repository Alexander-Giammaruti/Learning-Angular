import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromApp from '../../store/app.reducers'
import * as fromAuth from '../../auth/store/auth.reducers'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isAuthenticated: Observable<fromAuth.State>;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.isAuthenticated = this.store.select('auth');
  }


}
