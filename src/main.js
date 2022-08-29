import App from './App.svelte';

const app = new App({
  target: document.body,
  props: {
    name: 'Sää-Welho',
    year: new Date().getFullYear(),
    tekijä: `Mikko Kivelä`,
  },
});

export default app;
