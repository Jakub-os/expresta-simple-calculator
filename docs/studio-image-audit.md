# Audit a nová sada obrázkov STUDIO

Kontrola: 13. 11. 2026. Zdroj: aktuálny prototyp na GitHub Pages, galéria prevedení, veľký náhľad a doladenie detailov.

## Zistenia

- Každá stará fotografia bola iba výrez 512 × 512 px zo spoločného obrázka. Vo veľkom náhľade sa zväčšovala, čím sa strácala ostrosť textu, hrán a papiera.
- Ponuka používala iný vizuál STUDIO ako doladenie. Carousel navyše striedal STUDIO, BOTANICA a FORMA.
- Niektoré odlesky a hrany pôsobili ako plošná ilustrácia. Sendvičové jadro sa skladalo z posunutých kópií toho istého obrázka.
- Staré výrezy a transformácie robili údržbu materiálov a kombinácií neprehľadnou.

## Náhrada

Nová sada používa iba STUDIO, jeden uhol kamery a konzistentné umiestnenie vizitky. Každý veľký náhľad je samostatná bitmapa 1536 × 1024 px. Veľké WebP sú bezstratové a zachovávajú alfa kanál; galéria má menšie 768 × 512 px verzie. Priehľadné pozadie umožňuje presnú farbu podkladu #ECEFF3.

Materiály: klasické, elegantné matné, lesklé, prírodné, s lesklým logom a extra hrubé. Samostatné obrázky majú aj zlatá a strieborná fólia, zaoblené rohy, zadná strana a nepotlačený rub. Farebné jadro sa mení iba v oblasti červeného jadra pôvodnej bitmapy; papier, tlač a tieň zostávajú rovnaké.

BOTANICA a FORMA sa už nezobrazujú. Pri jednom grafickom návrhu zostáva prepínač Predná/Zadná; šípky na striedanie grafík boli odstránené. Šípky vo veľkom modale na prechod medzi materiálmi zostávajú.

Súbory sú v `dist/assets/studio/`. Výber obrázka podľa parametrov rieši `studioAsset()` v `dist/preview.js`. Galéria aj modal používajú tú istú sadu. Pozície fotografií sa nemenia nesúmernými transformáciami ani zväčšovaním starého atlasu.

## Generovanie

Použitý bol vstavaný nástroj na generovanie obrázkov. Najprv vznikla fotografická predloha STUDIO podľa pôvodného uhla; materiálové, fóliové a rohové varianty vznikli úpravou tejto predlohy. Finálne prompty a názvy súborov sú v `studio-generation-prompts.json`. Konverzia do WebP a zmenšené náhľady slúžia iba na webové doručenie; grafika sa nimi negeneruje.

Všetky ceny a fotografie v prototype naďalej slúžia na ilustráciu výberu. Výrobná kalkulácia ani objednávkový backend sa touto zmenou nemenia.

## Overenie

Overených 432 kombinácií materiálu, fólie, umiestnenia, rohov, tlače a strany: 36 platných veľkých obrázkov, bez chýbajúcich súborov. Všetkých 42 WebP (36 veľkých + 6 náhľadov) má správne rozmery a alfa kanál. V prehliadači boli overené materiálový modal, fólie vpredu/vzadu, zaoblenie, modré jadro, nepotlačený rub a mobilná šírka bez horizontálneho presahu. Nečisté okraje 11 variantov boli opravené nástrojom na generovanie obrázkov; jemný vonkajší tieň dopĺňa CSS.

