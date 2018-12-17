import { Component, OnInit } from '@angular/core';
import { LangService } from '../services/lang.service';
import { DatabaseService } from '../services/database.service';
import { About } from '../interfaces/about'


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  language: string;
  aboutContent: About;

  constructor(
    public langService: LangService,
    private db: DatabaseService,
  ) { }

  ngOnInit() {
    this.langService.currentLanguage.subscribe(lang => {
      this.language = lang;   
      this.setAboutByLanguage(lang);    
    })     
  }

  setAboutByLanguage(lang: string){
    this.db.getAbout().subscribe((doc) => {                  
      // Search de keys by language
      let head = doc.head.find(o => o.lang === lang);
      let paragraph = doc.paragraph.find(o => o.lang === lang);              
      this.aboutContent = {
        head: [head],
        paragraph: [paragraph],
        skills : doc.skills
      }      
    })      
    
  }

}
