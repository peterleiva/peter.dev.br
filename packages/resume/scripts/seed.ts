import ResumeModel, { Contact, ResumeDocument } from 'services/models/resume';
import SkillModel from 'services/models/skill';
import EducationModel from 'services/models/education';
import JobModel from 'services/models/job';
import { connect, disconnect } from 'services/database';
import { map, lensProp, view } from 'ramda';
import { Types } from 'mongoose';
import { DateTime } from 'luxon';

type DocumentId = { _id: Types.ObjectId };

async function seed(): Promise<ResumeDocument> {
  const idLens = lensProp<DocumentId>('_id');
  const idView = view(idLens);
  const id = map(idView);

  const contacts: Contact[] = [
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
  ];

  const skills = await SkillModel.create([
    {
      name: 'Javascript',
      tags: [{ name: 'principal' }],
    },
    {
      name: 'MongoDB',
    },
    {
      name: 'Next.js',
    },
    {
      name: 'Node.js',
    },
  ]);

  const educations = await EducationModel.create([
    {
      title: 'Data Modeling',
      started: DateTime.fromObject({ year: 2020, month: 2, day: 3 }).toJSDate(),

      intitution: {
        name: 'MongoDB University',
      },
    },
  ]);

  const jobs = await JobModel.create([
    {
      position: 'Developer',
      company: {
        name: 'Superintência',
        alias: 'STI - UFF',
      },
      activity: {
        start: DateTime.fromObject({ year: 2020, month: 2, day: 3 }).toJSDate(),
      },
    },
  ]);

  return ResumeModel.create({
    contacts,
    skills: id(skills),
    educations: id(educations),
    jobs: id(jobs),
  });
}

async function run(): Promise<void> {
  const db = await connect();
  const session = await db.startSession();

  await session.withTransaction(seed);

  await session.endSession();
  await disconnect(db);
}

run();
