import '@/styles/globals.css'
import store, { persist } from '@/redux/store';
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persist}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  )

}
