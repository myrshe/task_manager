import { Component, computed, inject, signal } from '@angular/core';
import { TuiButton } from '@taiga-ui/core';
import { TaskList } from '../../shared/components/task-list/task-list';
import { SortDirection, TaskService, TaskSortField } from '../../services/task.service';

type CalendarView = 'week' | 'month';

@Component({
  selector: 'app-calendar',
  imports: [TuiButton, TaskList],
  templateUrl: './calendar.html',
  styleUrl: './calendar.scss',
})
export class Calendar {
  private readonly taskService = inject(TaskService);

  readonly view = signal<CalendarView>('week');
  readonly sortField = signal<TaskSortField>('deadline');
  readonly sortDirection = signal<SortDirection>('asc');

  readonly title = computed(() => {
    return this.view() === 'week' ? 'Расписание на неделю' : 'Расписание на месяц';
  });

  readonly tasks = computed(() => {
    const tasks =
      this.view() === 'week' ? this.taskService.getWeekTasks() : this.taskService.getMonthTasks();

    return this.taskService.sortTasks(tasks, this.sortField(), this.sortDirection());
  });

  setView(view: CalendarView): void {
    this.view.set(view);
  }

  setSortField(field: TaskSortField): void {
    this.sortField.set(field);
  }

  setSortDirection(direction: SortDirection): void {
    this.sortDirection.set(direction);
  }
}
