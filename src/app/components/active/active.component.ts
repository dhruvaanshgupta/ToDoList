import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/interfaces/task';
import { TaskServiceService } from 'src/app/services/task-service.service';

@Component({
  selector: 'app-active',
  templateUrl: './active.component.html',
  styleUrls: ['./active.component.scss'],
})
export class ActiveComponent implements OnInit {
  taskList: Task[] = [];
  activeTaskList: Task[] = [];

  constructor(private taskService: TaskServiceService) {}

  ngOnInit(): void {
    this.taskList = [];
    this.getActiveTask();
  }

  totalActiveTask() {
    return this.taskList.length;
  }


  isActive(task: Task) {
    if (task.status === true) {
      return task;
    } else {
      return;
    }
  }

  updateTask(newTask: Task) {
    this.taskService.updateStatus(newTask).subscribe(
      (res) => {
        this.ngOnInit();
      },
      (err) => {
        alert('Failed to update status');
      }
    );
  }

   getActiveTask() {
    this.taskService.getAllTask().subscribe(
      (res) => {
        this.taskList = res.filter(res=>this.isActive(res));
      },
      (err) => {
        alert(err);
      }
    );
  }
}
