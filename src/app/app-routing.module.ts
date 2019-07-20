import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainSearchComponent } from './common/search/main-search/main-search.component';
import { MainLoginComponent } from './common/login/main-login/main-login.component';


const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: MainLoginComponent},
  {path: 'search', component: MainSearchComponent},
  {path: '**', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
