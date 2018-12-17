import { Component, OnInit } from '@angular/core';
import { LangService } from '../services/lang.service';
import { SendemailService } from '../services/sendemail.service';
import { Validators, FormBuilder} from '@angular/forms';
import { MailContact } from '../interfaces/mail-contact';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  language: string;

  contactForm = this.fb.group({
    'firstname': ['', [Validators.required,Validators.minLength(3)]],
    'lastname': [''],        
    'phone' : ['',[Validators.required,Validators.minLength(9)]],
    'email': ['',[Validators.required,Validators.email]],
    'message' : ['',[Validators.required,Validators.minLength(10)]]
  });

  constructor(
    public langService: LangService,
    private fb: FormBuilder,  
    private sm: SendemailService,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.langService.currentLanguage.subscribe(lang => {
      this.language = lang;      
    }) 
  }

 

  sendForm(){    

    const mailObject: MailContact = {
      subject: 'Contacto currículo Javier Sánchez',
      message: this.getMessage(),
    }

    this.sm.sendEmail(mailObject).subscribe(() => {
      const messageSent = this.langService.getTag('messageSent',this.language,'capitalize');
      const close = this.langService.getTag('close',this.language,'capitalize');
      this.openSnackBar(messageSent,close);
    })
  }

  getMessage():string{
    
    let firstname = this.contactForm.get('firstname').value;
    let lastname = this.contactForm.get('lastname').value;
    let phone = this.contactForm.get('phone').value;
    let email = this.contactForm.get('email').value;
    let message = this.contactForm.get('message').value;    
    
    const bodyMessage = `<p>Nombre : ${firstname} ${lastname}</p>
                         <p>Teléfono: ${phone}</p>
                         <p>Email: ${email}</p><p>${message}</p>`;
    
    return bodyMessage;
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
