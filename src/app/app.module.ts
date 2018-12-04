import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule }    from '@angular/common/http';

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

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PortfolioComponent,
    HrComponent,
    HighlightDirective,
    NavbarMenuDirective,
    ProjectComponent,
    AboutComponent
  ],
  entryComponents: [ProjectComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatSlideToggleModule,
    MatIconModule,
    MatChipsModule,
    MatMenuModule,
    MatDialogModule,
    MatProgressBarModule
  ],
  providers: [LangService],
  bootstrap: [AppComponent]
})
export class AppModule { }
