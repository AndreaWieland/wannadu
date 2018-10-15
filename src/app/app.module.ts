import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
	MatToolbarModule,
	MatButtonModule,
	MatPaginatorModule,
	MatCardModule,
	MatChipsModule,
	MatIconModule,
	MatFormFieldModule,
	MatInputModule,  
  MatExpansionModule,
  MatProgressSpinnerModule,
} from '@angular/material';

//Declarations of components
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DisplayComponent } from './display/display.component';
import { InputComponent } from './input/input.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { CommunityComponent } from './community/community.component';
import { AddTagComponent } from './add-tag/add-tag.component';
import { ShowTagComponent } from './show-tag/show-tag.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { AuthInterceptor } from './services/auth-interceptor';
import { AppRoutingModule } from './app-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    DisplayComponent,
    InputComponent,
    HeaderComponent,
    HomeComponent,
    CommunityComponent,
    AddTagComponent,
    ShowTagComponent,
    SignupComponent,
    LoginComponent,
  ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
   // RouterModule.forRoot(appRoutes),
    MatToolbarModule,
    MatButtonModule,
    MatPaginatorModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
