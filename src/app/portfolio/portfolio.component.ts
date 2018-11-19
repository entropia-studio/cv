import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { Observable } from 'rxjs' ;
import { Project } from '../interfaces/project';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {

  projects: Array<Project>;
  projectsBackup: Array<Project>;

  constructor(
    private db: DatabaseService,
  ) { }

  ngOnInit() {
    
    this.db.getProjects().subscribe((projects) => {
      this.projects = projects;
      this.projectsBackup = projects;
    });    
  }

  filterByType(type:string){
    var mProjects: Project[] = [];
    this.projectsBackup.forEach(project => {
      if (project.type.indexOf(type) !== -1){
        mProjects.push(project);
      }
    })
    this.projects = mProjects;
  }

}
