import tableRentImage from '@/shared/assets/Аренда стола.svg';
import adultGroupImage from '@/shared/assets/Взрослая групповая тренировка.svg';
import heroImage from '@/shared/assets/Главная страница.svg';
import childGroupImage from '@/shared/assets/Детская групповая тренировка.svg';
import personalTrainingImage from '@/shared/assets/Индивидуальная тренировка.svg';
import clubRulesImage from '@/shared/assets/Правила клуба.svg';
import tournamentsImage from '@/shared/assets/Проведение турниров.svg';
import robotTrainingImage from '@/shared/assets/Тренировка с роботом.svg';

export const illustrations = {
  hero: {
    src: heroImage,
    label: 'Главная страница',
    alt: 'Иллюстрация главной страницы клуба настольного тенниса',
  },
  personalTraining: {
    src: personalTrainingImage,
    label: 'Индивидуальная тренировка',
    alt: 'Иллюстрация индивидуальной тренировки',
  },
  adultGroupTraining: {
    src: adultGroupImage,
    label: 'Взрослая групповая тренировка',
    alt: 'Иллюстрация взрослой групповой тренировки',
  },
  childGroupTraining: {
    src: childGroupImage,
    label: 'Детская групповая тренировка',
    alt: 'Иллюстрация детской групповой тренировки',
  },
  tableRent: {
    src: tableRentImage,
    label: 'Аренда стола',
    alt: 'Иллюстрация аренды стола',
  },
  robotTraining: {
    src: robotTrainingImage,
    label: 'Тренировка с роботом',
    alt: 'Иллюстрация тренировки с роботом',
  },
  clubRules: {
    src: clubRulesImage,
    label: 'Правила клуба',
    alt: 'Иллюстрация правил клуба',
  },
  tournaments: {
    src: tournamentsImage,
    label: 'Проведение турниров',
    alt: 'Иллюстрация проведения турниров',
  },
};

export const aboutIllustrations = [illustrations.tournaments, illustrations.childGroupTraining];

export const schedulePromoIllustration = illustrations.childGroupTraining;

export const serviceIllustrationById = {
  personal: illustrations.personalTraining,
  group: illustrations.adultGroupTraining,
  table: illustrations.tableRent,
  robot: illustrations.robotTraining,
};
