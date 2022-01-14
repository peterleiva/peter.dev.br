import Script from 'next/script';

export default function Analytics() {
  const id = process.env.NEXT_PUBLIC_ANALYTICS_ID;
  const src = process.env.NEXT_PUBLIC_ANALYTICS_SRC;

  if (!id || !src) {
    return null;
  }

  return (
    <Script
      strategy="beforeInteractive"
      data-website-id={id}
      src={src}
      async
      defer
    />
  );
}
