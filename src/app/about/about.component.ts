import { Component, OnInit } from '@angular/core';
import { LangService } from '../services/lang.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  language: string;

  constructor(
    private langService: LangService,
  ) { }

  ngOnInit() {
    this.langService.currentLanguage.subscribe(lang => {
      this.language = lang;      
    }) 
  }

}
