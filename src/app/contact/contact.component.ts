import { Component, OnInit } from '@angular/core';
import { LangService } from '../services/lang.service';
import { FormGroup, Validators, FormBuilder, ValidatorFn, ValidationErrors} from '@angular/forms';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  language: string;

  constructor(
    private langService: LangService,
    private fb: FormBuilder,  
  ) { }

  ngOnInit() {
    this.langService.currentLanguage.subscribe(lang => {
      this.language = lang;      
    }) 
  }

  contactForm = this.fb.group({
    'firsName': ['', Validators.required],
    'secondName': [''],    
    'email': ['',Validators.email],
    'message' : ['',Validators.required]
  });

}
