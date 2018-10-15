import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

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
import { AuthGuard } from "./services/auth.guard";



const routes: Routes = [
  { path: 'do', component: DisplayComponent, canActivate: [AuthGuard] },
  { path: 'plan', component: InputComponent, canActivate: [AuthGuard] },
  { path: 'discover', component: CommunityComponent, canActivate: [AuthGuard] },
  { path: '', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'edit/:ideaId', component: InputComponent, canActivate: [AuthGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}