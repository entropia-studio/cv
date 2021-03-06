import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule }    from '@angular/common/http';

//Forms
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


// Services
import { LangService } from './services/lang.service';


// Material
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatIconModule} from '@angular/material/icon';
import {MatChipsModule} from '@angular/material/chips';
import {MatMenuModule} from '@angular/material/menu';
import {MatDialogModule} from '@angular/material/dialog';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatInputModule} from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatExpansionModule} from '@angular/material/expansion';







//Components
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { HrComponent } from './hr/hr.component';

// Directives
import { HighlightDirective } from './directives/highlight.directive';
import { NavbarMenuDirective } from './directives/navbar-menu.directive';
import { ProjectComponent } from './project/project.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { ExperienceComponent } from './experience/experience.component';
import { AcademicComponent } from './academic/academic.component';

//Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PortfolioComponent,
    HrComponent,
    HighlightDirective,
    NavbarMenuDirective,
    ProjectComponent,
    AboutComponent,
    ContactComponent,
    ExperienceComponent,
    AcademicComponent
  ],
  entryComponents: [ProjectComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatSlideToggleModule,
    MatIconModule,
    MatChipsModule,
    MatMenuModule,
    MatDialogModule,
    MatProgressBarModule,
    MatInputModule,
    MatSnackBarModule,   
    MatExpansionModule,
    AngularFireModule.initializeApp(environment.firebase),   
    AngularFirestoreModule, 
    AngularFireAuthModule,
  ],
  providers: [LangService],
  bootstrap: [AppComponent]
})
export class AppModule { }
