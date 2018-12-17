import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { LangService } from '../services/lang.service';
import { Url } from 'url';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent {

  constructor(
    public langService: LangService,
    public dialogRef: MatDialogRef<ProjectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(data)
  }

  closeDialog(): void{    
    this.dialogRef.close();    
  }

}
