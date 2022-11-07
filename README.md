<h1 align=center>Vue vježba</h1>
<p align=center>Vježba za Vue 2/3.</p>

## 📑 Opis
Potrebno je napraviti klasičnu "to-do" aplikaciju uz pomoć Vue gdje korisnik može dodati, brisati i uređivati svoje dnevne obveze. 

Obavezno je koristiti [Vuetify](https://vuetifyjs.com/en/) za komponente uz Typescript i Vue 2 s `defineComponent` sintaksom. Sve napraviti na branchu `dev`.

## ✏️ Zadaci
- Napraviti jedan view gdje će se prikazati popis todo stavki koje korisnik mora obaviti i gdje može praviti sve operacije navedene u opisu
- Podaci koji su bitni za stavku:
  - `description` opis stavke
  - `createdAt` datum kad je stvorena stavka, preporučljivo u ISO formatu

Stavka bi trebala izgledati nalik ovome (pogledati ostale Vuetify komponente koje bi se mogle koristiti):

```
┌────────────────────────────────────────────────────────────┐
│   Oprati suđe                            ┌──────┐ ┌──────┐ │
│                                          │ done │ │ edit │ │
│   Created 3d ago (4/11/2022 13:00)       └──────┘ └──────┘ │
└────────────────────────────────────────────────────────────┘
```

- Spomenuti view mora imati [Tabs](https://vuetifyjs.com/en/components/tabs/) komponentu kojom će se prikazivati ili obavljenje ili neobavljene stavke - tekst tabova mora biti "Active" i "Done"
- Sadržaj tabova moraju biti popisi stavki i svaki tab mora biti jedna definirana ruta unutar vue routera, kao što je opisano [ovdje](https://vuetifyjs.com/en/api/v-tab/#props)
- Todo stavke potrebno je čuvati u localStoragu i pristupati njima pomoću [VueX-a](https://vuex.vuejs.org/)
- Stavke je moguće pretraživati uz pomoć polja za pretragu koje se treba nalaziti u navigacijskoj traci (prilikom pretraga koristiti debouncing)
- Stavke koje su obavljene moraju imati prekriženi tekst i nakon prelaska u "gotovo" stanje prikazati ih u tabu "Done"
- Stavke je potrebno dodati uz pomoć [dijaloga](https://vuetifyjs.com/en/components/dialogs/) i potrebno je napraviti validaciju sadržaja koristeći [vee-validate](https://vee-validate.logaretm.com/v3/)
- Isti taj dijalog koristiti za uređivanje stavki
- Dodati prijevod na aplikaciju uz pomoć [i18n](https://kazupon.github.io/vue-i18n/), za engleski i hrvatski jezik te klikom na gumb prebaciti iz jednog u drugo ili obratno
- Napraviti gumb koji će obrisati sve stavke i u staviti ih u arhivu - i one koje su done ili active, a nalazi se na navigacijskoj traci
- Napraviti rutu unutar koje će se prikazati arhiva stavki, klikom na stavku na tom ekranu vratiti će se u svoje pripadno stanje van iz arhive

## 🌍 Deployanje
Nakon stvaranja aplikacije, deployati je na [Vercel](https://vercel.com/).
