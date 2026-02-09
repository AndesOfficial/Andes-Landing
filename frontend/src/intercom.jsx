import Intercom from '@intercom/messenger-js-sdk';

export default function Component() {
  Intercom({
    app_id: import.meta.env.VITE_INTERCOM_APP_ID || 'o4sf91nl',
  });

  return <div></div>;
}