import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../interfaces/task';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskServiceService {
  url: string;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8000/';
  }

  isActive(task: Task) {
    if (task.status === true) {
      return task;
    } else {
      return;
    }
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.url + 'add', task);
  }

  getAllTask(): Observable<Task[]> {
    return this.http.get<Task[]>(this.url + 'tasks');
  }

  deleteTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.url + 'delete', task);
  }

  updateStatus(task: Task): Observable<Task> {
    console.log(task);
    return this.http.post<Task>(this.url + 'update', task);
  }

  getActiveTask(): Observable<Task[]> {
    return this.http.get<Task[]>(this.url + 'tasks').pipe(
      map(tasks => tasks.filter(task => task.status === true)),
    );
  }
}
