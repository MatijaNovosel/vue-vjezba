<div align="center">
  <img src="https://user-images.githubusercontent.com/36193643/205978239-f29e0f55-a561-4b90-931c-066045662f9b.png" />
</div>

<h1 align=center>Vue vježba</h1>
<p align=center>Vježba za Vue 2/3.</p>

## 📑 Opis

Potrebno je napraviti klasičnu "to-do" aplikaciju uz pomoć Vue gdje korisnik može dodati, brisati i uređivati svoje dnevne obveze.

Koristiti [Vuetify](https://next.vuetifyjs.com/en/getting-started/installation/) za komponente uz Typescript i Vue 3 sa `setup` sintaksom. Sve napraviti na branchu `dev`.

**Obavezno** odabrati `Essentials` opciju prilikom stvaranja projekta, `Yes` na izboru za TypeScript i `npm` kao package manager.

Za općenite upute oko toga kako pisati Vue kod, pratiti [ovo](https://github.com/MatijaNovosel/vue-best-practice).

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
- Todo stavke potrebno je čuvati u localStoragu i pristupati njima pomoću [Pinie](https://pinia.vuejs.org/) - proučiti pojam **persistent storage** i plugin za Piniu vezan uz to
- Stavke je moguće pretraživati uz pomoć polja za pretragu koje se treba nalaziti u navigacijskoj traci (prilikom pretraga koristiti debouncing)
- Stavke koje su obavljene moraju imati prekriženi tekst i nakon prelaska u "gotovo" stanje prikazati ih u tabu "Done"
- Stavke je potrebno dodati uz pomoć [dijaloga](https://vuetifyjs.com/en/components/dialogs/) i potrebno je napraviti validaciju sadržaja koristeći [vee-validate](https://vee-validate.logaretm.com/v4/)
- Isti taj dijalog koristiti za uređivanje stavki (razmisliti o tome gdje držati podatke o odabranoj stavci)
- Dodati prijevod na aplikaciju uz pomoć [i18n](https://kazupon.github.io/vue-i18n/), za engleski i hrvatski jezik te klikom na gumb prebaciti iz jednog u drugo ili obratno
- Napraviti gumb koji će obrisati sve stavke i u staviti ih u arhivu - ovisno o tabu koji je odabran, a nalazi se na prvom viewu gdje su ili aktivne ili neaktivne stavke, tu akciju treba potvrditi posebnim dijalogom gdje su jedine opcije `Yes` ili `No`
- Napraviti rutu unutar koje će se prikazati arhiva stavki, klikom na stavku na tom ekranu vratiti će se u svoje pripadno stanje van iz arhive
- Većinu logike s operacijama nad stavkama bi trebala biti obavljena unutar stora
- Stavke u arhivi i u neaktivnom stanju je nemoguće uređivati, samo one koje su aktivne

## 🌍 Deployanje

Nakon stvaranja aplikacije, deployati je na [Vercel](https://vercel.com/).
