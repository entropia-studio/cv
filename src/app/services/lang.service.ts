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


  getTag(tag: string,lang: string): string {
    
    var mTag = 'nop';

    this.languages.tags.forEach(element => {
      if (element.tag == tag){        
        element.lang.forEach(lang_tag => {          
          if (lang_tag.name == lang)            
            mTag = lang_tag.text;          
        })
      }
    });
    return mTag;
  }

}
