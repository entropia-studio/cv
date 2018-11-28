import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-hr',
  templateUrl: './hr.component.html',
  styleUrls: ['./hr.component.scss']
})
export class HrComponent implements OnInit {

  @Input() title: string;

  isDarkTheme: Observable<boolean>;

  constructor(
    private themeService: ThemeService,
  ) { }

  ngOnInit() {
    this.isDarkTheme = this.themeService.isDarkTheme;
  }

}
