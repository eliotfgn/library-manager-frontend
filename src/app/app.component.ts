import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router, RouterEvent} from "@angular/router";
import {filter, map} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  showBars: boolean;

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.router.events
      .pipe(filter(ev => ev instanceof RouterEvent))
      .subscribe( data => {
        if (data instanceof RouterEvent) {
          this.showBars = !(data?.url == '/login' || data?.url == '/register');
        }
          console.log(this.showBars);
        }
      )
  }
}
