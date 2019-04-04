import { Effect, Actions, ofType } from '@ngrx/effects';
import { switchMap } from 'rxjs/operators/switchMap';
import { map, withLatestFrom } from 'rxjs/operators';
import { HttpClient, HttpRequest } from '@angular/common/http'

import * as RecipeActions from './recipe.actions';
import * as fromRecipe from './recipe.reducers';
import { Recipe } from '../recipe.model';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

@Injectable()
export class RecipeEffects {
    @Effect()
    recipeGet = this.actions$
        .pipe(ofType(RecipeActions.GET_RECIPES))
        .pipe(switchMap((action: RecipeActions.GetRecipes) => {

            return this.http.get<Recipe[]>('https://ng-recipe-book-51696.firebaseio.com/recipes.json',{
                observe: 'body',
                responseType: 'json'
            })
    }))
    .pipe(map(
        (recipes) => {
            for(let recipe of recipes) {
                if(!recipe['ingredients']){
                    //console.log(recipe); //for testing purposes to verify population of an empty array of ingredients if none are present in the dummy backend
                    recipe['ingredients'] = []
                }
            }
            return {
                type: RecipeActions.SET_RECIPES,
                payload: recipes
            };            
        }));


    @Effect({dispatch: false})
    recipeStore =this.actions$
        .pipe(ofType(RecipeActions.STORE_RECIPES))
        .pipe(withLatestFrom(this.store.select('recipes')))
        .pipe(switchMap(([action, state]) => {
            const req = new HttpRequest('PUT', 'https://ng-recipe-book-51696.firebaseio.com/recipes.json', state.recipes, {
            reportProgress: true
        })
            return this.http.request(req);
        }))

    constructor(
        private actions$: Actions,
        private http: HttpClient,
        private store: Store<fromRecipe.FeatureState>) {}


}