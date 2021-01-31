import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ItemListComponent } from './item/item-list/item-list.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { ItemDetailComponent } from './item/item-detail/item-detail.component';
import { httpInterceptorProviders } from './shared/https-interceptors';
import { DefaultHeaderComponent } from './shared/layout/default-header/default-header.component';
import { HomeComponent } from './shared/layout/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';

import { NewUserComponent } from './user/new-user/new-user.component';

import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { fr_FR } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import fr from '@angular/common/locales/fr';
import { NgZorroAntdModule } from './ng-zorro.module';
import { ContactListComponent } from './shared/message/contact-list/contact-list.component';
import { ConversationComponent } from './shared/message/conversation/conversation.component';
import { DefaultFooterComponent } from './shared/layout/default-footer/default-footer.component';

registerLocaleData(fr);


@NgModule({
  declarations: [
    AppComponent,
    ItemListComponent,
    SignUpComponent,
    SignInComponent,
    ItemDetailComponent,
    DefaultHeaderComponent,
    HomeComponent,
    NewUserComponent,
    ContactListComponent,
    ConversationComponent,
    DefaultFooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    NgZorroAntdModule
   ],
  providers: [httpInterceptorProviders, { provide: NZ_I18N, useValue: fr_FR }],
  bootstrap: [AppComponent]
})
export class AppModule { }
