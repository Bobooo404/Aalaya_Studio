export const INSTAGRAM_HANDLE = 'aalaya_a.s_studios';
export const INSTAGRAM_URL = `https://www.instagram.com/${INSTAGRAM_HANDLE}`;

export const EMAIL = 'aalayaasstudios@gmail.com';

export const PHONE = '9011692655';
export const PHONE_COUNTRY_CODE = '91';
export const PHONE_DISPLAY = '+91 90116 92655';
export const TEL_HREF = `tel:+${PHONE_COUNTRY_CODE}${PHONE}`;

export const DEFAULT_CHAT_MESSAGE =
  'Hello Aalaya Studios, I would like to talk about my project.';

export const whatsappUrl = (message: string = DEFAULT_CHAT_MESSAGE) =>
  `https://wa.me/${PHONE_COUNTRY_CODE}${PHONE}?text=${encodeURIComponent(message)}`;

export const WHATSAPP_URL = whatsappUrl();

export const EMAIL_SUBJECT = 'Project Enquiry';

export const EMAIL_BODY = [
  'I have a project in mind and would love to discuss it with you.',
  'Are you available for a quick conversation?',
  '',
  'Looking forward to connecting!',
].join('\n');

export const MAILTO_HREF = `mailto:${EMAIL}?subject=${encodeURIComponent(
  EMAIL_SUBJECT
)}&body=${encodeURIComponent(EMAIL_BODY)}`;
