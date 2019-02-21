import { Injectable } from '@angular/core';

@Injectable()
export class XmlToObjParser {
  private tags: string[] = ["a", "abbr", "address", "acronym", "applet", "area", "article", "aside", "audio", "b", "base",
    "basefont", "bdi", "bdo", "bgsound", "big", "blink", "blockquote", "body", "br", "button",
    "canvas", "caption", "center", "cite", "code", "col", "colgroup", "command", "comment", "datalist", "dd",
    "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "em", "embed", "fieldset", "figcaption",
    "figure", "font", "footer", "form", "frame", "frameset", "h1", "h2", "h3", "h4", "h5", "h6",
    "head", "header", "hgroup", "hr", "html", "i", "iframe", "img", "input", "ins", "isindex", "kbd", "keygen",
    "label", "legend", "li", "link", "listing", "map", "mark", "marquee", "menu", "meta", "multicol", "nav", "nobr",
    "noembed", "noframes", "noscript", "object", "ol", "optgroup", "option", "output", "p", "param",
    "plaintext", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "script", "section", "select",
    "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table",
    "tbody", "td", "textarea", "tfoot", "th", "thead", "time", "title", "tr", "track", "tt", "u", "ul",
    "var", "video", "wbr", "xmp"];
  //------------------------------------------------------------------------------------------------
  serialize: XMLSerializer;
  constructor () {
    this.serialize = new XMLSerializer();
  }

  parseXmlFromStr (xmlStr: string): Object {
    let domData: XMLDocument;
    if (!xmlStr) return;
    domData = new DOMParser().parseFromString(xmlStr.trim().replace(/>\s+</g, '><'), "application/xml");
    return this.parseXmlToObj(domData.childNodes.item(0));
  }

  private parseXmlToObj(doc: Node): Object {
    if ((doc instanceof Element != true && doc.nodeType != 9) || (this.tags.indexOf(doc.nodeName) != -1) ) return;
    let obj: Object = {};
    obj[doc.nodeName]={};
    doc.attributes.length > 1 ? this.setXmlAttributesToObj.call(obj[doc.nodeName], doc):"";

    if (doc.childNodes.length > 1) {
      for (let i = 0; i < doc.childNodes.length; i++) {

        if ( doc.childNodes.item(i) instanceof Element != true || ( this.tags.indexOf(doc.childNodes.item(i).nodeName) != -1 )) {
          obj[doc.nodeName].txtData += this.serialize.serializeToString( doc.childNodes.item(i) );
        } else {
          if (!obj[doc.nodeName][doc.childNodes.item(i).nodeName])
            obj[doc.nodeName][doc.childNodes.item(i).nodeName] = this.parseXmlToObj(doc.childNodes.item(i))[doc.childNodes.item(i).nodeName];
          else if( !Array.isArray( obj[doc.nodeName][doc.childNodes.item(i).nodeName] ) ) {
            obj[doc.nodeName][doc.childNodes.item(i).nodeName] = [ obj[doc.nodeName][doc.childNodes.item(i).nodeName ],
              this.parseXmlToObj(doc.childNodes.item(i))[doc.childNodes.item(i).nodeName] ]
          } else {
            obj[doc.nodeName][doc.childNodes.item(i).nodeName].push( this.parseXmlToObj(doc.childNodes.item(i))[doc.childNodes.item(i).nodeName] );
          }
        }
      }
    } else if (doc.childNodes.length == 1) {
      if ( doc.childNodes.item(0) instanceof Element != true || (this.tags.indexOf(doc.childNodes.item(0).nodeName) != -1) ) {
        obj[doc.nodeName].txtData = this.serialize.serializeToString( doc.childNodes.item(0) );
      } else {
        obj[doc.nodeName][doc.childNodes.item(0).nodeName] = this.parseXmlToObj(doc.childNodes.item(0))[doc.childNodes.item(0).nodeName];
      }
    }
    return obj;
  }


  private setXmlAttributesToObj (element: Node) {

    if (element.attributes.length > 1) {
      for (let i =0; i < element.attributes.length; i++) {
        this[element.attributes[i].name] = element.attributes[i].value;
      }
    }
  }



  //------------------------------------------------------------------------------
  getExcludedTag (tag: string): string {
    if (this.tags.indexOf(tag) != -1) return this.tags[this.tags.indexOf(tag)];
    else return "Element is missing";
  }

  getExcludedTags (): string[] {
    return this.tags;
  }

  addExcludedTag (tag: string) {
    if (tag) this.tags.push(tag);
  }

  addExcludedTags (tags: string[]) {
    if (tags) this.tags = this.tags.concat(tags);
  }

  delExcludedTag (tag: string) {
    if (this.tags.indexOf(tag) != -1) delete this.tags[this.tags.indexOf(tag)];
  }
}
