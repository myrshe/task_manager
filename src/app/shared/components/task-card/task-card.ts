import { Component, input } from '@angular/core';
import { Task } from '../../../models/task.model';

@Component({
  selector: 'app-task-card',
  imports: [],
  templateUrl: './task-card.html',
  styleUrl: './task-card.scss',
})
export class TaskCard {
  readonly task = input.required<Task>();

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
    const statusMap: Record<Task['status'], string> = {
      todo: 'К выполнению',
      in_progress: 'В процессе',
      done: 'Выполнено',
    };

    return statusMap[this.task().status];
  }
}
