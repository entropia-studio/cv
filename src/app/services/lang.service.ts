import { Injectable } from '@angular/core';
import { Languages } from './languages';
 
@Injectable({
  providedIn: 'root'
})
export class LangService {

  languages = new Languages();

  constructor() { } 


  getTag(tag: string,lang: string): string | void{
    this.languages.tags.forEach(element => {
      if (element.tag == tag){
        element.lang.forEach(lang_tag => {
          if (lang_tag.name === lang){
            return lang_tag.text;
          }
        })
      }
    });
  }

}
