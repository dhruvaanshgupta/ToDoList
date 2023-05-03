import { Query } from '@datorama/akita';
import { TaskState, TaskStore } from './store';
import { Task } from '../interfaces/task';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TaskQuery extends Query<TaskState> {
  constructor(private taskStore: TaskStore) {
    super(taskStore);
  }

  getTasks(): Observable<Task[]> {
    return this.select((state) => state.tasks);
  }

  getLoaded(): Observable<boolean> {
    return this.select((state) => state.isLoaded);
  }

  getIsLoading(): Observable<boolean> {
    return this.selectLoading();
  }
}
