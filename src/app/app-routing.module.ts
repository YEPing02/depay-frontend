import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { from } from 'rxjs';
import { ItemListComponent } from '../app/item/item-list/item-list.component';
import { SignUpComponent } from '../app/user/sign-up/sign-up.component';
import { ItemDetailComponent } from './item/item-detail/item-detail.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { NewUserComponent } from './user/new-user/new-user.component'
const routes: Routes = [
  { path: 'items', component: ItemListComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'items/detail/:id', component: ItemDetailComponent },
  { path: 'login', component: SignInComponent },
  { path: "newuser", component: NewUserComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
