import { Component } from '@angular/core';
import { Task } from 'src/app/interfaces/task';
import { TaskServiceService } from 'src/app/services/task-service.service';

@Component({
  selector: 'app-inactive',
  templateUrl: './inactive.component.html',
  styleUrls: ['./inactive.component.scss'],
})
export class InactiveComponent {
  taskList: Task[] = [];
  inactiveTaskList: Task[] = [];

  constructor(private taskService: TaskServiceService) {}

  ngOnInit(): void {
    this.getInActiveTask();
  }

  totalInActiveTask() {
    return this.taskList.length;
  }

  isInActive(newTaskList: Task[]) {
    for (let task of newTaskList) {
      if (task.status === false) {
        this.inactiveTaskList.push(task);
      }
      newTaskList = this.inactiveTaskList;
    }
    return newTaskList;
  }

  getInActiveTask() {
    this.taskService.getAllTask().subscribe(
      (res) => {
        this.taskList = res;
        this.taskList = this.isInActive(this.taskList);
      },
      (err) => {
        alert(err);
      }
    );
  }
}
