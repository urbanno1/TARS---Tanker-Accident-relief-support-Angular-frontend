import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';

//Pages
import { pages } from './pages'
import { NtiRoutes } from './app.routing.module'
import { SharedModule } from './shared/shared.module';
import { providers } from './pages/provider';
import { AuthInterceptor } from './shared/services/auth/auth-interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '../../../../node_modules/@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    pages(),
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    NtiRoutes,
    RouterModule,
    SharedModule.forRoot(),
    CommonModule
  ],
  providers: [providers(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
  }],
  bootstrap: [AppComponent]
})

export class AppModule { }
