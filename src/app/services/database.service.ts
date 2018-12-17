import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../interfaces/project';
import { Experience } from '../interfaces/experience';
import { Education } from '../interfaces/education';
import { About } from '../interfaces/about';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  projects: Observable<Project>;
  
  constructor(
    private http: HttpClient
    ) { }

  getProjects(): Observable<Project[]>{
    return this.http.get<Project[]>(environment.apiUrl + '/portfolio');
  }

  getExperience(): Observable<Experience[]>{
    return this.http.get<Experience[]>(environment.apiUrl + '/experience');
  }

  getEducation(): Observable<Education[]>{
    return this.http.get<Education[]>(environment.apiUrl + '/education');
  }
  getAbout(): Observable<About>{
    return this.http.get<About>(environment.apiUrl + '/about');
  }



}
