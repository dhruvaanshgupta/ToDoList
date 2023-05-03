import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/interfaces/task';
import { TaskServiceService } from 'src/app/services/task-service.service';
import { TaskQuery } from 'src/app/state/query';
import { TaskStore } from 'src/app/state/store';

@Component({
  selector: 'app-active',
  templateUrl: './active.component.html',
  styleUrls: ['./active.component.scss'],
})
export class ActiveComponent implements OnInit {
  taskList: Task[] = [];
  activeTaskList: Task[] = [];

  constructor(
    private taskService: TaskServiceService,
    private taskQuery: TaskQuery,
    private taskStore: TaskStore
  ) {}

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
        this.taskStore.update((state) => {
          const tasks = [...state.tasks];
          const index = tasks.findIndex((t) => t._id === newTask._id);
          tasks[index] = {
            ...tasks[index],
            status: !newTask.status,
          };
          return {
            ...state,
            tasks,
          };
        });
      },
      (err) => {
        alert('Failed to update status');
      }
    );
  }
  
  getActiveTask() {
    this.taskQuery.getTasks().subscribe(
      (res) => {
        this.taskList = res.filter((res) => this.isActive(res));
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
