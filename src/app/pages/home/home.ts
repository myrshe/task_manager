import { Component, computed, inject, signal } from '@angular/core';
import { SortDirection, TaskService, TaskSortField } from '../../services/task.service';
import { TaskList } from '../../shared/components/task-list/task-list';

@Component({
  selector: 'app-home',
  imports: [TaskList],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private readonly taskService = inject(TaskService);

  readonly sortField = signal<TaskSortField>('deadline');
  readonly sortDirection = signal<SortDirection>('asc');

  readonly tasksToStart = computed(() => this.taskService.getTasksToStart());
}
