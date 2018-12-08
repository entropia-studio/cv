import { Component, OnInit, AfterContentInit } from '@angular/core';
import { ThemeService } from '../services/theme.service';
import { Observable, Subject } from 'rxjs';
import { LangService } from '../services/lang.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, AfterContentInit {

  isDarkTheme: Observable<boolean>;
  language: string;

  constructor(
    private themeService: ThemeService,
    private langService: LangService
  ) {
    
  }

  ngOnInit() {
    this.isDarkTheme = this.themeService.isDarkTheme;    
    this.langService.currentLanguage.subscribe(lang => {
      this.language = lang;
    })
  }

  ngAfterContentInit(){
    this.langService.setLanguage('esp');
  } 

  toggleDarkTheme(checked: boolean) {
    this.themeService.setDarkTheme(checked);
  }

  setLanguage(checked: boolean){    
    let lang = checked ? 'eng' : 'esp';
    this.langService.setLanguage(lang);
  }

  scrollToComponent(el){
    console.log('el',el)
    document.getElementById(el).scrollIntoView({behavior: "smooth"});
  }

}
