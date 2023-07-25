import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { ClubsComponent } from './components/clubs/clubs.component';

const routes: Routes = [
  {path:'',redirectTo:'/main',pathMatch:'full'},
  {path:'main',component:MainComponent},
  {path:'clubs',component:ClubsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
