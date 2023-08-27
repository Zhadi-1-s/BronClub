import { ChangeDetectorRef, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { ClubsComponent } from './components/clubs/clubs.component';
import { ClubComponent } from './components/club/club.component';

import { HttpClientModule } from '@angular/common/http';
import { PlacesComponent } from './components/places/places.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/login/login.component';
import { FilteredclubsComponent } from './components/filteredclubs/filteredclubs.component';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ClubsComponent,
    ClubComponent,
    PlacesComponent,
    AdminComponent,
    LoginComponent,
    FilteredclubsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
