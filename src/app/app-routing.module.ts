import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
//import { auth } from 'firebase';
import { HomeComponent } from './core/home/home.component';



const appRoutes: Routes = [
    {path: '',  component: HomeComponent},
    //Lazy Loading! (not everything is loaded at the start of the SPA)
    {path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule'},  
    {path: 'shopping-list', loadChildren: './shopping-list/shopping-list.module#ShoppingListModule'}
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {

}    
