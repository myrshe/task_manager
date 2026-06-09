import { Task } from '../models/task.model';

export const MOCK_TASKS: Task[] = [
  {
    id: '1',
    title: 'подготовить план проекта',
    description: 'разобрать требования',
    deadline: '2026-06-15T14:00',
    priority: 'high',
    status: 'todo',
  },
  {
    id: '2',
    title: 'сделать страницу добавления задачи',
    description: 'создать форму через реактивные формы',
    deadline: '2026-06-12T16:00',
    priority: 'medium',
    status: 'in_progress',
  },
  {
    id: '3',
    title: 'написать тесты для формы',
    description: 'проверить обязательное поля',
    deadline: '2026-06-11T11:00',
    priority: 'low',
    status: 'todo',
  },
];
