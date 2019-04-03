import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShoppingListComponent } from './shopping-list.component';
import { AuthGuard } from '../auth/auth-guard.service';

const shoppingListRoutes: Routes = [
    {path: '', component: ShoppingListComponent, canActivate: [AuthGuard]}
]

@NgModule({
    declarations: [],
    imports: [ 
        RouterModule.forChild(shoppingListRoutes)
    ],
    exports: [
        RouterModule
    ],
    providers: [],
})
export class ShoppingListRoutingModule {

}