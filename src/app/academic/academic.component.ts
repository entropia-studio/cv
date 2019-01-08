import { Component, OnInit } from '@angular/core';
import { LangService } from '../services/lang.service';
import { DatabaseService } from '../services/database.service';
import { Education } from '../interfaces/education';

@Component({
  selector: 'app-academic',
  templateUrl: './academic.component.html',
  styleUrls: ['./academic.component.scss']
})
export class AcademicComponent implements OnInit {

  language: string;
  degrees: Array<Education>;

  constructor(
    private db: DatabaseService,
    public langService: LangService,
  ) { }

  ngOnInit() {
    this.langService.currentLanguage.subscribe(lang => {
      this.language = lang; 
      this.setDegreesByLanguage(lang);     
    }) 
  }

  setDegreesByLanguage(lang: string){
    this.db.getEducation().subscribe((degrees) => {        
      this.degrees = [];            
      degrees.forEach(degree => {
        // Search de keys by language
        let name = degree.name.find(o => o.lang === lang);
        let description = degree.description.find(o => o.lang === lang);        
        let period = degree.period.find(o => o.lang === lang);        
        this.degrees.push({
          _id: degree._id,
          name: [name],
          description: [description],
          period: [period],
          school: degree.school          
        });
      })      
    });       
  } 

}
