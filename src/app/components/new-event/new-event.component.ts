import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, of, Subscription, switchMap } from 'rxjs';
import { EventInterface, EventType } from 'src/app/interfaces/event.interface';
import { DataService } from 'src/app/services/data/data.service';
import { NgForm } from '@angular/forms'

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.scss']
})
export class NewEventComponent implements OnInit, OnDestroy {

  isNew = true;
  type!: string | undefined;
  date!: string;

  types = Object.entries(EventType);
  subscriptions: Subscription = new Subscription();

  id = 0;
  name = 'День рождения собаки';
  budget = 300;
  address = '309 кв.';
  note = 'Купить хлеб';
  time = '13:59';

  constructor(private dataService: DataService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getEvent();
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
        id: this.isNew ? this.dataService.eventList.length : this.id,
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

  getEvent(): void {
    this.subscriptions.add(
    this.route.params.pipe(
      switchMap((params: Params): Observable<EventInterface> => {
          if (params['id']) {
            this.isNew = false;
            return this.dataService.getById(params['id']);
          }
          const emptyEvent: EventInterface = {
            id: this.id,
            name: this.name,
            date: this.date,
            budget: this.budget,
            address: this.address,
            note: this.note,
            time:this.time
          };

          return of(emptyEvent);
        }
      )
    )
    .subscribe(
      (event: EventInterface) => {

        if (event) {
            this.id = event.id;
            this.name = event.name;
            this.date = event.date;
            this.type = event.type || undefined;
            this.budget = event.budget || 0;
            this.address = event.address || '';
            this.note = event.note || '';
            this.time = event.time  || '';
        }
      },
    ));
  }
}
