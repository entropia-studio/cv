import { Component, OnInit } from '@angular/core';
import { LangService } from '../services/lang.service';
import { DatabaseService } from '../services/database.service';
import { Experience } from '../interfaces/experience';


@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements OnInit {

  language: string;
  jobs: Array<Experience>;

  constructor(
    private db: DatabaseService,
    public langService: LangService,
  ) { }

  ngOnInit() {
    this.langService.currentLanguage.subscribe(lang => {
      this.language = lang; 
      this.setJobsByLanguage(lang);     
    }) 
  }

  setJobsByLanguage(lang: string){
    this.db.getExperience().subscribe((jobs) => {      
      this.jobs = [];            
      jobs.forEach(job => {
        // Search de keys by language
        let position = job.position.find(o => o.lang === lang);
        let description = job.description.find(o => o.lang === lang);        
        let period = job.period.find(o => o.lang === lang);        
        this.jobs.push({
          _id: job._id,
          position: [position],
          description: [description],
          period: [period],
          company: job.company          
        });
      })      
    });       
  }

}
