import { useState } from 'react';
import type { IconType } from 'react-icons';
import { IoClose as CloseIcon } from 'react-icons/io5';
import { BsCheckLg as SuccessIcon } from 'react-icons/bs';
import { debounce } from 'lib';
import clsx from 'clsx';

type FlashMessageProps = {
  title: string;
  children: React.ReactNode;
  hide?: boolean;
  autoClose?: number;
  className?: string;
};

const colors = {
  warning: {
    primary: 'var(--color-warning)',
    secondary: 'rgb(239 134 59)',
  },

  error: {
    primary: 'var(--color-error)',
    secondary: 'rgb(225 53 48)',
  },

  success: {
    primary: 'var(--color-success)',
    secondary: 'rgb(68 155 110)',
  },

  info: {
    primary: 'var(--color-info)',
    secondary: 'rgb(0 69 229)',
  },
};

type MessageType = keyof typeof colors;

const FlashMessage = (Icon: IconType, type: MessageType) =>
  function FlashMessageWithIcon({
    title,
    children,
    hide = false,
    autoClose,
    className,
  }: FlashMessageProps) {
    const [closed, setClosed] = useState(hide);

    const close = () => setClosed(true);

    if (autoClose) {
      debounce(close, autoClose);
    }

    const color = colors[type];

    if (closed) return null;

    return (
      <div
        className={clsx(
          'flash-message',
          'relative text-white p-4 rounded-3xl',
          className
        )}
      >
        <button className="float-right" onClick={close}>
          <CloseIcon size="24" />
        </button>
        <span className="alert absolute left-5 -top-6">
          <svg width="43" height="48" xmlns="http://www.w3.org/2000/svg">
            <path d="M21.37 0a21.37 21.37 0 1 1-4.13 42.35l-7.86 5.19a2 2 0 0 1-3.1-1.8l.52-8.73A21.37 21.37 0 0 1 21.37 0Z" />
            <g transform="translate(13, 15)">
              <Icon size="18" />
            </g>
          </svg>
        </span>
        <div className="ml-20">
          <h2 className="type-2">{title}!</h2>
          <p>{children}</p>
        </div>

        <style jsx>{`
          .flash-message {
            background: no-repeat url(/flash-message-bg.svg) ${color.primary};
            background-position: left -14px bottom -25px;
            background-blend-mode: overlay;
          }

          .alert path {
            fill: ${color.secondary};
          }
        `}</style>
      </div>
    );
  };

export const SuccessMessage = FlashMessage(SuccessIcon, 'success');
export const ErrorMessage = FlashMessage(CloseIcon, 'error');
export const InfoMessage = FlashMessage(CloseIcon, 'info');
export const WarningMessage = FlashMessage(CloseIcon, 'warning');
