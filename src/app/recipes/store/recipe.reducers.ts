import { Recipe } from '../recipe.model';
import { Ingredient } from 'src/app/shared/ingredient.model';

import * as RecipeActions from './recipe.actions'

export interface FeatureState {
    recipes: State;
}

export interface State {
    recipes: Recipe[];
}

const initialState: State = {
    recipes: [
        new Recipe('A Test Recipe', 'This is only a test of the emergency recipe system',
          'https://get.pxhere.com/photo/dish-food-recipe-fast-food-cuisine-garnish-snacks-vegetarian-food-power-supply-appetizer-tidbits-side-dish-arancini-hors-d-oeuvre-finger-food-rissole-croquette-fried-food-pakora-chicken-nugget-american-food-esfiha-kibe-vetkoek-1375826.jpg',
          [
            new Ingredient('Meat', 1),
            new Ingredient('Bread', 10),
            new Ingredient('Onion', 20)
          ])
      ]
};

export function RecipeReducer(state = initialState, action: RecipeActions.RecipeActions) {
    switch(action.type) {
        case(RecipeActions.SET_RECIPES):
            return {
                ...state,
                recipes: [...action.payload]
            };
        case(RecipeActions.ADD_RECIPE):
            return {
                ...state,
                recipes: [...state.recipes, action.payload]
            }
        case(RecipeActions.UPDATE_RECIPE):
            const recipe = state.recipes[action.payload.index];
            const updatedRecipe = {
                ...recipe,
                ...action.payload.updatedRecipe
            };
            const recipes = [...state.recipes];
            recipes[action.payload.index] = updatedRecipe;
        
            return {
                ...state,
                recipes: recipes
            }
        case(RecipeActions.DELETE_RECIPE):
            const oldRecipes = [...state.recipes];
            oldRecipes.splice(action.payload, 1);

            return{ 
                ...state,
                recipes: oldRecipes
            }
        default: 
            return state;
    };
}