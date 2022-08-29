<script>
  import Header from './header.svelte';
  import Nav from './Nav.svelte';
  import Input from './Input.svelte';
  import Info from './Info.svelte';
  import InfoTeksti from './Info_teksti.svelte';
  import Tervehdys from './Tervehdys.svelte';
  import Datepicker from './Datepicker.svelte';
  import Form from './Form.svelte';
  export let name;
  export let year;
  import Kayttaja from './kayttajaStore';
  import Omat from './omatStore.js';
  import FetchHaku from './FetchHaku.svelte';
  import Oma from './Omat.svelte';
  import Footer from './Footer.svelte';
  $: city = ``;

  let hakuTiedot = [{}];
  let tiedot = [{}];

  /* Sovelluksen tiloja käynnistyessä*/

  let kirjautunut = false;
  let info = false;
  let kalenteri = false;
  let form = false;
  let ekaVierailunimi = true;
  let ekaVierailusalasana = true;
  let ekavierailuhaku = true;
  let oma = false;
  let virhe = false;
  let FetchOn = false;

  $: paivamaara = `${new Date()
    .toISOString()
    .slice(0, 10)}`; /* Nykyinen päivämäärä alkuun valittuna*/
  /* Funktio, joka hakee fetchin ja parsii yhden päivämäärän otettavat tiedot taulukkoon. Haettava kaupunki on fetch-haussa mukana.*/

  const getData = async () => {
    virhe = false;
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=NLMBJRSTDJAKGT2VMR3JS9DUM&contentType=json`
    );
    if (!response.ok) {
      virhe = !virhe;
    }
    const data = await response.json();
    console.log(data);
    hakuTiedot.push(data.resolvedAddress);
    console.log(hakuTiedot);
    for (let i = 0; i < data.days.length; i++) {
      if (data.days[i].datetime === paivamaara) {
        const paiva = new Date(data.days[i].datetime).toLocaleDateString();

        hakuTiedot.push(paiva),
          hakuTiedot.push(data.days[i].tempmax),
          hakuTiedot.push(data.days[i].tempmin),
          hakuTiedot.push(data.days[i].description),
          hakuTiedot.push(data.days[i].icon);
      }
      hakuTiedot = hakuTiedot;
    }

    tiedot = hakuTiedot;
    hakuTiedot = [{}];

    FetchOn = true;
    if (tiedot.length < 3) {
      virhe = !virhe;
    }
  };
  /* Validointiin seurattavia muuttujia*/
  const onkoValidiNimi = (teksti) => teksti.trim().length > 0;
  const onkoValidiSalasana = (teksti) => teksti.trim().length > 5;
  $: validiNimi = onkoValidiNimi(nimi);
  $: validiSalasana = onkoValidiSalasana(salasana);
  $: validi = validiSalasana && validiNimi;
  $: onkoOmia = $Omat.length > 0;

  $: nimi = ``;
  $: salasana = ``;

  /* Yleisiä funktioita*/

  const naytaInfo = () => {
    info = !info;
  };
  const eiInfo = () => {
    info = !info;
  };
  const kalenteriEsiin = () => {
    kalenteri = !kalenteri;
  };
  const formVaihto = () => {
    form = !form;
  };
  const EkaVierailuNimi = () => {
    ekaVierailunimi = false;
  };
  const EkaVierailuSalasana = () => {
    ekaVierailusalasana = false;
  };
  const ekaVierailuHaku = () => {
    ekavierailuhaku = false;
  };
  const tyhjenna = () => {
    FetchOn = false;
  };
  const teeId = () => {
    return Math.max(0, ...$Omat.map((t) => t.id)) + 1;
  };
  const vaihdaOma = () => {
    oma = !oma;
  };

  /* Sisään kirjautuessa päivitetään myös käyttäjäStorea*/

  const kirjaudu = () => {
    Kayttaja.update(() => ({
      nimi: nimi,
      salasana: salasana,
    }));
    form = !form;
    kirjautunut = !kirjautunut;
    nimi = ``;
    salasana = ``;
    ekaVierailunimi = true;
    ekaVierailusalasana = true;
  };

  /* KirjauduUlos- funktion palauttaa alkutilan sovellukseen*/

  const kirjauduUlos = () => {
    Kayttaja.update(() => ({
      nimi: ``,
      salasana: null,
    }));
    kirjautunut = !kirjautunut;
    ekavierailuhaku = true;
    ekaVierailunimi = true;
    ekaVierailusalasana = true;
  };

  /* Haun tallennus vie tiedot Omat-storeen*/

  const tallenna = () => {
    $Omat.push({
      id: teeId(),
      kaupunki: tiedot[1],
      pvm: tiedot[2],
      min: tiedot[4],
      max: tiedot[3],
      kuva: tiedot[6],
    });
    $Omat = $Omat;
    FetchOn = false;
    city = ``;
  };
  /* Funktio hakee välitetyn tiedon avulla oikean id:n. Sitten haetaan id:n avulla oikea index ja poistetaan se.*/
  const poistaOma = (ce) => {
    let index = $Omat.findIndex((x) => x.id === ce.detail);
    $Omat.splice(index, 1);
    $Omat = $Omat;
  };
</script>

<!--Esitettävät komponentit ja alla yleisiä tyylejä, taustakuvaa ym. -->
<body>
  <main>
    <div class="sivu">
      {#if form}
        <Form
          on:formvaihto={formVaihto}
          bind:arvo={nimi}
          bind:salasana_={salasana}
          on:ekavierailunimi={EkaVierailuNimi}
          on:ekavierailusalasana={EkaVierailuSalasana}
          on:kirjaudu_={kirjaudu}
          {validiNimi}
          {ekaVierailunimi}
          {validiSalasana}
          {ekaVierailusalasana}
          {validi}
        />{/if}

      <Nav
        {kirjautunut}
        {oma}
        on:formvaihto={formVaihto}
        on:kirjauduulos={kirjauduUlos}
        on:vaihdaoma={vaihdaOma}
      />
      <div class="kuva">
        {#if oma}
          <Oma {onkoOmia} on:vaihdaoma={vaihdaOma} on:poistaoma={poistaOma} />
        {/if}
        <Header {name} {year} />
        <Tervehdys {kirjautunut} />

        <div class="input">
          <Info on:naytaInfo={naytaInfo} on:eiinfo={eiInfo} />
          <Input
            {kalenteri}
            on:esiin={kalenteriEsiin}
            bind:kaupunki={city}
            bind:startDate={paivamaara}
            on:getd={getData}
            on:ekavierailuhaku={ekaVierailuHaku}
            {kirjautunut}
            {ekavierailuhaku}
          />
          <InfoTeksti {info} />
        </div>
        <FetchHaku
          {tiedot}
          {FetchOn}
          on:delete={tyhjenna}
          on:save={tallenna}
          {virhe}
        />
        <Footer {name} {year} />
      </div>
    </div>
  </main>
</body>

<style>
  main {
    width: 100%;
    margin: auto;

    border-radius: 4px;
    height: fit-content;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }

  body {
    background-color: rgba(20, 14, 27, 0.995);
  }
  .sivu {
    width: 100%;
  }
  .kuva {
    background-image: url('https://images.pexels.com/photos/1431822/pexels-photo-1431822.jpeg?cs=srgb&dl=pexels-brett-sayles-1431822.jpg&fm=jpg');
    background-size: cover;
    opacity: 0.9;
  }
  .input {
    margin-top: 10em;
  }
</style>
