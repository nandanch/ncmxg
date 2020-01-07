import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NcmxgraphModule } from 'projects/ncmxg/src/public_api';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NcmxgraphModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
