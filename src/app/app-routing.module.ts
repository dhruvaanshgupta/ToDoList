import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { InactiveComponent } from './components/inactive/inactive.component';
import { ActiveComponent } from './components/active/active.component';

const routes: Routes = [
  
      {
        path: '',
        component: TasksComponent,
      },
      {
        path: 'inactiveTasks',
        component: InactiveComponent,
      },
      {
        path: 'activeTasks',
        component: ActiveComponent,
      },
   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
