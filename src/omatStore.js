/* Store, johon lisätään tallennettuja hakuja.*/

import { writable } from 'svelte/store';
const omat = writable([]);

export default omat;
