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

  constructor(
    private db: DatabaseService,
  ) { }

  ngOnInit() {
    
    this.db.getProjects().subscribe((projects) => {
      this.projects = projects;
    });
    
  }

}
