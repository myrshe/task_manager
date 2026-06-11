import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { DaySchedule } from './pages/day-schedule/day-schedule';
import { Calendar } from './pages/calendar/calendar';
import { TaskCreate } from './pages/task-create/task-create';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    title: 'Главная',
  },
  {
    path: 'day',
    component: DaySchedule,
    title: 'Расписание на день',
  },
  {
    path: 'calendar',
    component: Calendar,
    title: 'Календарь',
  },
  {
    path: 'tasks/new',
    component: TaskCreate,
    title: 'Добавить задачу',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
