import { Router } from '@angular/router';
import { Effect, Actions, ofType } from '@ngrx/effects'
import { Injectable } from '@angular/core';
import { map, switchMap, mergeMap } from 'rxjs/operators';
import { from } from 'rxjs';

import * as firebase from 'firebase';

import * as AuthActions from './auth.actions';



@Injectable()
export class AuthEffects {


    @Effect()
    authSignup = this.actions$
        .pipe(ofType(AuthActions.TRY_SIGNUP))
        .pipe(map((action: AuthActions.TrySignup) => {
            return action.payload;
        }))
        .pipe(switchMap((authData: {email: string, password: string}) => {
            return from(firebase.auth().createUserWithEmailAndPassword(authData.email, authData.password))
        }))
        .pipe(switchMap(() => {
            return from(firebase.auth().currentUser.getIdToken());
        }))
        .pipe(mergeMap((token: string) => {
            this.router.navigate(['/']);
            return [
                {
                    type: AuthActions.SIGNUP
                },
                {
                    type: AuthActions.SET_TOKEN,
                    payload: token
                }
            ]
        }));
    
    @Effect()
    authSignin = this.actions$
        .pipe(ofType(AuthActions.TRY_SIGNIN))
        .pipe(map((action: AuthActions.TrySignin) => {
            return action.payload;
        }))
        .pipe(switchMap((authData: {email: string, password: string}) => {
            return from(firebase.auth().signInWithEmailAndPassword(authData.email, authData.password))
        }))
        .pipe(switchMap(() => {
            return from(firebase.auth().currentUser.getIdToken());
        }))
        .pipe(mergeMap((token: string) => {
            this.router.navigate(['/']);
            return [
                {
                    type: AuthActions.SIGNIN
                },
                {
                    type: AuthActions.SET_TOKEN,
                    payload: token
                }
            ]
        }));

        @Effect({dispatch: false})
        authLogout = this.actions$
            .pipe(ofType(AuthActions.LOGOUT))
            .do(() => {
                this.router.navigate(['/']);
            })
            
    constructor(
        private actions$: Actions,
        private router: Router) {}
}