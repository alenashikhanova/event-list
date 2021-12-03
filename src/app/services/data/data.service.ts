import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
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

  addEvent(newEvent: EventInterface): void {
    if (this.eventList.filter(event => event.id === newEvent.id).length) {
      this.eventList = this.eventList.filter(event => event.id !== newEvent.id);
      this.eventList.splice(newEvent.id, 0, newEvent);
    } else {
      this.eventList.push(newEvent);
    }

    this.eventsSource.next(this.eventList);
  }

  getById(id: number): Observable<EventInterface> {
    const event = this.eventList.filter(event => event.id === Number(id))[0];
    return of(event);
  }

  deleteEvent(id: number): void {
    this.eventList = this.eventList.filter(event => event.id !== id);
    this.eventsSource.next(this.eventList);
  }
}
