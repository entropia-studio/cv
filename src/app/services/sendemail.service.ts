import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { MailContact } from '../interfaces/mail-contact';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class SendemailService {

  constructor(
    private http: HttpClient
  ) { }
  
  sendEmail(mailObject: MailContact){
    return this.http.post<MailContact>(environment.apiUrl + '/contact-form',mailObject,httpOptions);
  }

}
