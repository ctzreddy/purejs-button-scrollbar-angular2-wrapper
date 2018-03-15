import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppResponsiveScrollComponent } from './responsive-scroll/responsive-scroll.component';

@NgModule({
  declarations: [
    AppComponent,
    AppResponsiveScrollComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
