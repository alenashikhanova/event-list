import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CalendarEvent, CalendarEventAction, CalendarView, DAYS_OF_WEEK } from 'angular-calendar';
import {startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours} from 'date-fns';
import { Subject } from 'rxjs';
import { DataService } from 'src/app/services/data/data.service';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  @Output() dayChanged = new EventEmitter<string>();
  events: CalendarEvent[] = [];

  viewDate: Date = new Date();
  view: CalendarView = CalendarView.Month;
  date: Date = new Date();
  refresh: Subject<boolean> = new Subject();
  CalendarView = CalendarView;
  weekStartsOn = DAYS_OF_WEEK.MONDAY;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.initEvents();
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    const newDate = date.toISOString();
    this.date = date;
    this.dataService.setDate(newDate);
    this.dayChanged.emit(newDate);
    this.refresh.next(true);
  }

  initEvents(): void {
    this.dataService.events.subscribe(events => {
      for (const event of events) {
        this.events.push({
          title: event.name,
          start: new Date(event.date),
          color: colors.yellow
        });
      }
    });
  }

}
