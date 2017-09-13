import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { BarchartComponent } from './d3charts/barchart/barchart.component';
import { LinechartComponent } from './d3charts/linechart/linechart.component';
import { NnchartComponent } from './d3charts/nnchart/nnchart.component';

@NgModule({
  declarations: [
    AppComponent,
    BarchartComponent,
    LinechartComponent,
    NnchartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    FlexLayoutModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
