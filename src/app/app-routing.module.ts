import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ItemListComponent} from '../app/item/item-list/item-list.component';
import {SignUpComponent} from '../app/user/sign-up/sign-up.component';
import { ItemDetailComponent } from './item/item-detail/item-detail.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
const routes: Routes = [
  {path:'items', component:ItemListComponent},
  {path:'signup', component:SignUpComponent},
  {path:'items/detail/:id', component:ItemDetailComponent},
  {path:'login', component:SignInComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
