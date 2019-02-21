import { Component } from '@angular/core';
import { xml } from './servise/xml';
import {XmlToObjParser} from "./servise/xmltoobjparser.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  xmObj:Object;
  jsonData;

  constructor (private xmlToObjParser: XmlToObjParser) {
    this.xmObj = this.getObjFromXmlStr(xml);
    this.jsonData = this.getJsonFromXmlStr(xml);
    console.log(this.xmObj);
  }

  getObjFromXmlStr(xmlStr: string): Object {
    return this.xmlToObjParser.parseXmlFromStr(xmlStr);
  }

  getJsonFromXmlStr (xmlStr: string) {
    return JSON.stringify(this.xmlToObjParser.parseXmlFromStr(xmlStr), null, ' ');
  }


}


