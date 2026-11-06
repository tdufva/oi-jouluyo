# Oi jouluyö / O helga natt

Kaksikielinen kirjallinen joulukalenteri, jossa jugendtalon 24 luukkua avautuvat joulukuun päivinä. Sisäänkäynnin pariovet ovat luukku 24.

- [Joulukalenteri](https://tdufva.github.io/oi-jouluyo/)
- [Luukkujen muokkauslomake](https://tdufva.github.io/oi-jouluyo/muokkaa.html)

## Luukkujen muokkaaminen

1. Avaa muokkauslomake ja valitse luukku. Täytä suomen- ja ruotsinkieliset kentät.
2. Jos lisäät oman kuvan, valitse se lomakkeessa ja lataa sama tiedosto GitHubin `assets/luukut/`-kansioon lomakkeen linkistä. Voit myös liittää suoran HTTPS-kuvaosoitteen. Lisää kuvalle kuvaus molemmilla kielillä.
3. Liitä YouTuben jakolinkki tai videon tunniste ja Apple Musicin jakolinkki. Kentät ovat valinnaisia. YouTube latautuu, kun kävijä painaa toistopainiketta.
4. Paina **Kopioi sisältö** ja avaa **Muokkaa GitHubissa**. Korvaa tiedoston sisältö ja tallenna se painamalla **Commit changes**. Julkaisu päivittyy GitHub Pagesin seuraavassa julkaisussa.

Voit muokata myös suoraan `luukut/01.json`–`luukut/24.json`-tiedostoja. Erota tekstin kappaleet tyhjällä rivillä. Muokkauslomakkeen esikatselulinkki avaa GitHubiin tallennetun version.

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
