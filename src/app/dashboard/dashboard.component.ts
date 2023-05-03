import { Component, OnInit } from '@angular/core';
import { TaskServiceService } from '../services/task-service.service';
import { filter, switchMap, take } from 'rxjs';
import { TaskQuery } from '../state/query';
import { TaskStore } from '../state/store';
import { Task } from '../interfaces/task';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  loading = false;
  taskList: Task[] = [];

  constructor(
    private taskService: TaskServiceService,
    private taskQuery: TaskQuery,
    private taskStore: TaskStore
  ) {}
  ngOnInit(): void {
    this.getTaskList();
  }

  getTaskList() {
    this.taskQuery.getTasks().subscribe((res) => (this.taskList = res));

    this.taskQuery
      .getLoaded()
      .pipe(
        take(1),
        filter((res) => !res),
        switchMap(() => {
          this.taskStore.setLoading(true);
          return this.taskService.getAllTask();
        })
      )
      .subscribe(
        (res) => {
          this.taskStore.update((state) => {
            return {
              tasks: res,
              isLoaded: true,
            };
          });

          this.taskStore.setLoading(false);
        },
        (err) => {
          console.log(err);
          this.taskStore.setLoading(false);
        }
      );
  }
}
