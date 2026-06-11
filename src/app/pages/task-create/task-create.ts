import { TaskStatus } from './../../models/task.model';
import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { TuiDay, TuiMonth, TuiTime } from '@taiga-ui/cdk';
import { TuiButton, TuiTextfield } from '@taiga-ui/core';
import { TuiInputDate, TuiInputTime } from '@taiga-ui/kit';

import { TaskPriority } from './../../models/task.model';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-create',
  imports: [ReactiveFormsModule, RouterLink, TuiButton, TuiTextfield, TuiInputDate, TuiInputTime],
  templateUrl: './task-create.html',
  styleUrl: './task-create.scss',
})
export class TaskCreate {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly router = inject(Router);
  private readonly taskService = inject(TaskService);

  readonly defaultActiveMonth = signal(
    new TuiMonth(new Date().getFullYear(), new Date().getMonth()),
  );

  readonly form = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    description: [''],
    deadlineDate: [null as TuiDay | null, Validators.required],
    deadlineTime: [null as TuiTime | null, Validators.required],
    priority: ['medium' as TaskPriority, Validators.required],
    status: ['todo' as TaskStatus, Validators.required],
  });

  setPriority(priority: TaskPriority): void {
    this.form.controls.priority.setValue(priority);
  }

  setStatus(status: TaskStatus): void {
    this.form.controls.status.setValue(status);
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();

    if (!value.deadlineDate || !value.deadlineTime) {
      return;
    }

    const deadline = this.toDeadlineString(value.deadlineDate, value.deadlineTime);

    this.taskService.addTask({
      title: value.title,
      description: value.description || undefined,
      deadline,
      priority: value.priority,
      status: value.status,
    });

    this.router.navigate(['/']);
  }

  private toDeadlineString(date: TuiDay, time: TuiTime): string {
    const year = date.year;
    const month = String(date.month + 1).padStart(2, '0');
    const day = String(date.day).padStart(2, '0');

    const hours = String(time.hours).padStart(2, '0');
    const minutes = String(time.minutes).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }
}
