import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { ShoppingListEditComponent } from './shopping-list-edit/shopping-list-edit.component';
import { ShoppingListComponent } from './shopping-list.component';
import { FormsModule } from '@angular/forms';
import { ShoppingListRoutingModule } from './shopping-list-routing.module';


@NgModule({
    declarations: [
        ShoppingListEditComponent,
        ShoppingListComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ShoppingListRoutingModule
     ],
    exports: [],
    providers: [],
})
export class ShoppingListModule {

}