import React          from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App.jsx';
import './index.css';

const divRoot = document.querySelector('#root')
const root = createRoot(divRoot); // createRoot(container!) if you use TypeScript

root.render(<App />)

