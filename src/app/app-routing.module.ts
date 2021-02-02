import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemListComponent } from '../app/item/item-list/item-list.component';
import { SignUpComponent } from '../app/user/sign-up/sign-up.component';
import { ItemDetailComponent } from './item/item-detail/item-detail.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { NewUserComponent } from './user/new-user/new-user.component'
import { NewItemComponent } from './item/new-item/new-item.component'
const routes: Routes = [
  { path: 'items', component: ItemListComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'items/detail/:id', component: ItemDetailComponent },
  { path: 'login', component: SignInComponent },
  { path: 'user', component: UserDetailComponent },
  { path: "newuser", component: NewUserComponent },
  { path: "newitem", component: NewItemComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
