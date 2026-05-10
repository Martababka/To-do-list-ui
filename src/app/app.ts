import {Component, inject, signal} from '@angular/core';
import {TaskService} from './task.service';
import {TaskModal} from './task-modal/task-modal';

@Component({
  selector: 'app-root',
  imports: [
    TaskModal
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('list-ui');
  private listService = inject(TaskService);

  public tasks: TaskModel[] = [];

  ngOnInit() {
    this.listService.getToDoList().subscribe(list => {
      this.tasks = list;
    })
  }
}
