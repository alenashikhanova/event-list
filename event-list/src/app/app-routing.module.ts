import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewEventComponent } from './components/new-event/new-event.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'new-event', component: NewEventComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
