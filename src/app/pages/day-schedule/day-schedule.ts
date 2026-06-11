import { Component, computed, inject } from '@angular/core';
import { TaskList } from '../../shared/components/task-list/task-list';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-day-schedule',
  imports: [TaskList],
  templateUrl: './day-schedule.html',
  styleUrl: './day-schedule.scss',
})
export class DaySchedule {
  private readonly taskService = inject(TaskService);

  readonly todayTasks = computed(() => {
    return this.taskService.sortByDeadline(this.taskService.getTodayTasks(), 'asc');
  });

  readonly weekTopTasks = computed(() => {
    return this.taskService
      .sortByPriority(
        this.taskService.getWeekTasks().filter((task) => task.status !== 'done'),
        'desc',
      )
      .slice(0, 5);
  });

  readonly monthTopTasks = computed(() => {
    return this.taskService
      .sortByPriority(
        this.taskService.getMonthTasks().filter((task) => task.status !== 'done'),
        'desc',
      )
      .slice(0, 5);
  });
}
