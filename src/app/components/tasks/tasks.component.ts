import { Component, OnInit } from '@angular/core';
import {
  faPlusCircle,
  faTrash,
  faCircle,
} from '@fortawesome/free-solid-svg-icons';
import { filter, switchMap, take } from 'rxjs';
import { Task } from 'src/app/interfaces/task';
import { TaskServiceService } from 'src/app/services/task-service.service';
import { TaskQuery } from 'src/app/state/query';
import { TaskStore } from 'src/app/state/store';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  taskList: Task[] = [];
  loading = false;
  isHidden: boolean = true;
  addTaskValue: string = '';
  eTask: Task = {
    task: '',
    status: true,
  };

  constructor(
    private taskService: TaskServiceService,
    private taskQuery: TaskQuery,
    private taskStore: TaskStore
  ) {}
  ngOnInit(): void {
    this.taskList = [];
    this.getTaskList();
  }

  getTaskList() {
    this.taskQuery.getIsLoading().subscribe((res) => (this.loading = res));
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

    // this.taskService.getAllTask().subscribe(
    //   (res) => {
    //     this.taskList = res;
    //   },
    //   (err) => {
    //     alert('Unable to get list of tasks!');
    //   }
    // );
  }

  addTask() {
    this.eTask.task = this.addTaskValue;
    this.eTask.status = true;
    this.taskStore.setLoading(true);
    if (this.eTask.task !== null && this.eTask.task !== '') {
      this.taskService.addTask(this.eTask).subscribe(
        (res) => {
          this.taskStore.update((state) => {
            return {
              tasks: [...state.tasks, res],
            };
          });
          this.taskStore.setLoading(false);
          this.addTaskValue = '';
        },
        (err) => {
          alert(err);
        }
      );
    } else {
      alert('You want to do nothing?');
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

  deleteTask(newTask: Task) {
    this.taskService.deleteTask(newTask).subscribe(
      (res) => {
        this.taskStore.update((state) => { 
          return {
            ...state,
            tasks: state.tasks.filter((t) => t._id!== newTask._id),
          }
        })
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
