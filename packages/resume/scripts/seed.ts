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
          title: 'Data Modeling',
          'institution.name': 'MongoDB University',
        },

        upsert: true,

        update: {
          title: 'Computer Science',
          started: DateTime.fromObject({
            year: 2020,
            month: 2,
            day: 3,
          }).toJSDate(),

          institution: {
            name: 'UFF',
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
            month: 2,
            day: 3,
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
        filter: {},
        update: {
          position: 'Developer',
          company: {
            name: 'Superintência',
            alias: 'STI - UFF',
          },
          activity: {
            start: DateTime.fromObject({
              year: 2020,
              month: 2,
              day: 3,
            }).toJSDate(),
          },
        },
      },
    },
  ]);

  const resume = await ResumeModel.findOneAndUpdate(
    {},
    {
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
    { upsert: true }
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

run();
