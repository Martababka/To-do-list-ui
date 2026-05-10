import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {TaskService} from '../task.service';
import {Priority} from '../priority.enum';

@Component({
  selector: 'app-task-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './task-modal.html',
  styleUrl: './task-modal.css',
})
export class TaskModal {
  protected readonly taskService = inject(TaskService);

  taskForm = new FormGroup({
    id: new FormControl(null),

    description: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),

    completed: new FormControl(false, {
      nonNullable: true
    }),

    deadline: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),

    priority: new FormControl(Priority.LOW, {
      nonNullable: true,
      validators: [Validators.required]
    }),
  });

  protected onSubmit() {

    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }

    const task = this.taskForm.getRawValue();

    this.taskService.createTask(task).subscribe({
      next: (response) => {
        console.log('Task created:', response);
        this.taskForm.reset();
      },
      error: (err) => {
        console.error('Error:', err);
      }
    });
  }

  protected readonly Priority = Priority;
}
