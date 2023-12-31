import { ChangeDetectorRef, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { ClubsComponent } from './components/clubs/clubs.component';
import { ClubComponent } from './components/club/club.component';
import { FilterPipe } from './shared/toSearch.pipe';
import { HttpClientModule } from '@angular/common/http';
import { PlacesComponent } from './components/places/places.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/login/login.component';
import { FilteredclubsComponent } from './components/filteredclubs/filteredclubs.component';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { RegisterAdminComponent } from './components/register-admin/register-admin.component';
import { ForgotPasswordAdminComponent } from './components/forgot-password-admin/forgot-password-admin.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../app/environments/environment'

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
    FilterPipe,
    RegisterAdminComponent,
    ForgotPasswordAdminComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatAutocompleteModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
