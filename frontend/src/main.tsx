import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './app/app';
import { CustomThemeProvider } from './theme';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <CustomThemeProvider>
      <App />
    </CustomThemeProvider>
  </BrowserRouter>
);
