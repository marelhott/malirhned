# Malíř Hned Web

Frontend prototyp služby `Malíř Hned`.

## O čem aplikace je

`Malíř Hned` je webová služba, která má klientovi pomoct rychle najít vhodného malíře pokojů bez klasického poptávkového portálu.

Základní myšlenka:

- klient neodesílá veřejnou poptávku “všem”
- klient si buď vybere konkrétního malíře, nebo nejdřív řeší termín
- cena je součást zadání a orientace, ne samostatná soutěžní proměnná
- cílem je co nejrychlejší přímé spojení klienta s konkrétním člověkem

## Co má web ukazovat

Aktuální prototyp pokrývá tyto části:

- landing page se dvěma vstupními cestami
- větev `Chci hlavně termín`
- větev `Chci si vybrat malíře`
- interaktivní kalendář s dostupností a zaplněností dnů
- katalog malířů
- detail profilu malíře
- formulář navazující na obě cesty

## Pro koho je produkt

- pro klienty, kteří chtějí vymalovat byt, dům nebo menší prostor
- pro lidi, kteří chtějí rychle zjistit termín a orientační cenu
- pro malíře, kteří nechtějí platit za nekvalitní veřejné leady

Primární trh:

- Praha
- Středočeský kraj

## Produktový cíl

Web má působit:

- jednoduše
- důvěryhodně
- lidsky
- profesionálně

Nemá působit jako:

- marketplace
- anonymní katalog firem
- agresivní lead generator

## Lokální spuštění

```bash
npm install
npm run dev
```

Vývojová adresa bývá standardně:

```text
http://127.0.0.1:5173/
```

## Kontrola kvality

```bash
npm run build
npm run lint
```
