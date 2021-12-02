import { Component, EventEmitter, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EventInterface, EventType } from 'src/app/interfaces/event.interface';
import { DataService } from 'src/app/services/data/data.service';
import { NgForm } from '@angular/forms'
@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.scss']
})
export class NewEventComponent implements OnInit, OnDestroy {

  type!: string;
  date!: string;

  types = Object.entries(EventType);
  subscriptions: Subscription = new Subscription();

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.initDate();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  initDate(): void {
    this.subscriptions.add(this.dataService.date.subscribe(date => this.date = date));
  }

  onSubmit(form: NgForm) {
    const newEvent: EventInterface = {
      id: this.dataService.eventList.length,
      name: form.value['name'],
      date: this.date,
      type: form.value['type'],
      budget: form.value['budget'],
      address: form.value['address'],
      note: form.value['note'],
      time: form.value['time']
    }

    this.dataService.addEvent(newEvent);
    this.router.navigateByUrl('');
  }

  changeValidators(field: string): void {
    this.type = field;
  }
}
