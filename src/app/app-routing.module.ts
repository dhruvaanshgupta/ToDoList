import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { TasksComponent } from './components/tasks/tasks.component';
import { CustomPreloadingService } from './services/custom-preloading.service';

const routes: Routes = [
  {
    path: '',
    component: TasksComponent,
  },
  {
    path: 'activetasks',
    loadChildren: () =>
      import('./components/active/active.module').then((m) => m.ActiveModule),
  },
  {
    path: 'inactivetasks',
    loadChildren: () =>
      import('./components/inactive/inactive.module').then(
        (m) => m.InactiveModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: CustomPreloadingService
  })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
