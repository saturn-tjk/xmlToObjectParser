import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import {XmlParser} from "@angular/compiler/src/ml_parser/xml_parser";
import { XmlToObjParser } from './servise/xmltoobjparser.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [XmlParser, XmlToObjParser],
  bootstrap: [AppComponent]
})
export class AppModule { }
