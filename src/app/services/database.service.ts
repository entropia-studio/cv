import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../interfaces/project';
import { Experience } from '../interfaces/experience';
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
}
