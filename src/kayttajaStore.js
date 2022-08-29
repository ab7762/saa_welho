/* Store käyttäjän tietojen hallintaan.*/

import { writable } from 'svelte/store';

const kayttaja = writable({
  nimi: ``,

  salasana: null,
});

export default kayttaja;
