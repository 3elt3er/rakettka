import { serviceIllustrationById } from '@/shared/assets/illustrations';

export const services = [
  {
    id: 'personal',
    title: 'Индивидуальные тренировки',
    onceLabel: '1 тренировка',
    oncePrice: '3000 ₽',
    packLabel: 'Абонемент (5 тренировок)',
    packPrice: '12500 ₽',
    image: serviceIllustrationById.personal,
    imageClassName: 'scale-[1.12]',
  },
  {
    id: 'group',
    title: 'Групповые занятия',
    onceLabel: '1 занятие (1 час)',
    oncePrice: '1500 ₽',
    packLabel: 'Абонемент (8 занятий)',
    packPrice: '9500 ₽',
    image: serviceIllustrationById.group,
    imageClassName: 'scale-[1.1]',
  },
  {
    id: 'table',
    title: 'Аренда стола',
    onceLabel: '1 час аренды',
    oncePrice: '1000 ₽',
    packLabel: 'Абонемент (8 часов аренды)',
    packPrice: '6000 ₽',
    image: serviceIllustrationById.table,
    imageClassName: 'scale-[1.08]',
  },
  {
    id: 'robot',
    title: 'Аренда робота БКМ',
    onceLabel: '1 час аренды',
    oncePrice: '600 ₽',
    packLabel: 'Абонемент (8 часов аренды)',
    packPrice: '6000 ₽',
    image: serviceIllustrationById.robot,
    imageClassName: 'scale-[1.06]',
  },
];
