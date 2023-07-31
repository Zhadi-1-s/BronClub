import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { ClubsComponent } from './components/clubs/clubs.component';
import { ClubComponent } from './components/club/club.component';
import { PlacesComponent } from './components/places/places.component';

const routes: Routes = [
  {path:'',redirectTo:'/main',pathMatch:'full'},
  {path:'main',component:MainComponent},
  {path:'clubs',component:ClubsComponent},
  {path:'clubs/:id',component:ClubComponent},
  {path:'**',redirectTo:'/clubs',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }