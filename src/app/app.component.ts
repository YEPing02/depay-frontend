import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {NgbConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'depay-frontend';
  constructor(ngbConfig: NgbConfig,public router :Router) {
    ngbConfig.animation = false;
  }
}

