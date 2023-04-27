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

  isInActive(task: Task) {
    if (task.status === false) {
      return task;
    } else {
      return;
    }
  }

  getInActiveTask() {
    this.taskService.getAllTask().subscribe(
      (res) => {
        this.taskList = res.filter(res=>this.isInActive(res));
      },
      (err) => {
        alert(err);
      }
    );
  }
}
