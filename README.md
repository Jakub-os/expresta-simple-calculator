# Expresta – prototyp kalkulačky vizitiek

Interaktívny prototyp zjednodušenej kalkulačky. Obsahuje výber prevedenia, veľký náhľad, doladenie fólie a rohov, sandwichové jadro, pokročilé nastavenia, počet kusov, rýchlosť výroby, prehľad dodania a ukážkový výpočet ceny.

## Spustenie lokálne

Vyžaduje Node.js, žiadna inštalácia balíkov ani build nie je potrebný.

```sh
node server.cjs
```

Otvorte http://127.0.0.1:4173/#calculator.

## Publikovanie na GitHub Pages

1. Nahrajte tento priečinok do repozitára s hlavnou vetvou `main`.
2. V repozitári otvorte **Settings → Pages** a ako **Source** zvoľte **GitHub Actions**.
3. V **Actions** spustite **Publish prototype to GitHub Pages → Run workflow**, prípadne odošlite nový commit do `main`.
4. Adresa publikovaného webu sa zobrazí pri úspešnom deploymente a v **Settings → Pages**.

Workflow publikuje iba obsah `dist/`. Všetky lokálne cesty sú relatívne, preto web funguje aj v podpriečinku projektového repozitára. Po každom pushi do `main` sa automaticky zverejní nová verzia.

## Štruktúra

- `dist/index.html` – stránka a vstupný bod
- `dist/app.js` – stav a správanie kalkulačky
- `dist/preview.js` – fotografické náhľady a carousel
- `dist/style.css`, `iteration.css` a `print-ui.css` – vzhľad
- `dist/assets/` – lokálne fotografie, logo a ikony
- `.github/workflows/pages.yml` – automatické publikovanie
- `server.cjs` – jednoduchý lokálny náhľad

## Vývojové podklady

[Figma – obrazovky a stavy](https://www.figma.com/design/XnhDiwfnzIWDF4bXHetsyG/?node-id=279-3494)

## Hranice prototypu

Ceny a prehľad dopravy sú ilustračné. Objednávka, nahrávanie súborov a produkčný backend nie sú napojené. Zvolené parametre sa ukladajú len v prehliadači cez localStorage. Písma sa načítavajú z Google Fonts; fotografie, logo a ikony sú súčasťou repozitára.

GitHub Pages poskytuje statický hosting. Produkčný výpočet a objednávky preto bude potrebné napojiť na existujúce služby Expresta.

## Dizajn – november 2026

Aktuálne rozhranie vychádza zo sekcie Figma `358:4105`. Zahŕňa kompaktnú galériu, oddelené karty rekapitulácie, pill prepínače, nový veľký náhľad, doladenie a samostatný pokročilý formulár. Štýly nového rozhrania sú v `dist/redesign.css`, ikony v `dist/assets/redesign/`. Fotorealistické náhľady zostávajú na pozadí `#F9FAFB`.

Ceny a doprava sú ukážkové. Nahrávanie grafiky a objednávka nie sú napojené na produkčné služby.
