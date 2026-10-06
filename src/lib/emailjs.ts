import emailjs from '@emailjs/browser';
import { EMAIL } from '../config/contact';

const PUBLIC_KEY =
  import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'oKwAPX1lYo4AzS5UL';
const SERVICE_ID =
  import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_w5lqsxl';
const TEMPLATE_ID =
  import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_bfisg7r';

export interface ContactFormValues {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export const isEmailJsConfigured = Boolean(PUBLIC_KEY && SERVICE_ID && TEMPLATE_ID);

export const sendContactEmail = (values: ContactFormValues) =>
  emailjs.send(
    SERVICE_ID,
    TEMPLATE_ID,
    {
      from_name: values.name,
      from_email: values.email,
      reply_to: values.email,
      phone: values.phone || 'Not provided',
      message: values.message,
      to_email: EMAIL,
      user_email: EMAIL,
    },
    { publicKey: PUBLIC_KEY }
  );
