import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Project } from '../interfaces/project';
import { Experience } from '../interfaces/experience';
import { Education } from '../interfaces/education';
import { About } from '../interfaces/about';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/firestore';
import { map,catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  projects: Observable<Project>;
  private projectCollection: AngularFirestoreCollection<Project>;
  private experienceCollection: AngularFirestoreCollection<Experience>;
  private aboutCollection: AngularFirestoreCollection<About>; 
  private educationCollection: AngularFirestoreCollection<Education>; 
  
  
  constructor(
    private http: HttpClient,
    private afs: AngularFirestore, 
    ) { }

  getProjects(): Observable<Project[]>{    
    this.projectCollection =  this.afs.collection<Project>('projects',ref => ref.where('active','==',true).orderBy('order','asc'));    
    return this.projectCollection.valueChanges();
  }  

  getExperience(): Observable<Experience[]>{
    this.experienceCollection =  this.afs.collection<Experience>('experience',ref => ref.where('active','==',true).orderBy('order','asc'));
    return this.experienceCollection.valueChanges();
  }

  getEducation(): Observable<Education[]>{
    this.educationCollection = this.afs.collection<Education>('education',ref => ref.where('active','==',true).orderBy('order','asc'))
    return this.educationCollection.valueChanges();
  }
  getAbout(): Observable<About[]>{    
    this.aboutCollection = this.afs.collection<About>('about');
    return this.aboutCollection.valueChanges();    
  }

  /**
  * Handle Http operation that failed.
  * Let the app continue.
  * @param operation - name of the operation that failed
  * @param result - optional value to return as the observable result
  */
 private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {
  
    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead
  
    // TODO: better job of transforming error for user consumption
    console.log(`${operation} failed: ${error.message}`);
  
    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}


}
