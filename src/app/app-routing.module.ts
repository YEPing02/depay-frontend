import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ItemListComponent} from '../app/item/item-list/item-list.component';
import {SignUpComponent} from '../app/user/sign-up/sign-up.component';
const routes: Routes = [
  {path:'items', component:ItemListComponent},
  {path:'signup', component:SignUpComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
