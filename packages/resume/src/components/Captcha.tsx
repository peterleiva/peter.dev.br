import HCaptcha from '@hcaptcha/react-hcaptcha';
import { ComponentProps } from 'react';

type Props = Omit<ComponentProps<typeof HCaptcha>, 'sitekey'>;

const sitekey = process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY;

export default function Captcha(props: Props) {
  if (!sitekey) {
    return null;
  }

  return <HCaptcha sitekey={sitekey} {...props}></HCaptcha>;
}
