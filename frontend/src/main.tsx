import * as ReactDOM from 'react-dom/client';

import App from './app/app';
import { CustomThemeProvider } from './theme';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <CustomThemeProvider>
    <App />
  </CustomThemeProvider>
);
