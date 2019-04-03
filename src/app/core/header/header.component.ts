import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../../shared/data-storage.service';
import { HttpEvent } from '@angular/common/http';


import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromApp from '../../store/app.reducers';
import * as fromAuth from '../../auth/store/auth.reducers';
import * as AuthActions from '../../auth/store/auth.actions'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuthenticated: Observable<fromAuth.State>;

  constructor(private dataStorageService: DataStorageService,
              private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.isAuthenticated = this.store.select('auth');
  }

  onSaveData() {
    this.dataStorageService.storeRecipes().subscribe(
      (response: HttpEvent<Object>) => {
        console.log(response);
      }
    );
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes();
  }

  onLogout() {
    this.store.dispatch(new AuthActions.Logout());
  }


}
