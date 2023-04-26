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
    this.getActiveTask();
  }

  totalActiveTask() {
    return this.taskList.length;
   }
  
  isActive(newTaskList : Task[]) {
    for (let task of newTaskList) {
      if (task.status === true) {
        this.activeTaskList.push(task);
      }
      newTaskList = this.activeTaskList;
      
    }
    return newTaskList;
  }


  getActiveTask() {
    this.taskService.getAllTask().subscribe(
      (res) => {
        this.taskList = res;
        this.taskList = this.isActive(this.taskList);
      },
      (err) => {
        alert(err);
      }
    );
  }
}
