import { Component } from '@angular/core';
import { Task } from 'src/app/interfaces/task';
import { TaskServiceService } from 'src/app/services/task-service.service';
import { TaskQuery } from 'src/app/state/query';
import { TaskStore } from 'src/app/state/store';

@Component({
  selector: 'app-inactive',
  templateUrl: './inactive.component.html',
  styleUrls: ['./inactive.component.scss'],
})
export class InactiveComponent {
  taskList: Task[] = [];
  inactiveTaskList: Task[] = [];

  constructor(private taskService: TaskServiceService,
  private taskQuery : TaskQuery, private taskStore: TaskStore) { }

  ngOnInit(): void {
    
    this.getInActiveTask();
  }

  totalInActiveTask() {
    return this.taskList.length;
  }

  isInActive(task: Task) {
    if (task.status === false) {
      return task;
    } else {
      return;
    }
  }

  getInActiveTask()  {
    this.taskQuery.getTasks().subscribe(
      (res) => {
        this.taskList = res.filter((res) => this.isInActive(res));
        this.taskStore.update((state) => {
          return {
            tasks: res,
            isLoaded: true,
          };
        });
      },
      (err) => {
        alert(err);
      }
    );
  }
}
