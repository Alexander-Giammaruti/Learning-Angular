import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';





export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe('A Test Recipe', 'This is only a test of the emergency recipe system',
      'https://get.pxhere.com/photo/dish-food-recipe-fast-food-cuisine-garnish-snacks-vegetarian-food-power-supply-appetizer-tidbits-side-dish-arancini-hors-d-oeuvre-finger-food-rissole-croquette-fried-food-pakora-chicken-nugget-american-food-esfiha-kibe-vetkoek-1375826.jpg',
      [
        new Ingredient('Meat', 1),
        new Ingredient('Bread', 10),
        new Ingredient('Onion', 20)
      ])
  ];

  constructor() { }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    // .slice() returns a copy of the array rather than a direct reference
    return this.recipes.slice();
  }

  getRecipe(id: number){
    return this.recipes[id];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}