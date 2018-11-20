import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { Project } from '../interfaces/project';

interface Chip{
  name: string;
  selected: boolean;
  color: string;
}

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {

  projects: Array<Project>;
  projectsBackup: Array<Project>;
  backSelected: boolean = false;
  frontSelected: boolean = false;
  types: Chip[] = [];
  technologies: Chip[] = [];

  constructor(
    private db: DatabaseService,
  ) {}

  ngOnInit() {
    
    this.db.getProjects().subscribe((projects) => {
      this.setArray(projects,'types');
      this.setArray(projects,'technologies');
      this.projects = projects;
      this.projectsBackup = projects;
    });    
  }

  setArray(projects: Project[],arrName: string){
    projects.forEach(project => {
      project[arrName].forEach(type => {
        // Search the type within the object's array
        let i = this[arrName].findIndex(t => t.name === type);
        if (i < 0){
          this[arrName].push({name: type,selected: true,color:''});
        }
      })
    })
  }
  
  filterByType(index: number){
    // Toogle chip selection and color
    this.toogleChip(this.types,index);  
    this.setProjectAndFilter('types');
  }

  filterByTechnology(index: number){
    // Toogle chip selection and color
    this.toogleChip(this.technologies,index);  
    this.setProjectAndFilter('technologies');    
  }  

  toogleChip(mArray: Array<Chip>,index: number){
    // Toogle chip selection and color
    mArray[index].selected = !mArray[index].selected;
    mArray[index].color = mArray[index].selected ? 'accent' : '';
  }

  setProjectAndFilter(arrName: string){
    this.projects = [];
    this[arrName].forEach(obj => {
      if (obj.selected){
        this.projectsBackup.forEach(project => {
          if (project[arrName].indexOf(obj.name) !== -1){
            this.addProjectToTemplate(project);                 
          }
        })  
      }      
    })      
  } 

  addProjectToTemplate(project: Project){
    //Check if the project is within the array yet
    let i = this.projects.findIndex(t => t._id === project._id);
    if (i < 0){
      this.projects.push(project);
    }       
  }

}
