import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  debug: true,
  fallbackLng: 'en',

  interpolation: {
    escapeValue: false, // react scape by default
  },
  resources: {
    en: {
      translation: {
        resume: "{{name}}'s Resumé",
        experience: 'Experience',
        profile: 'Profile',
        education: 'Education',
        courses_traning: 'Courses & Trainings',
        skills: 'Skills',
        all: 'All',
        footer: {
          built: 'built with',
        },
      },
    },

    pt: {
      translation: {
        resume: 'Currículo de {{name}}',
        experience: 'Experiência',
        profile: 'Perfil',
        education: 'Educação',
        courses_traning: 'Cursos & Treinamentos',
        skills: 'Habilidades',
        all: 'Todos',
        footer: {
          built: 'construído com',
        },
      },
    },
  },
});
