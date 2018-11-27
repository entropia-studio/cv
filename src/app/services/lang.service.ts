import { Injectable } from '@angular/core';
import { Languages } from './languages';
import { BehaviorSubject } from 'rxjs';

 
@Injectable({
  providedIn: 'root'
})
export class LangService {

  languages = new Languages();

  
  public _language = new BehaviorSubject('esp');
  currentLanguage = this._language.asObservable();

  constructor() {
    this.setLanguage('esp');
  } 

  setLanguage(lang: string){    
    this._language.next(lang);
  }


  getTag(tag: string,lang: string, formatText: string | null): string {
    
    var mTag = 'nop';

    this.languages.tags.forEach(element => {
      if (element.tag == tag){        
        element.lang.forEach(lang_tag => {          
          if (lang_tag.name == lang)            
            mTag = formatText !== null && formatText ? this.formatText(lang_tag.text,formatText) : lang_tag.text;          
        })
      }
    });
    return mTag;
  }

  formatText(str: string, type: string){
    switch(type){
      case 'uppercase':
        return str.toUpperCase;        
      case 'capitalize':
        return str[0].toUpperCase() + str.slice(1);        
    }
  }

}
