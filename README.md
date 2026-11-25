# Oi jouluyö / O helga natt

Kaksikielinen kirjallinen joulukalenteri, jossa jugendtalon 24 luukkua avautuvat joulukuun päivinä. Sisäänkäynnin pariovet ovat luukku 24.

- [Joulukalenteri](https://ohelga.blog/)
- [Luukkujen muokkauslomake](https://ohelga.blog/muokkaa.html)
- [Podcastarkisto 2022–2025](https://ohelga.blog/avsnitt/)

Podcastarkistossa on 77 jaksoa alkuperäisissä osoitepoluissaan. [Siirto-ohje](MIGRATION.md) kertoo RedCircle-äänitiedostoista, RSS-tilaajien säilyttämisestä ja Hover-verkkotunnuksen asetuksista.

## Luukkujen muokkaaminen

Kaksoisnapsauta projektikansiossa **Avaa luukkujen muokkaus.command**. Muokkain avautuu osoitteeseen [localhost:4174/muokkaa.html](http://localhost:4174/muokkaa.html). Vaihtoehtoisesti aja `python3 editor_server.py --open`. Pidä käynnistynyt pääteikkuna auki muokatessasi; Ctrl+C sulkee palvelimen.

1. Valitse luukku ja kirjoita otsikko, teema, teksti sekä kuvan kuvaus yhdellä kielellä, suomeksi tai ruotsiksi.
2. Codex tunnistaa kielen ja kääntää toiseen kieleen 2,5 sekunnin kirjoitustauon jälkeen. Automaattikäännöksen voi kytkeä pois tai käynnistää painikkeesta. **Tarkista käännös** avaa muokattavan toisen kieliversion. Alkuperäistä tekstiä ei muuteta. Kielen voi myös määrätä käsin.
3. Lisää kuva koneelta (JPG, PNG, WebP tai GIF, enintään 8 Mt), YouTube-linkki ja Apple Music -linkki. Kuva tallentuu Macille luonnoksen mukana. YouTube näkyy upotettuna toistopainikkeen jälkeen; Apple Music avautuu linkistä.
4. Esikatselu päivittyy kirjoittaessa. FI/SV-painikkeilla näet molemmat kieliversiot.
5. Paina **Julkaise luukku**. Kuva ja molemmat tekstit siirtyvät yhdessä GitHubiin, ja GitHub Pages päivittää sivuston julkaisun valmistuttua. Luonnoksen tallentaminen ei julkaise sisältöä.

Muokkain käyttää Macin nykyisiä Codex- ja GitHub CLI -kirjautumisia. Käännös kuluttaa nykyisen Codex-tilisi käyttökiintiötä. Teksti lähetetään OpenAI:lle käännöstä varten; tunnuksia tai API-avaimia ei kopioida selainkoodiin tai GitHubiin. Codex suoritetaan eristetyssä tilapäiskansiossa ilman shelliä, projektiasetuksia, verkkohakua tai pysyvää keskustelua. Se palauttaa vain käännöksen JSON-muodossa.

Luonnokset ja julkaisemattomat kuvat säilyvät tämän Macin `.editor-data/`-kansiossa, jonka Git ohittaa. Tekstistä tallentuu myös selainkohtainen varmuuskopio. Julkaisu tarkistaa luukun GitHub-version: toisen muokkaajan muutosten päälle ei kirjoiteta automaattisesti. Muokkain kuuntelee vain tämän koneen loopback-osoitetta, tarkistaa Originin ja istuntotunnisteen eikä tarjoa yksityisiä kansioita verkkosivuina.

[Julkinen muokkauslomake](https://ohelga.blog/muokkaa.html) toimii ilman paikallista palvelinta kirjoittamiseen, esikatseluun ja selaimen luonnostallennukseen. Codex-käännös, kuvan lähetys ja suora julkaisu toimivat Mac-muokkaimessa. Lomakkeen lopusta löytyvät edelleen JSON-varmuuskopio ja aiempi GitHub-kopiointitapa. Myös suora muokkaus `luukut/01.json`–`luukut/24.json`-tiedostoihin toimii.

Muokkaimen tarkistukset: `python3 scripts/check-editor.py` (ei oikeita GitHub-kirjoituksia tai käännöksiä).

## Talon pienet yllätykset

Kahdeksan kohtausta vaihtuu päivän ja kuuden tunnin aikajakson mukaan. Aikataulu käyttää Suomen aikaa. Kohtaus alkaa, kun sen kohta talosta on hetken näkyvissä. Samalla vierailulla kohtauksia on muutaman minuutin välein. Lumipyry tarvitsee lumisateen päälle ja määrän nollaa suuremmaksi.

Yksittäistä kohtausta voi kokeilla lisäämällä kalenterin osoitteeseen `?kohtaus=koira`, `?kohtaus=tonttu`, `?kohtaus=lintu`, `?kohtaus=lyhty`, `?kohtaus=lumipyry`, `?kohtaus=poro`, `?kohtaus=tahti` tai `?kohtaus=tietajat`.

## Paikallinen esikatselu

```sh
python3 serve.py
```

Avaa [kalenteri](http://localhost:4173/) tai [muokkauslomake](http://localhost:4173/muokkaa.html). Paikallisella sivulla voit avata kaikki luukut esikatselukytkimellä.

Päivämäärälukitus käyttää kävijän selaimen paikallista aikaa. Vuoden 2026 jälkeen luukut jäävät auki. GitHub Pages on staattinen ja luukkutiedostot ovat julkisia. Tavallinen kalenterinäkymä näyttää luukut päivämäärän mukaan.

## Julkaisu ja kuvitus

GitHub Pages julkaisee `main`-haaran juuresta. `.nojekyll` ottaa staattiset tiedostot käyttöön sellaisinaan.

Talon ikkunat ja oletuskuvitukset ovat tätä versiota varten piirrettyjä geometrisia SVG-kuvia. Otsikko käyttää Rye-fonttia. Fontin SIL Open Font License on tiedostossa `assets/fonts/Rye-OFL.txt`.
