import { useEffect, useMemo, useState } from 'react';
import {
  activityTypes,
  createScheduleItem,
  defaultScheduleItems,
  fetchScheduleFromApi,
  getActivityType,
  saveScheduleToApi,
  sortScheduleItems,
  weekDays,
} from '@/entities/schedule/model/schedule';
import { illustrations } from '@/shared/assets/illustrations';

const groupRegistrationUrl = 'https://t.me/RakeTTka';

const eventFormats = ['Настольный теннис', 'Мини теннис', 'Шахпонг', 'Пингпонг', 'Парный'];

const activityIllustrationByType = {
  adultGroup: illustrations.adultGroupTraining,
  childGroup: illustrations.childGroupTraining,
  tournament: illustrations.tournaments,
};

const dayNumberById = {
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
  sunday: 0,
};

const dayIdByDateDay = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

function getDayIdFromDate(date) {
  if (!date) {
    return 'monday';
  }

  const parsedDate = new Date(`${date}T00:00:00`);

  if (Number.isNaN(parsedDate.getTime())) {
    return 'monday';
  }

  return dayIdByDateDay[parsedDate.getDay()] || 'monday';
}

function getUpcomingDate(dayId) {
  const today = new Date();
  const targetDay = dayNumberById[dayId] ?? 1;
  const daysUntilTarget = (targetDay - today.getDay() + 7) % 7;
  const eventDate = new Date(today);

  eventDate.setHours(0, 0, 0, 0);
  eventDate.setDate(today.getDate() + daysUntilTarget);

  return eventDate;
}

function getDefaultEventDate() {
  return new Date().toISOString().slice(0, 10);
}

function getEventDate(item) {
  if (item.date) {
    const [year, month, day] = String(item.date).split('-').map(Number);

    if (year && month && day) {
      return new Date(year, month - 1, day);
    }
  }

  return getUpcomingDate(item.dayId);
}

function getEventDateLabel(item) {
  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    weekday: 'long',
  }).format(getEventDate(item));
}

function getAdminDateLabel(item) {
  return new Intl.DateTimeFormat('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(getEventDate(item));
}

function getEventDateTime(item) {
  const [hours = '0', minutes = '0'] = String(item.time).split(':');
  const date = getEventDate(item);

  date.setHours(Number(hours), Number(minutes), 0, 0);

  return date.getTime();
}

function formatPrice(price) {
  const trimmedPrice = price?.trim();

  if (!trimmedPrice) {
    return '';
  }

  return /^\d+$/.test(trimmedPrice) ? `${trimmedPrice} ₽` : trimmedPrice;
}

const initialFormState = {
  type: 'adultGroup',
  dayId: 'monday',
  date: getDefaultEventDate(),
  time: '19:00',
  duration: '60',
  level: 'Начальный',
  format: eventFormats[0],
  coach: '',
  price: '',
  registrationUrl: '',
};

function normalizeExternalUrl(url) {
  const trimmedUrl = url?.trim();

  if (!trimmedUrl) {
    return '';
  }

  return /^https?:\/\//i.test(trimmedUrl) ? trimmedUrl : `https://${trimmedUrl}`;
}

function TelegramIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="none">
      <path
        d="M21.2 4.36 18.1 19.02c-.23 1.04-.84 1.3-1.7.82l-4.71-3.47-2.27 2.19c-.25.25-.46.46-.95.46l.34-4.84 8.82-7.97c.38-.34-.08-.53-.59-.19L6.14 12.9l-4.69-1.47c-1.02-.32-1.04-1.02.21-1.51L20.02 2.8c.86-.32 1.62.19 1.18 1.56Z"
        fill="currentColor"
      />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="none">
      <path
        d="M6.62 10.79a15.46 15.46 0 0 0 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.32.57 3.57.57.56 0 1 .44 1 1V20c0 .56-.44 1-1 1C10.06 21 3 13.94 3 5c0-.56.44-1 1-1h3.5c.56 0 1 .44 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2Z"
        fill="currentColor"
      />
    </svg>
  );
}

function ActivityCard({ item }) {
  const activity = getActivityType(item.type);
  const illustration = activityIllustrationByType[item.type] || illustrations.adultGroupTraining;
  const isTournament = item.type === 'tournament';
  const isGroupTraining = item.type === 'adultGroup' || item.type === 'childGroup';
  const registrationUrl = isTournament ? normalizeExternalUrl(item.registrationUrl) : groupRegistrationUrl;
  const detailItems = [
    { label: 'Уровень', value: item.level },
    { label: 'Формат', value: item.format || (isTournament ? 'Клубный турнир по рейтингу' : '') },
    !isTournament ? { label: 'Длительность', value: `${item.duration} мин` } : null,
    !isTournament ? { label: 'Тренер', value: item.coach } : null,
    { label: 'Стоимость', value: formatPrice(item.price || (isTournament ? '600 ₽' : '')) },
  ].filter((detail) => detail?.value);

  return (
    <article className="group overflow-hidden rounded-lg border border-[#c7d6e9] bg-white transition hover:-translate-y-1 hover:shadow-[0_1.2rem_2.6rem_-1.3rem_rgba(20,50,85,0.55)]">
      <div className="grid lg:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="flex min-w-0 flex-col p-4 sm:p-6 lg:p-7">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-[#edf5ff] px-3 py-1 text-[0.68rem] font-extrabold uppercase tracking-[0.08em] text-[#1f5ba8] sm:text-xs sm:tracking-[0.12em]">
              {activity.badge}
            </span>
            <span className="rounded-full bg-red-50 px-3 py-1 text-[0.68rem] font-extrabold uppercase tracking-[0.06em] text-red-600 sm:text-xs sm:tracking-[0.08em]">
              Требуется предварительная регистрация
            </span>
          </div>

          <h3 className="mt-4 text-xl font-extrabold leading-tight tracking-normal text-brand-ink sm:text-2xl sm:tracking-[-0.02em]">
            {activity.title}
          </h3>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg bg-[#14345d] px-4 py-4 text-white">
              <p className="text-[0.68rem] font-extrabold uppercase tracking-[0.12em] text-blue-100 sm:text-xs sm:tracking-[0.16em]">Дата мероприятия</p>
              <p className="mt-2 text-lg font-black leading-tight sm:text-2xl">{getEventDateLabel(item)}</p>
            </div>

            <div className="rounded-lg bg-[#eef5ff] px-4 py-4 text-brand-ink">
              <p className="text-[0.68rem] font-extrabold uppercase tracking-[0.12em] text-[#1f5ba8] sm:text-xs sm:tracking-[0.16em]">Старт</p>
              <p className="mt-2 text-lg font-black leading-tight sm:text-2xl">{item.time}</p>
            </div>
          </div>

          <dl className="mt-4 grid flex-1 auto-rows-fr gap-3 sm:grid-cols-2">
            {detailItems.map((detail) => (
              <div className="flex min-h-[4.75rem] flex-col justify-center rounded-lg bg-[#f4f7fb] px-4 py-3 sm:min-h-24" key={detail.label}>
                <dt className="text-[0.68rem] font-extrabold uppercase tracking-[0.1em] text-[#1f5ba8] sm:text-xs sm:tracking-[0.12em]">{detail.label}</dt>
                <dd className="mt-1 text-base font-bold leading-snug text-brand-ink">{detail.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <aside className="flex min-h-0 flex-col justify-center p-4 pt-0 sm:p-5 lg:min-h-[22rem] lg:p-4">
          <div className="relative aspect-[16/10] overflow-hidden rounded-lg sm:aspect-[5/4]">
            <img
              alt={illustration.alt}
              className="absolute inset-0 h-full w-full object-cover object-top"
              decoding="async"
              loading="lazy"
              src={illustration.src}
            />
          </div>

          {isGroupTraining ? (
            <div className="mt-4 grid grid-cols-2 gap-3">
              <a
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#229ed9] px-3 py-2.5 text-xs font-extrabold text-white shadow-[0_0.9rem_1.5rem_-1rem_rgba(34,158,217,0.9)] transition hover:-translate-y-0.5 hover:bg-[#1d91ca] sm:px-4 sm:text-sm"
                href={registrationUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                Записаться
                <TelegramIcon />
              </a>
              <a
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#34c759] px-3 py-2.5 text-xs font-extrabold text-white shadow-[0_0.9rem_1.5rem_-1rem_rgba(52,199,89,0.9)] transition hover:-translate-y-0.5 hover:bg-[#30b753] sm:px-4 sm:text-sm"
                href="tel:+79060668806"
              >
                Позвонить
                <PhoneIcon />
              </a>
            </div>
          ) : registrationUrl ? (
            <a
              className="mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-full bg-[#34c759] px-5 py-2.5 text-sm font-extrabold text-white shadow-[0_0.9rem_1.5rem_-1rem_rgba(52,199,89,0.9)] transition hover:-translate-y-0.5 hover:bg-[#30b753]"
              href={registrationUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              Записаться
            </a>
          ) : (
            <button className="primary-button mt-4 w-full" disabled type="button">
              Ссылка скоро
            </button>
          )}
        </aside>
      </div>
    </article>
  );
}

function ScheduleAdmin({ isSaving, items, onAddItem, onDeleteItem, onReset, saveStatus }) {
  const [form, setForm] = useState(initialFormState);
  const [formError, setFormError] = useState('');
  const selectedType = activityTypes[form.type];
  const isTournament = form.type === 'tournament';

  function updateForm(field, value) {
    setFormError('');
    setForm((currentForm) => {
      if (field === 'date') {
        return {
          ...currentForm,
          date: value,
          dayId: getDayIdFromDate(value),
        };
      }

      if (field === 'type') {
        return {
          ...currentForm,
          type: value,
          duration: value === 'tournament' ? '' : currentForm.duration || '60',
          level: '',
          price: value === 'tournament' ? currentForm.price || '600 ₽' : currentForm.price,
          coach: value === 'tournament' ? '' : currentForm.coach,
          registrationUrl: value === 'tournament' ? currentForm.registrationUrl : '',
        };
      }

      return { ...currentForm, [field]: value };
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!form.date || !form.time || !form.level) {
      setFormError('Заполните дату, время и уровень.');
      return;
    }

    if (!isTournament && (!form.duration || !form.coach.trim() || !form.price.trim())) {
      setFormError('Для групповой тренировки укажите длительность, тренера и цену.');
      return;
    }

    if (isTournament && !form.registrationUrl.trim()) {
      setFormError('Для турнира укажите ссылку для регистрации.');
      return;
    }

    try {
      await onAddItem(createScheduleItem(form));
      setForm((currentForm) => ({
        ...initialFormState,
        type: currentForm.type,
        dayId: getDayIdFromDate(currentForm.date),
        date: currentForm.date,
        level: '',
      }));
    } catch (error) {
      setFormError(error.message || 'Не удалось добавить активность.');
    }
  }

  return (
    <div className="surface-card p-4 sm:p-5">
      <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="section-kicker">Админка расписания</p>
          <h3 className="text-xl font-extrabold text-brand-ink">Активности текущей недели</h3>
          <p className="mt-1 text-sm text-slate-500">{saveStatus}</p>
        </div>
        <button
          className="secondary-button w-full sm:w-auto sm:self-start"
          disabled={isSaving}
          onClick={onReset}
          type="button"
        >
          Вернуть пример
        </button>
      </div>

      <form className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" onSubmit={handleSubmit}>
        <label className="space-y-1 text-sm font-bold text-brand-ink">
          Тип активности
          <select
            className="form-control"
            disabled={isSaving}
            onChange={(event) => updateForm('type', event.target.value)}
            value={form.type}
          >
            {Object.values(activityTypes).map((type) => (
              <option key={type.id} value={type.id}>
                {type.label}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-1 text-sm font-bold text-brand-ink">
          Дата
          <input
            className="form-control"
            disabled={isSaving}
            onChange={(event) => updateForm('date', event.target.value)}
            type="date"
            value={form.date}
          />
        </label>

        <label className="space-y-1 text-sm font-bold text-brand-ink">
          Время
          <input
            className="form-control"
            disabled={isSaving}
            onChange={(event) => updateForm('time', event.target.value)}
            type="time"
            value={form.time}
          />
        </label>

        {!isTournament && (
          <label className="space-y-1 text-sm font-bold text-brand-ink">
            Длительность
            <input
              className="form-control"
              disabled={isSaving}
              min="30"
              onChange={(event) => updateForm('duration', event.target.value)}
              step="15"
              type="number"
              value={form.duration}
            />
          </label>
        )}

        <label className="space-y-1 text-sm font-bold text-brand-ink">
          Уровень
          <input
            className="form-control"
            disabled={isSaving}
            onChange={(event) => updateForm('level', event.target.value)}
            placeholder={isTournament ? 'Например: MAX 150' : 'Например: Средний'}
            type="text"
            value={form.level}
          />
        </label>

        <label className="space-y-1 text-sm font-bold text-brand-ink">
          Формат
          <select
            className="form-control"
            disabled={isSaving}
            onChange={(event) => updateForm('format', event.target.value)}
            value={form.format}
          >
            {eventFormats.map((format) => (
              <option key={format} value={format}>
                {format}
              </option>
            ))}
          </select>
        </label>

        {!isTournament && (
          <>
            <label className="space-y-1 text-sm font-bold text-brand-ink sm:col-span-2">
              Тренер
              <input
                className="form-control"
                disabled={isSaving}
                onChange={(event) => updateForm('coach', event.target.value)}
                placeholder="Например: Иван Иванов"
                type="text"
                value={form.coach}
              />
            </label>
          </>
        )}

        <label className="space-y-1 text-sm font-bold text-brand-ink">
          Стоимость
          <input
            className="form-control"
            disabled={isSaving}
            onChange={(event) => updateForm('price', event.target.value)}
            placeholder={isTournament ? '600 ₽' : '1500 ₽'}
            type="text"
            value={form.price}
          />
        </label>

        {isTournament && (
          <label className="space-y-1 text-sm font-bold text-brand-ink sm:col-span-2">
            Ссылка для регистрации
            <input
              className="form-control"
              disabled={isSaving}
              onChange={(event) => updateForm('registrationUrl', event.target.value)}
              placeholder="https://..."
              type="text"
              value={form.registrationUrl}
            />
          </label>
        )}

        <div className="flex items-end sm:col-span-2 lg:col-span-3">
          <button
            className="primary-button w-full"
            disabled={isSaving}
            type="submit"
          >
            {isSaving ? 'Сохраняем...' : `Добавить ${selectedType.label.toLowerCase()}`}
          </button>
        </div>
      </form>

      {formError && <p className="mt-3 text-sm font-bold text-red-600">{formError}</p>}

      <div className="mt-6 grid gap-3 lg:grid-cols-2">
        {items.length === 0 ? (
          <p className="rounded-lg bg-[#f4f7fb] px-4 py-5 text-sm text-slate-600 lg:col-span-2">
            Расписание пока пустое. Добавьте первую активность через форму выше.
          </p>
        ) : (
          items.map((item) => {
            const activity = getActivityType(item.type);

            return (
              <div
                className="flex flex-col items-start justify-between gap-3 rounded-lg bg-[#f4f7fb] px-4 py-3 sm:flex-row sm:items-center"
                key={item.id}
              >
                <div className="min-w-0">
                  <p className="font-extrabold text-brand-ink">
                    {getAdminDateLabel(item)} · {item.time} · {activity.label}
                  </p>
                  <p className="break-words text-sm text-slate-600">
                    {item.type === 'tournament'
                      ? `${item.level}${item.format ? `, ${item.format}` : ''}${item.registrationUrl ? `, ${item.registrationUrl}` : ''}`
                      : `${item.level}${item.format ? `, ${item.format}` : ''}, ${item.duration} мин, ${item.coach}, ${item.price}`}
                  </p>
                </div>
                <button
                  className="inline-flex min-h-9 w-full items-center justify-center rounded-full border border-red-200 px-4 py-2 text-sm font-bold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                  disabled={isSaving}
                  onClick={() => onDeleteItem(item.id)}
                  type="button"
                >
                  Удалить
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export function ScheduleSection() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [adminToken, setAdminToken] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState('Загрузка расписания...');
  const [scheduleItems, setScheduleItems] = useState([]);

  const upcomingItems = useMemo(
    () => {
      const now = Date.now();

      return [...scheduleItems]
        .filter((item) => getEventDateTime(item) > now)
        .sort((first, second) => getEventDateTime(first) - getEventDateTime(second));
    },
    [scheduleItems],
  );

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const searchParams = new URLSearchParams(window.location.search);
    const hasAdminAccess = searchParams.get('admin') === '1' || window.location.hash === '#admin';

    setIsAdminMode(hasAdminAccess);
    setIsAdminOpen(hasAdminAccess);
    setAdminToken(searchParams.get('token') || '');
  }, []);

  useEffect(() => {
    let isMounted = true;

    fetchScheduleFromApi()
      .then((items) => {
        if (!isMounted) {
          return;
        }

        const sortedItems = sortScheduleItems(items);
        setScheduleItems(sortedItems);
        setSaveStatus('Расписание загружено с сервера.');
      })
      .catch(() => {
        if (isMounted) {
          setScheduleItems([]);
          setSaveStatus('Сервер расписания недоступен.');
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  async function persistSchedule(nextItems) {
    const sortedItems = sortScheduleItems(nextItems);
    setIsSaving(true);
    setSaveStatus('Сохраняем расписание...');

    try {
      const serverItems = await saveScheduleToApi(sortedItems, adminToken);
      const sortedServerItems = sortScheduleItems(serverItems);
      setScheduleItems(sortedServerItems);
      setSaveStatus('Расписание сохранено на сервере.');
    } catch (error) {
      setSaveStatus(error.message || 'Не удалось сохранить расписание.');
      throw error;
    } finally {
      setIsSaving(false);
    }
  }

  function addItem(item) {
    return persistSchedule([...scheduleItems, item]);
  }

  function deleteItem(itemId) {
    return persistSchedule(scheduleItems.filter((item) => item.id !== itemId));
  }

  function resetSchedule() {
    persistSchedule(defaultScheduleItems).catch(() => {});
  }

  return (
    <section className="section-block" id="schedule">
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="section-title">Мероприятия клуба</h2>
        </div>

        {isAdminMode && (
          <button
            className="secondary-button"
            onClick={() => setIsAdminOpen((currentState) => !currentState)}
            type="button"
          >
            {isAdminOpen ? 'Скрыть админку' : 'Редактировать расписание'}
          </button>
        )}
      </div>

      <div className="space-y-4">
        {upcomingItems.length === 0 ? (
          <div className="surface-card border-dashed px-5 py-8 text-center">
            <p className="text-lg font-extrabold text-brand-ink">Мероприятия пока не добавлены</p>
            <p className="mt-2 text-sm text-slate-600">Проверьте расписание позже.</p>
          </div>
        ) : (
          upcomingItems.map((item) => <ActivityCard item={item} key={item.id} />)
        )}
      </div>

      {isAdminMode && (
        <div
          className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out ${
            isAdminOpen ? 'mt-6 grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
          }`}
        >
          <div className="overflow-hidden">
            <ScheduleAdmin
              isSaving={isSaving}
              items={scheduleItems}
              onAddItem={addItem}
              onDeleteItem={deleteItem}
              onReset={resetSchedule}
              saveStatus={saveStatus}
            />
          </div>
        </div>
      )}
    </section>
  );
}
