import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import { map } from 'rxjs/operators'

import { Recipe } from '../recipes/recipe.model'
import { RecipeService } from '../recipes/recipe.service';

@Injectable()
export class DataStorageService {

    constructor(
            private http: HttpClient,
            private recipeService: RecipeService) {}

    storeRecipes() {
        //const token = this.authService.getToken();

        // return this.http.put('https://ng-recipe-book-51696.firebaseio.com/recipes.json', this.recipeService.getRecipes(),{
        //     observe: 'body',
        //     params: new HttpParams().set('auth', token)
        // });

        const req = new HttpRequest('PUT', 'https://ng-recipe-book-51696.firebaseio.com/recipes.json', this.recipeService.getRecipes(), {
            reportProgress: true
        })
        return this.http.request(req);
    }

    fetchRecipes() {
        //const token = this.authService.getToken();
        
        return this.http.get<Recipe[]>('https://ng-recipe-book-51696.firebaseio.com/recipes.json')
            .pipe(map(
            (recipes) => {
                for(let recipe of recipes) {
                    if(!recipe['ingredients']){
                        //console.log(recipe); //for testing purposes to verify population of an empty array of ingredients if none are present in the dummy backend
                        recipe['ingredients'] = []
                    }
                }
                return recipes;            
            }
        )).subscribe(
            (recipes: Recipe[]) => {
                this.recipeService.setRecipes(recipes);
            }
        );
    }
}