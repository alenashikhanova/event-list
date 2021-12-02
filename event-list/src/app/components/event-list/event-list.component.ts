import { Component, Input, OnInit, OnDestroy, OnChanges } from '@angular/core';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { EventInterface } from 'src/app/interfaces/event.interface';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit, OnDestroy, OnChanges {

  subscriptions: Subscription = new Subscription();
  events!: EventInterface[];
  @Input() date!: string;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {}

  ngOnChanges(): void {
    this.initEvents();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  initEvents(): void {
    this.dataService.events.subscribe(events => {
      this.events = events.filter(event => moment(event.date).format('DD.MM.YYYY') === moment(this.date).format('DD.MM.YYYY'));
    });
  }
}
