import { useEffect, useMemo, useState } from 'react';
import {
  activityTypes,
  createScheduleItem,
  defaultScheduleItems,
  fetchScheduleFromApi,
  getActivityType,
  getScheduleFromStorage,
  saveScheduleToApi,
  saveScheduleToStorage,
  sortScheduleItems,
  tournamentLevels,
  trainingLevels,
  weekDays,
} from '@/entities/schedule/model/schedule';

const initialFormState = {
  type: 'adultGroup',
  dayId: 'monday',
  time: '19:00',
  duration: '60',
  level: 'Начальный',
  coach: '',
  price: '',
};

function ActivityCard({ item }) {
  const activity = getActivityType(item.type);
  const isTournament = item.type === 'tournament';

  return (
    <article className="grid gap-5 rounded-[1.6rem] border border-[#c7d6e9] bg-white p-5 transition hover:-translate-y-1 hover:shadow-[0_1.2rem_2.5rem_-1.3rem_rgba(20,50,85,0.65)] md:grid-cols-[7.5rem_minmax(0,1fr)_auto] md:items-center">
      <div className="rounded-[1.25rem] bg-[#14345d] px-4 py-4 text-white">
        <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-blue-100">Старт</p>
        <p className="mt-1 text-3xl font-black leading-none">{item.time}</p>
      </div>

      <div className="min-w-0">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-[#edf5ff] px-3 py-1 text-xs font-extrabold uppercase tracking-[0.12em] text-[#1f5ba8]">
            {activity.badge}
          </span>
          <span className="rounded-full bg-[#f4f7fb] px-3 py-1 text-xs font-bold text-brand-ink">{item.level}</span>
        </div>

        <h3 className="text-xl font-extrabold leading-tight text-brand-ink sm:text-2xl">{activity.title}</h3>

        <dl className="mt-4 grid gap-3 text-sm text-slate-600 sm:grid-cols-3">
          {!isTournament && (
            <div>
              <dt className="font-bold text-brand-ink">Длительность</dt>
              <dd>{item.duration} мин</dd>
            </div>
          )}
          {!isTournament && (
            <div>
              <dt className="font-bold text-brand-ink">Тренер</dt>
              <dd>{item.coach}</dd>
            </div>
          )}
          {!isTournament && (
            <div>
              <dt className="font-bold text-brand-ink">Стоимость</dt>
              <dd>{item.price}</dd>
            </div>
          )}
          {isTournament && (
            <div>
              <dt className="font-bold text-brand-ink">Формат</dt>
              <dd>Клубный турнир по рейтингу</dd>
            </div>
          )}
        </dl>
      </div>

      <a
        className="inline-flex items-center justify-center rounded-full bg-[#1f5ba8] px-5 py-2.5 text-sm font-extrabold text-white transition hover:bg-[#14345d] md:self-center"
        href="https://rakettka.rubitime.ru/"
        rel="noopener noreferrer"
        target="_blank"
      >
        Записаться
      </a>
    </article>
  );
}

function ScheduleAdmin({ activeDayId, isSaving, items, onAddItem, onDeleteItem, onReset, saveStatus }) {
  const [form, setForm] = useState({ ...initialFormState, dayId: activeDayId });
  const [formError, setFormError] = useState('');
  const selectedType = activityTypes[form.type];
  const isTournament = form.type === 'tournament';

  useEffect(() => {
    setForm((currentForm) => ({ ...currentForm, dayId: activeDayId }));
  }, [activeDayId]);

  function updateForm(field, value) {
    setFormError('');
    setForm((currentForm) => {
      if (field === 'type') {
        return {
          ...currentForm,
          type: value,
          duration: value === 'tournament' ? '' : currentForm.duration || '60',
          level: value === 'tournament' ? tournamentLevels[0] : trainingLevels[0],
          price: value === 'tournament' ? '' : currentForm.price,
          coach: value === 'tournament' ? '' : currentForm.coach,
        };
      }

      return { ...currentForm, [field]: value };
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!form.dayId || !form.time || !form.level) {
      setFormError('Заполните день, время и уровень.');
      return;
    }

    if (!isTournament && (!form.duration || !form.coach.trim() || !form.price.trim())) {
      setFormError('Для групповой тренировки укажите длительность, тренера и цену.');
      return;
    }

    try {
      await onAddItem(createScheduleItem(form));
      setForm((currentForm) => ({
        ...initialFormState,
        type: currentForm.type,
        dayId: currentForm.dayId,
        level: currentForm.type === 'tournament' ? tournamentLevels[0] : trainingLevels[0],
      }));
    } catch (error) {
      setFormError(error.message || 'Не удалось добавить активность.');
    }
  }

  return (
    <div className="rounded-[1.8rem] border border-[#c7d6e9] bg-white p-4 sm:p-5">
      <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-extrabold uppercase tracking-[0.14em] text-[#1f5ba8]">Админка расписания</p>
          <h3 className="text-2xl font-extrabold text-brand-ink">Активности текущей недели</h3>
          <p className="mt-1 text-sm text-slate-500">{saveStatus}</p>
        </div>
        <button
          className="self-start rounded-full border border-[#c7d6e9] px-4 py-2 text-sm font-bold text-brand-ink transition hover:bg-[#eef5ff] disabled:cursor-not-allowed disabled:opacity-60"
          disabled={isSaving}
          onClick={onReset}
          type="button"
        >
          Вернуть пример
        </button>
      </div>

      <form className="grid gap-3 lg:grid-cols-6" onSubmit={handleSubmit}>
        <label className="space-y-1 text-sm font-bold text-brand-ink lg:col-span-2">
          Тип активности
          <select
            className="w-full rounded-2xl border border-[#c7d6e9] bg-[#f7fbff] px-4 py-3 text-base outline-none transition focus:border-[#1f5ba8]"
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
          День
          <select
            className="w-full rounded-2xl border border-[#c7d6e9] bg-[#f7fbff] px-4 py-3 text-base outline-none transition focus:border-[#1f5ba8]"
            disabled={isSaving}
            onChange={(event) => updateForm('dayId', event.target.value)}
            value={form.dayId}
          >
            {weekDays.map((day) => (
              <option key={day.id} value={day.id}>
                {day.label}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-1 text-sm font-bold text-brand-ink">
          Время
          <input
            className="w-full rounded-2xl border border-[#c7d6e9] bg-[#f7fbff] px-4 py-3 text-base outline-none transition focus:border-[#1f5ba8]"
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
              className="w-full rounded-2xl border border-[#c7d6e9] bg-[#f7fbff] px-4 py-3 text-base outline-none transition focus:border-[#1f5ba8]"
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
          {isTournament ? 'Уровень в поинтах' : 'Уровень'}
          <select
            className="w-full rounded-2xl border border-[#c7d6e9] bg-[#f7fbff] px-4 py-3 text-base outline-none transition focus:border-[#1f5ba8]"
            disabled={isSaving}
            onChange={(event) => updateForm('level', event.target.value)}
            value={form.level}
          >
            {(isTournament ? tournamentLevels : trainingLevels).map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </label>

        {!isTournament && (
          <>
            <label className="space-y-1 text-sm font-bold text-brand-ink lg:col-span-2">
              Тренер
              <input
                className="w-full rounded-2xl border border-[#c7d6e9] bg-[#f7fbff] px-4 py-3 text-base outline-none transition focus:border-[#1f5ba8]"
                disabled={isSaving}
                onChange={(event) => updateForm('coach', event.target.value)}
                placeholder="Например: Иван Иванов"
                type="text"
                value={form.coach}
              />
            </label>
            <label className="space-y-1 text-sm font-bold text-brand-ink">
              Цена
              <input
                className="w-full rounded-2xl border border-[#c7d6e9] bg-[#f7fbff] px-4 py-3 text-base outline-none transition focus:border-[#1f5ba8]"
                disabled={isSaving}
                onChange={(event) => updateForm('price', event.target.value)}
                placeholder="1500 ₽"
                type="text"
                value={form.price}
              />
            </label>
          </>
        )}

        <div className="flex items-end lg:col-span-2">
          <button
            className="w-full rounded-2xl bg-[#14345d] px-5 py-3 text-base font-extrabold text-white transition hover:bg-[#1f5ba8] disabled:cursor-not-allowed disabled:opacity-60"
            disabled={isSaving}
            type="submit"
          >
            {isSaving ? 'Сохраняем...' : `Добавить ${selectedType.label.toLowerCase()}`}
          </button>
        </div>
      </form>

      {formError && <p className="mt-3 text-sm font-bold text-red-600">{formError}</p>}

      <div className="mt-6 grid gap-3 md:grid-cols-2">
        {items.length === 0 ? (
          <p className="rounded-2xl bg-[#f4f7fb] px-4 py-5 text-sm text-slate-600 md:col-span-2">
            Расписание пока пустое. Добавьте первую активность через форму выше.
          </p>
        ) : (
          items.map((item) => {
            const day = weekDays.find((weekDay) => weekDay.id === item.dayId);
            const activity = getActivityType(item.type);

            return (
              <div
                className="flex items-center justify-between gap-3 rounded-2xl bg-[#f4f7fb] px-4 py-3"
                key={item.id}
              >
                <div>
                  <p className="font-extrabold text-brand-ink">
                    {day?.short} · {item.time} · {activity.label}
                  </p>
                  <p className="text-sm text-slate-600">
                    {item.type === 'tournament'
                      ? item.level
                      : `${item.level}, ${item.duration} мин, ${item.coach}, ${item.price}`}
                  </p>
                </div>
                <button
                  className="rounded-full border border-red-200 px-3 py-1.5 text-sm font-bold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
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
  const [activeDayId, setActiveDayId] = useState(weekDays[0].id);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [adminToken, setAdminToken] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState('Загрузка расписания...');
  const [scheduleItems, setScheduleItems] = useState(() => sortScheduleItems(getScheduleFromStorage()));

  const activeDay = weekDays.find((day) => day.id === activeDayId) || weekDays[0];
  const activeDayItems = useMemo(
    () => scheduleItems.filter((item) => item.dayId === activeDayId),
    [activeDayId, scheduleItems],
  );
  const nextEvent = activeDayItems[0];

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
        saveScheduleToStorage(sortedItems);
        setSaveStatus('Расписание загружено с сервера.');
      })
      .catch(() => {
        if (isMounted) {
          setSaveStatus('Сервер расписания недоступен, используется локальная копия.');
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
      saveScheduleToStorage(sortedServerItems);
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
    <section className="pt-6" id="schedule">
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-[#1f5ba8]">Текущая неделя</p>
          <h2 className="text-3xl font-extrabold leading-none text-brand-ink sm:text-5xl">Расписание клуба</h2>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-600">
            Групповые тренировки, детские занятия и турниры по дням недели. Выберите день, чтобы увидеть время,
            уровень, тренера и стоимость занятия.
          </p>
        </div>

        {isAdminMode && (
          <button
            className="inline-flex items-center justify-center rounded-full border border-[#b8cbe4] bg-white px-5 py-3 text-sm font-extrabold text-brand-ink transition hover:-translate-y-0.5 hover:bg-[#eef5ff]"
            onClick={() => setIsAdminOpen((currentState) => !currentState)}
            type="button"
          >
            {isAdminOpen ? 'Скрыть админку' : 'Редактировать расписание'}
          </button>
        )}
      </div>

      <div className="mb-5 flex gap-2 overflow-x-auto pb-2 no-scrollbar" role="tablist" aria-label="Дни недели">
        {weekDays.map((day) => {
          const dayItems = scheduleItems.filter((item) => item.dayId === day.id);
          const isActive = day.id === activeDayId;

          return (
            <button
              aria-selected={isActive}
              className={`min-w-[5rem] rounded-2xl px-4 py-3 text-left transition ${
                isActive
                  ? 'bg-[#14345d] text-white'
                  : 'bg-white text-brand-ink hover:bg-[#eef5ff]'
              }`}
              key={day.id}
              onClick={() => setActiveDayId(day.id)}
              role="tab"
              type="button"
            >
              <span className="block text-lg font-black">{day.short}</span>
              <span className={`block text-xs font-bold ${isActive ? 'text-blue-100' : 'text-slate-500'}`}>
                {dayItems.length ? `${dayItems.length} активн.` : 'свободно'}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mb-4 grid gap-3 rounded-[1.5rem] border border-[#c7d6e9] bg-white px-5 py-4 md:grid-cols-3">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#1f5ba8]">Выбранный день</p>
          <p className="mt-1 text-xl font-extrabold text-brand-ink">{activeDay.label}</p>
        </div>
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#1f5ba8]">Активности</p>
          <p className="mt-1 text-xl font-extrabold text-brand-ink">{activeDayItems.length || 'Нет'}</p>
        </div>
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#1f5ba8]">Ближайший старт</p>
          <p className="mt-1 text-xl font-extrabold text-brand-ink">{nextEvent ? nextEvent.time : 'Свободно'}</p>
        </div>
      </div>

      <div className="space-y-4">
        {activeDayItems.length === 0 ? (
          <div className="rounded-[1.5rem] border border-dashed border-[#b8cbe4] bg-white px-5 py-8 text-center">
            <p className="text-lg font-extrabold text-brand-ink">На этот день активностей нет</p>
            <p className="mt-2 text-sm text-slate-600">Выберите другой день или проверьте расписание позже.</p>
          </div>
        ) : (
          activeDayItems.map((item) => <ActivityCard item={item} key={item.id} />)
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
              activeDayId={activeDayId}
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
