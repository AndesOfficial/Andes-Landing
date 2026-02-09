import Intercom from '@intercom/messenger-js-sdk';

export default function IntercomComponent() {
  const APP_ID = import.meta.env.VITE_INTERCOM_APP_ID;

  if (APP_ID) {
    Intercom({
      app_id: APP_ID,
    });
  } else {
    console.log("Intercom not initialized: VITE_INTERCOM_APP_ID missing in .env");
  }


  return null;
}