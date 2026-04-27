export const SCHEDULE_STORAGE_KEY = 'rakettka.weeklySchedule.v1';
export const SCHEDULE_API_URL = '/api/schedule';

export const weekDays = [
  { id: 'monday', short: 'ПН', label: 'Понедельник' },
  { id: 'tuesday', short: 'ВТ', label: 'Вторник' },
  { id: 'wednesday', short: 'СР', label: 'Среда' },
  { id: 'thursday', short: 'ЧТ', label: 'Четверг' },
  { id: 'friday', short: 'ПТ', label: 'Пятница' },
  { id: 'saturday', short: 'СБ', label: 'Суббота' },
  { id: 'sunday', short: 'ВС', label: 'Воскресенье' },
];

export const activityTypes = {
  adultGroup: {
    id: 'adultGroup',
    label: 'Взрослая группа',
    title: 'Групповая тренировка для взрослых',
    badge: 'Взрослые',
  },
  childGroup: {
    id: 'childGroup',
    label: 'Детская группа',
    title: 'Детская групповая тренировка',
    badge: 'Дети',
  },
  tournament: {
    id: 'tournament',
    label: 'Турнир',
    title: 'Турнир клуба',
    badge: 'Турнир',
  },
};

export const trainingLevels = ['Начальный', 'Средний', 'Продвинутый', 'Любой уровень'];
export const tournamentLevels = ['MAX 99', 'MAX 150', 'MAX 300', 'Open'];

export const defaultScheduleItems = [
  {
    id: 'default-adult-monday',
    type: 'adultGroup',
    dayId: 'monday',
    time: '19:00',
    duration: 90,
    level: 'Средний',
    coach: 'Тренер клуба',
    price: '1500 ₽',
  },
  {
    id: 'default-child-tuesday',
    type: 'childGroup',
    dayId: 'tuesday',
    time: '17:00',
    duration: 60,
    level: 'Начальный',
    coach: 'Тренер клуба',
    price: '1000 ₽',
  },
  {
    id: 'default-tournament-thursday',
    type: 'tournament',
    dayId: 'thursday',
    time: '20:00',
    level: 'MAX 150',
  },
  {
    id: 'default-adult-saturday',
    type: 'adultGroup',
    dayId: 'saturday',
    time: '12:00',
    duration: 90,
    level: 'Любой уровень',
    coach: 'Тренер клуба',
    price: '1500 ₽',
  },
];

export function createScheduleItem(values) {
  return {
    id: `activity-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    type: values.type,
    dayId: values.dayId,
    time: values.time,
    duration: Number(values.duration) || 60,
    level: values.level,
    coach: values.coach?.trim() || '',
    price: values.price?.trim() || '',
  };
}

export function getActivityType(type) {
  return activityTypes[type] || activityTypes.adultGroup;
}

export function getScheduleFromStorage() {
  if (typeof window === 'undefined') {
    return defaultScheduleItems;
  }

  try {
    const savedSchedule = window.localStorage.getItem(SCHEDULE_STORAGE_KEY);
    if (!savedSchedule) {
      return defaultScheduleItems;
    }

    const parsedSchedule = JSON.parse(savedSchedule);
    return Array.isArray(parsedSchedule) ? parsedSchedule : defaultScheduleItems;
  } catch {
    return defaultScheduleItems;
  }
}

export function saveScheduleToStorage(items) {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(SCHEDULE_STORAGE_KEY, JSON.stringify(items));
}

export function sortScheduleItems(items) {
  const dayOrder = new Map(weekDays.map((day, index) => [day.id, index]));

  return [...items].sort((first, second) => {
    const dayDiff = (dayOrder.get(first.dayId) ?? 0) - (dayOrder.get(second.dayId) ?? 0);
    if (dayDiff !== 0) {
      return dayDiff;
    }

    return String(first.time).localeCompare(String(second.time));
  });
}

export async function fetchScheduleFromApi() {
  const response = await fetch(SCHEDULE_API_URL);
  if (!response.ok) {
    throw new Error('Schedule API request failed');
  }

  const data = await response.json();
  return Array.isArray(data.items) ? data.items : defaultScheduleItems;
}

export async function saveScheduleToApi(items, adminToken = '') {
  const response = await fetch(SCHEDULE_API_URL, {
    body: JSON.stringify({ items }),
    headers: {
      'Content-Type': 'application/json',
      ...(adminToken ? { 'X-Admin-Token': adminToken } : {}),
    },
    method: 'PUT',
  });

  if (!response.ok) {
    throw new Error(response.status === 401 ? 'Неверный админ-токен' : 'Не удалось сохранить расписание');
  }

  const data = await response.json();
  return Array.isArray(data.items) ? data.items : items;
}
