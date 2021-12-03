import { Component, EventEmitter, Input, OnInit, Output, OnChanges, OnDestroy } from '@angular/core';
import { CalendarDateFormatter, CalendarEvent, CalendarView, DAYS_OF_WEEK } from 'angular-calendar';
import { startOfDay } from 'date-fns';
import { Subject, Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data/data.service';
import { CustomDateFormatter } from './custom-date-formatter.provider';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter,
    },
  ]
})
export class CalendarComponent implements OnInit, OnChanges, OnDestroy {

  @Input() eventsChanged: boolean = false;
  @Output() dayChanged = new EventEmitter<string>();

  subscriptions: Subscription = new Subscription();

  events: CalendarEvent[] = [];
  date: Date = new Date();

  view: CalendarView = CalendarView.Month;
  calendarView = CalendarView;
  viewDate: Date = new Date();

  refresh: Subject<boolean> = new Subject();
  weekStartsOn = DAYS_OF_WEEK.MONDAY;
  locale = 'ru';
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.initEvents();
  }

  ngOnChanges(): void {
    this.initEvents();
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    const newDate = date.toISOString();
    this.dataService.setDate(newDate);
    this.dayChanged.emit(newDate);
  }

  initEvents(): void {
    this.subscriptions.add(
    this.dataService.events.subscribe(events => {
      this.events = [];

      for (const event of events) {
        this.events.push({
          title: event.name,
          start: startOfDay(new Date(event.date)),
          color: colors.yellow
        });
      }

      this.refresh.next(true);
    }));
  }
}

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
