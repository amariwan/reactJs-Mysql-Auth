import React from 'react';
import { createRoot } from 'react-dom/client';
import './Styles/index.css';

import Rotas from './Routes/routes';

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<Rotas />);
