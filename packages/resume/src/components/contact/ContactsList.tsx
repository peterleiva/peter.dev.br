import { IoFingerPrintSharp as FingerprintIcon } from 'react-icons/io5';
import { Contact as ContactProps } from 'types';
import Contact from './Contact';
import IconLabel from '../IconLabel';

type ContactsListProps = {
  contacts: ContactProps[];
};

export default function ContactsList({ contacts }: ContactsListProps) {
  return (
    <address>
      {contacts.map(({ name, username, link, icon }) => (
        <Contact key={name} href={link} label={name} icon={icon} external>
          {username}
        </Contact>
      ))}

      <div className="email">
        <Contact href="mailto:job@peter.dev.br" hideIcon external>
          job@peter.dev.br
        </Contact>
        <span className="fingerprint">
          <IconLabel Icon={FingerprintIcon}>A141FC37</IconLabel>
        </span>
      </div>

      <style jsx>{`
        address {
          gap: var(--space) var(--space-lg);
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          background: var(--color-background-1);
          padding: var(--space);
          border-radius: var(--border-radius-lg);
          margin: 0 auto;
        }

        .fingerprint {
          font-style: normal;
          font-weight: var(--weight-bolder);
        }

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
