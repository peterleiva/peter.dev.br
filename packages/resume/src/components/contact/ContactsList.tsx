import { IoFingerPrintSharp as FingerprintIcon } from 'react-icons/io5';
import { Contact as ContactProps } from 'types';
import Contact from './Contact';
import IconLabel from '../IconLabel';

type ContactsListProps = {
  contacts: ContactProps[];
};

export default function ContactsList({ contacts }: ContactsListProps) {
  return (
    <address className="flex flex-col print:gap-y-4 gap-y-8 gap-x-10 mx-auto items-start bg-stone-50 p-5 rounded-lg">
      {contacts.map(({ name, username, link, icon }) => (
        <Contact key={name} href={link} label={name} icon={icon} external>
          {username}
        </Contact>
      ))}

      <div className="email print:self-center">
        <Contact href="mailto:job@peter.dev.br" hideIcon external>
          job@peter.dev.br
        </Contact>
        <span className="fingerprint font-semibold not-italic">
          <IconLabel Icon={FingerprintIcon}>A141FC37</IconLabel>
        </span>
      </div>

      <style jsx>{`
        @media screen and (max-width: 540px) {
          address {
            order: -1;
          }
        }

        @media screen and (min-width: 540px) {
          address {
            flex-flow: row wrap;
            justify-content: center;
          }
        }
      `}</style>
    </address>
  );
}
