import ResumeModel, { ResumeDocument } from 'services/models/resume';
import SkillModel from 'services/models/skill';
import EducationModel from 'services/models/education';
import JobModel from 'services/models/job';
import { connect, disconnect } from 'services/database';
import { DateTime } from 'luxon';

async function seed(): Promise<ResumeDocument> {
  const {
    result: { upserted: educations },
  } = await EducationModel.bulkWrite([
    {
      updateOne: {
        filter: {
          title: 'Computer Science',
          'institution.name': 'Universidade Federal Fluminense',
        },

        upsert: true,

        update: {
          title: 'Computer Science',
          started: DateTime.fromObject({
            year: 202,
            month: 11,
          }).toJSDate(),

          institution: {
            name: 'Universidade Federal Fluminense',
          },
        },
      },
    },
  ]);

  const {
    result: { upserted: courses },
  } = await EducationModel.bulkWrite([
    {
      updateOne: {
        filter: {
          title: 'Data Modeling',
          'institution.name': 'MongoDB University',
        },

        upsert: true,

        update: {
          title: 'Data Modeling',
          started: DateTime.fromObject({
            year: 2020,
          }).toJSDate(),
          ended: DateTime.fromObject({
            year: 2020,
          }).toJSDate(),

          institution: {
            name: 'MongoDB University',
          },
        },
      },
    },
    {
      updateOne: {
        filter: {
          title: 'MongoDB for Javascript Developers',
          'institution.name': 'MongoDB University',
        },

        upsert: true,

        update: {
          title: 'MongoDB for Javascript Developers',
          started: DateTime.fromObject({
            year: 2021,
          }).toJSDate(),
          ended: DateTime.fromObject({
            year: 2021,
          }).toJSDate(),

          institution: {
            name: 'MongoDB University',
          },
        },
      },
    },
    {
      updateOne: {
        filter: {
          title: 'The MongoDB Aggregation Framework',
          'institution.name': 'MongoDB University',
        },

        upsert: true,

        update: {
          title: 'The MongoDB Aggregation Framework',
          started: DateTime.fromObject({
            year: 2021,
          }).toJSDate(),
          ended: DateTime.fromObject({
            year: 2021,
          }).toJSDate(),

          institution: {
            name: 'MongoDB University',
          },
        },
      },
    },
  ]);

  const {
    result: { upserted: skills },
  } = await SkillModel.bulkWrite([
    {
      updateOne: {
        filter: { name: 'Javascript' },
        upsert: true,
        update: {
          name: 'Javascript',
          tags: [{ name: 'principal' }],
        },
      },
    },
  ]);

  const {
    result: { upserted: jobs },
  } = await JobModel.bulkWrite([
    {
      updateOne: {
        upsert: true,
        filter: {
          'company.name': 'Superintendência de Tecnologia da Informação',
        },
        update: {
          position: 'Software Developer',
          company: {
            name: 'Superintendência de Tecnologia da Informação',
            alias: 'STI UFF',
          },
          activity: {
            start: DateTime.fromObject({
              year: 2018,
              month: 4,
            }).toJSDate(),

            end: DateTime.fromObject({
              year: 2020,
              month: 3,
            }).toJSDate(),
          },

          description:
            'Worked mainly on back-end development with Ruby on Rails. Acted directly on the maintenance of the University’s wide range of systems involved in whole stack. Using Redmine as a direct communication point to the users to fix bugs and develop new features.',
        },
      },
    },
    {
      updateOne: {
        upsert: true,
        filter: { 'company.name': 'Rede Nacional de Ensino e Pesquisa' },
        update: {
          position: 'Development and Research Assistant',
          company: {
            name: 'Rede Nacional de Ensino e Pesquisa',
            alias: 'RNP',
          },
          activity: {
            start: DateTime.fromObject({
              year: 2017,
              month: 10,
            }).toJSDate(),

            end: DateTime.fromObject({
              year: 2018,
              month: 4,
            }).toJSDate(),
          },

          description:
            'Worked with RNP and Federal Fluminense University, developing an application of business model canvas. The Business Model Canvas is a strategic management template used for developing new business models and documenting existing ones. Using SAGE2, a web-based collaboration platform, enabling users to work with remote collaborators through video conferencing. I worked with SAGE2 library using bare metal Javascript (EcmaScript 5) to bring SAGE2 and Business Model Canvas together',
        },
      },
    },
  ]);

  const resume = await ResumeModel.findOneAndUpdate(
    {},
    {
      name: 'Peter',
      jobTitle: 'Full Stack Javascript Engineer',
      contacts: [
        {
          username: '@pherval',
          name: 'Telegram',
          link: 'https://t.me/pherval',
          icon: {
            lib: 'bs',
            name: 'BsTelegram',
          },
        },
        {
          username: '@pherval',
          name: 'Github',
          link: 'https://github.com/pherval',
          icon: {
            lib: 'bs',
            name: 'BsGithub',
          },
        },
      ],
    },
    { upsert: true, new: true }
  ).exec();

  resume.educations.push(...educations);
  resume.skills.push(...skills);
  resume.jobs.push(...jobs);
  resume.courses.push(...courses);

  return resume.save();
}

async function run(): Promise<void> {
  console.time('seed');
  const db = await connect();

  const result = await seed();

  console.log(result);
  console.timeEnd('seed');

  await disconnect(db);
}

run().catch(console.error);
