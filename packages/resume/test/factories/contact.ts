import casual from 'casual';
import { Contact } from 'models/resume';
import { times } from 'ramda';

const contact = times<Contact>(() => ({
  link: casual.url,
  name: casual.name,
  username: casual.username,
  icon: {
    lib: 'bs',
    name: 'BsGithub',
  },
}));

export default contact;
