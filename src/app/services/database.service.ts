import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../interfaces/project';



@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  projects: Observable<Project>;
  
  constructor() { }
}
