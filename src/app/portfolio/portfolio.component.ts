import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { LangService } from '../services/lang.service';
import { Project } from '../interfaces/project';
import { Chip } from '../interfaces/chip';
import { Observable } from 'rxjs';
import { ThemeService } from '../services/theme.service';
import { MatDialog } from '@angular/material';
import { ProjectComponent } from '../project/project.component';




@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {

  isDarkTheme: Observable<boolean>;

  projects: Array<Project>;
  projectsBackup: Array<Project>;  
  language: string;
  types: Chip[];
  technologies: Chip[];

  constructor(
    private db: DatabaseService,
    public langService: LangService,
    private themeService: ThemeService,
    public dialog: MatDialog,    
  ) {}

  ngOnInit() {
    this.isDarkTheme = this.themeService.isDarkTheme;
    this.langService.currentLanguage.subscribe(lang => {
      this.language = lang;
      this.setProjectsByLanguage(lang);
    }) 
        
  } 

  setProjectsByLanguage(lang: string){
    this.db.getProjects().subscribe((projects) => {
      this.setChipsArray(projects,'types');
      this.setChipsArray(projects,'technologies');    
      this.technologies = this.orderArrayByName(this.technologies);
      this.projects = [];      
      projects.forEach(project => {
        // Search de keys by language
        let name = project.name.find(o => o.lang === lang);
        let description = project.description.find(o => o.lang === lang);        
        this.projects.push({
          _id: project._id,
          name: [name],
          description: [description],
          technologies: project.technologies,
          url: project.url,          
          types: project.types
        });
      })
      this.projectsBackup = this.projects;      
    });       
  }

  setChipsArray(projects: Project[],arrName: string){
   this[arrName] = [];
    projects.forEach(project => {
      project[arrName].forEach(type => {
        // Search the type within the object's array
        let i = this[arrName].findIndex(t => t.name === type);
        if (i < 0){          
          this[arrName].push({name: type,selected: false,color: ''});
        }
      })
    })    
  }  

  orderArrayByName(mArr: Chip[]) : Chip[]{
    return mArr.sort((a,b) => {      
      return ((a.name < b.name) ? -1 : ((a.name > b.name) ? 1 : 0));      
    });
  }
  

  filterByType(index: number){
    // Toogle chip selection and color
    this.toogleChip(this.types,index);      
    this.setProjectAndFilter();    
  }

  filterByTechnology(index: number){
    // Toogle chip selection and color
    this.toogleChip(this.technologies,index);     
    this.setProjectAndFilter();      
  }  

  // Toogle chip selection and color
  toogleChip(mArray: Array<Chip>,index: number){    
    mArray[index].selected = !mArray[index].selected;
    mArray[index].color = mArray[index].selected ? 'accent' : '';    
  }

  setProjectAndFilter(){
    
    var typesSelected = this.countItemsSelected(this.types);    
    var techsSeleted = this.countItemsSelected(this.technologies);
    var mProjects: Array<Project>;
    if (typesSelected === 0){      
      if (techsSeleted === 0){
        mProjects = this.projectsBackup;        
      }else{
        mProjects = this.getProjectSelected('technologies',this.projectsBackup);
      }      
    }else{
      mProjects = this.getProjectSelected('types',this.projectsBackup);
      //this.setChipsArray(mProjects,'technologies');
      if (techsSeleted > 0){
        mProjects = this.getProjectSelected('technologies',mProjects);
      }      
    }
    this.projects = mProjects;
  } 

  getProjectSelected(filterArrName: string,mProject: Array<Project>) : Array<Project> {
    
    var mProjects: Array<Project> = [];

    this[filterArrName].forEach(obj => {
      if (obj.selected){
        mProject.forEach(project => {
          if (project[filterArrName].indexOf(obj.name) > -1){            
            mProjects = this.addArrayWithNoDuplicate(mProjects,project);            
          }
        })
      }
    })
    return mProjects;
  }

  //Counts the seleted items in types or technologies chips
  countItemsSelected(mArr: Array<Chip>) : number{
    var count = 0;
    mArr.forEach(obj => {
      if(obj.selected === true){
        count++;
      } 
    })
    return count;
  }

  // Add the object within the array just in case was not added previously
  addArrayWithNoDuplicate(mProjects: Array<Project>, project: Project) : Array<Project>{
    let i = mProjects.findIndex(t => t._id === project._id);
    if (i < 0){
      mProjects.push(project);
    }       
    return mProjects;
  }  

  openModal(project: Project){    
    this.dialog.open(ProjectComponent, {      
      data: {project: project,language: this.language}
    });    
  }
}
