import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EventInterface } from 'src/app/interfaces/event.interface';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  eventList: EventInterface[] = [];

  private dateSource = new BehaviorSubject<string>(new Date().toISOString());
  date = this.dateSource.asObservable();

  private eventsSource = new BehaviorSubject<EventInterface[]>(this.eventList);
  events = this.eventsSource.asObservable();

  constructor() { }

  setDate(date: string): void {
    this.dateSource.next(date);
  }

  addEvent(event: EventInterface): void {
    this.eventList.push(event);
    this.eventsSource.next(this.eventList);
  }

  deleteEvent(id: number): void {
    this.eventList = this.eventList.filter(event => event.id !== id);
    this.eventsSource.next(this.eventList);
  }
}
