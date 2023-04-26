import { Component,OnInit } from '@angular/core';
import { faPlusCircle, faTrash, faCircle } from '@fortawesome/free-solid-svg-icons'
import { Task } from 'src/app/interfaces/task';
import { TaskServiceService } from 'src/app/services/task-service.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  taskList: Task[] = [];
  isHidden: boolean = true;
  addTaskValue: string = '';
  eTask: Task = {
    task: '',
    status: true
  };

  constructor(private taskService: TaskServiceService) {}
  ngOnInit(): void {
    this.taskList = [];
    this.getTaskList();
  }

  getTaskList() {
    this.taskService.getAllTask().subscribe(
      (res) => {
        this.taskList = res;
      },
      (err) => {
        alert('Unable to get list of tasks!');
      }
    );
  }

  addTask() {
    this.eTask.task = this.addTaskValue;
    this.eTask.status = true;
    if (this.eTask.task !== null && this.eTask.task !== '') {
      this.taskService.addTask(this.eTask).subscribe(
      (res) => {
        this.ngOnInit();
        this.addTaskValue = '';
      },
      (err) => {
        alert(err);
      }
    );
    }
    else {
      alert('You want to do nothing?');
    }
    
  }

  updateTask(newTask: Task) {
    
    this.taskService.updateStatus(newTask).subscribe((res) => {
      this.ngOnInit();
    },
      (err) => {
      alert('Failed to update status');
    })
  }

  deleteTask(newTask: Task) {
    this.taskService.deleteTask(newTask).subscribe(
      (res) => {
        this.ngOnInit();
      },
      (err) => {
        alert('Failed to delete task.' + err);
      }
    );
  }

  totalTask() {
    return this.taskList.length;
  }

  toggleHide() {
    this.isHidden = !this.isHidden;
  }
}
