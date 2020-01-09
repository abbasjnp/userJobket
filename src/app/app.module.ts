import { BrowserModule,BrowserTransferStateModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HomeModule} from './home/home.module';
import { DataService } from './core/http/data.service';
import { AuthServices } from './core/auth/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AccountModule } from './account/account.module';
import { AppMaterialModule } from './app-material/app-material.module';
import { AuthService } from 'angularx-social-login';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorService } from './core/http/http-interceptor.service';
import {TransferHttpResponseModule} from 'angular-transfer-http-response';
import { Ng5SliderModule } from 'ng5-slider';
import { ToastrModule } from 'ngx-toastr';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'app-root' }),
    AppRoutingModule,
    HomeModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AccountModule,
    AppMaterialModule,
    TransferHttpResponseModule,
    BrowserTransferStateModule,
    Ng5SliderModule,
    ToastrModule.forRoot()
  ],
  providers: [
    AuthServices,
    DataService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    },
],
  bootstrap: [AppComponent]
})
export class AppModule { }
