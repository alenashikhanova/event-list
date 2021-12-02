import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EventInterface, EventType } from 'src/app/interfaces/event.interface';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  date!: string;
  constructor() { }

  ngOnInit(): void {}

  updateDate(date: string): void {
    this.date = date;
  }
}
