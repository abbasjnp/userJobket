import { NgModule } from '@angular/core';
import { ServerModule,ServerTransferStateModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';
import {TRANSFER_RESPONSE_BASE_URLS} from 'angular-transfer-http-response';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    ModuleMapLoaderModule,
    ServerTransferStateModule
    
  ],
  bootstrap: [AppComponent],
  // providers: [{
  //   provide: TRANSFER_RESPONSE_BASE_URLS,
  //   useValue: ['http://localhost:4000']
  // }],
})
export class AppServerModule {}
