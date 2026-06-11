import { Component, inject, input } from '@angular/core';
import { TuiButton } from '@taiga-ui/core';

import { Task, TaskStatus } from '../../../models/task.model';
import { TaskService } from '../../../services/task.service';

@Component({
  selector: 'app-task-card',
  imports: [TuiButton],
  templateUrl: './task-card.html',
  styleUrl: './task-card.scss',
})
export class TaskCard {
  private readonly taskService = inject(TaskService);

  readonly task = input.required<Task>();

  get isDone(): boolean {
    return this.task().status === 'done';
  }

  get deadlineDate(): string {
    return new Date(this.task().deadline).toLocaleDateString('ru-RU');
  }

  get deadlineTime(): string {
    return new Date(this.task().deadline).toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  get priorityText(): string {
    const priorityMap: Record<Task['priority'], string> = {
      low: 'Низкий',
      medium: 'Средний',
      high: 'Высокий',
    };

    return priorityMap[this.task().priority];
  }

  get statusText(): string {
    const statusMap: Record<TaskStatus, string> = {
      todo: 'Создана',
      in_progress: 'В процессе',
      done: 'Выполнено',
    };

    return statusMap[this.task().status];
  }

  changeStatus(status: TaskStatus): void {
    this.taskService.updateTask({
      ...this.task(),
      status,
    });
  }
}
