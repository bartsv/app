import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MappaComponent } from './mappa/mappa.component';
import { NavbarComponent } from './navbar/navbar.component';
import { IndexComponent } from './index/index.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import { DetailComponent } from './detail/detail.component';
import { CommentiComponent } from './commenti/commenti.component';
import { PhotoComponent } from './photo/photo.component';
import { TokenInterceptor } from './classi/TokenInterceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import { ImageCropperModule } from 'ngx-image-cropper';
import {MatMenuModule} from '@angular/material/menu';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
@NgModule({
  declarations: [
    AppComponent,
    MappaComponent,
    NavbarComponent,
    IndexComponent,
    DetailComponent,
    CommentiComponent,
    PhotoComponent,
    ForgotPasswordComponent,
    ChangePasswordComponent
  ],
  imports: [
    MatMenuModule,
    BrowserModule,
    ImageCropperModule,
    MatButtonModule,
    MatSelectModule,
    AppRoutingModule,RouterModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatIconModule,
    BrowserAnimationsModule
  ],
  providers:  [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
