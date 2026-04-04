# Malíř Hned

Vizuální brief pro první verzi webu.

Zdroj směru:
- referenční screenshoty dodané zadavatelem

Cíl:
- převzít přesně jejich vizuální jazyk
- přepsat obsah a strukturu pro produkt Malíř Hned
- neměnit styl, jen obsah

Pravidlo:
- nevymýšlet jiný design systém
- neexperimentovat s jinými barvami
- neuhýbat do výrazně jiného layoutu

To znamená:
- stejné barevné ladění
- stejný typ měkkých karet
- stejný typ stínů
- stejný kontrast textů
- stejný rytmus mezer
- stejný způsob používání ikon a plovoucích prvků

Jediné, co se mění:
- značka ChronoTask -> Malíř Hned
- obsah task managementu -> malování bytů a výběr malíře

---

## 1. Celkový vizuální charakter

Design působí:
- velmi čistě
- měkce
- lehce prémiově
- přátelsky
- vzdušně

Nesmí působit:
- technicky tvrdě
- korporátně
- barevně agresivně
- startupově křiklavě
- “AI slop” stylem

Vizualita stojí na těchto principech:
- světlé šedobéžové pozadí
- velké bílé plochy
- jemné šedé obrysy
- jemné stíny
- jeden hlavní modrý akcent
- občasný druhý akcent v teplé žluté/oranžové
- velmi zaoblené rohy
- obrovská, přehledná typografie

---

## 2. Barevný systém

Použít vizuálně stejné spektrum jako v referenci.

### Základní barvy

Pozadí stránky:
- velmi světlá teplá šedá
- přibližně `#efeeec` až `#f3f2ef`

Hlavní povrch:
- bílá
- `#ffffff`

Jemné linky a rámečky:
- světlá šedá
- cca `#e7e7e3`

Primární text:
- téměř černá
- cca `#111111`

Sekundární text:
- střední šedá
- cca `#8d8d8d` až `#a3a3a3`

### Akcenty

Primární modrá:
- měkká, čistá, ne příliš sytá
- cca `#4d86ff` až `#56b5ef` podle použití

Doplňková žlutá:
- teplá, měkká
- cca `#f2c44d`

Doplňková oranžová:
- spíš na drobné akcenty
- cca `#ef9f32`

Doplňková zelená:
- velmi střídmě
- jen u menších statusových prvků

Pravidlo:
- modrá je hlavní akcent
- žlutá a oranžová jsou doplněk
- žádná další výrazná paleta

---

## 3. Typografie

Vizuálně držet stejný charakter jako reference:
- moderní grotesk
- vysoká čitelnost
- měkké, elegantní proporce

Použití:
- velký hero headline
- jemnější světle šedý druhý řádek
- krátké podnadpisy
- malý počet fontových vah

### Typografická hierarchie

Hero H1:
- velmi velké
- lehké až regular řezy
- hodně vzduchu
- černý první řádek + světle šedý druhý řádek

Sekční headline:
- velké
- čisté
- centrované

Body text:
- krátké věty
- jemně šedý text
- nepřehánět délku

UI texty:
- jednoduché
- čitelné
- střední velikost

Pravidlo:
- žádné tučné přebíjení všeho
- typografie má být elegantní a klidná

---

## 4. Radius, stíny, rámečky

Tohle je pro výsledný pocit zásadní.

### Zaoblení

Velký hlavní kontejner:
- velmi velký radius

Karty:
- středně velký až velký radius

Malé plovoucí prvky:
- výrazně zaoblené

### Stíny

Používat:
- jemné, mléčné, rozostřené stíny
- žádné tvrdé stíny
- žádný dramatic neumorphic extrém

Vizualita stínu:
- lehký shadow pod kartou
- lehký highlight dojem na bílém povrchu

### Linky

Rámečky:
- velmi jemné
- skoro neviditelné

Pravidlo:
- rozhraní se odděluje hlavně mezerou, ne tvrdými čarami

---

## 5. Hlavní layout homepage

Homepage musí být přepsaná do stejného systému jako první referenční obrazovka.

### Hlavní plátno

Stejný princip jako reference:
- page background světlá šedá
- uprostřed velký bílý rounded container
- uvnitř hero s jemnou tečkovanou texturou

### Header

Zachovat strukturu reference:
- vlevo logo + název
- vpravo jednoduché menu
- vpravo sekundární a primární CTA

Pro Malíř Hned:
- logo vlevo
- odkazy:
  - `Jak to funguje`
  - `Malíři`
  - `Ceník`
- vpravo:
  - text link `Výsledek ukázky`
  - outline button `Spočítat cenu`

Poznámka:
- header má zůstat velmi lehký

### Hero obsah

Místo textu:
- `Think, plan, and track`
- `all in one place`

Použít:
- `Cena, termín a malíř`
- `na jednom místě`

Druhá řádka musí být světlejší, přesně jako v referenci.

Pod headline:
- krátká věta:
  - `Spočítejte si orientační cenu, podívejte se na nejbližší možnosti a vyberte si konkrétního malíře.`

CTA:
- modrý button
- text `Ukázat cenu a termíny`

### Plovoucí prvky v hero

Zachovat princip 1:1:
- levý horní prvek
- levý dolní prvek
- horní pravý prvek
- pravý dolní prvek
- malý plovoucí středový symbol

Jen změnit obsah.

#### Levý horní prvek

Místo žlutého task papírku:
- žlutý “poznámkový” kartičkový blok
- text třeba:
  - `Nevíte metry? Nevadí.`
  - `Stačí dispozice nebo pár fotek.`

#### Levý dolní prvek

Místo task list preview:
- mini karta ukázkových cen
- např.
  - `1+kk`
  - `7 000–11 000 Kč`
  - `2+1 po nájemníkovi`
  - `10 000–16 000 Kč`

#### Horní pravý prvek

Místo reminder card:
- mini karta termínu
- např.
  - `Nejbližší možné termíny`
  - `St 10. 4.`
  - `Pá 12. 4.`

#### Pravý dolní prvek

Místo integrations:
- mini karta 3 malířů
- s portréty nebo avatary
- titulek:
  - `3 vhodní malíři`

#### Středový plovoucí symbol

Místo 4-dot symbolu:
- značka / jednoduchá ikona Malíř Hned
- stále ve stejné fyzické podobě:
  - malý rounded square
  - měkký stín

---

## 6. Sekce pod hero

Další sekce se mají držet stylu z dalších referencí.

### Sekce “Jak to funguje”

Vizuálně navázat na referenční bloky s velkým headline a kartami.

Nadpis:
- velký, centrovaný
- např. `Jednoduše a bez obíhání`

Podnadpis:
- jemný šedý text

Pod tím 3 velké karty:
- `Cena`
- `Termín`
- `Malíři`

Každá karta:
- bílá
- velký radius
- jemný shadow
- uvnitř mini ilustrace ve stylu reference

#### Karta Cena
- mini kalkulačka
- dispozice / m2
- orientační cenový rozsah

#### Karta Termín
- mini kalendář
- zvýrazněné 2 až 3 dny

#### Karta Malíři
- 2 nebo 3 malé portrétní karty
- jméno a krátký štítek

Pravidlo:
- stejné proporce a kompozice jako reference
- jiný obsah, stejná vizuální logika

---

## 7. Sekce s profily malířů

Inspirace:
- testimonial grid z referenční čtvrté obrazovky

Místo testimonials:
- grid skutečných malířů

Headline:
- `Konkrétní lidé, ne anonymní seznam`

Layout:
- různé velikosti karet
- jedna výraznější větší karta s fotkou
- několik menších textových karet

Každá karta:
- portrét
- jméno
- krátký odstavec
- co bere rád
- běžný cenový rozsah

Jedna větší karta může být:
- profil “hlavního” malíře s větší fotkou
- tlačítko `Zobrazit profil`

To velmi dobře přepíše testimonial sekci do našeho produktu.

---

## 8. Výsledková stránka

Výsledková stránka se má vizuálně opřít hlavně o druhý referenční screenshot s dashboardem.

Princip:
- velký bílý rounded panel
- uvnitř karty
- jasná hierarchie
- hodně vzduchu
- modré akcenty

### Struktura výsledku

Horní část:
- headline typu:
  - `Pro 2+1 v Praze 6 to vychází takto`

Pod tím tři hlavní karty vedle sebe:

#### Karta 1: Cena
- hlavní odhad
- orientační rozsah
- jednoduchá poznámka o přesnosti

#### Karta 2: Termíny
- 2 až 3 nejbližší možnosti
- malé kalendářové prvky

#### Karta 3: Přesnost / zpřesnění
- text:
  - `Chcete cenu zpřesnit? Přidejte fotky.`
- upload CTA

Pod tím větší široká karta:
- `Vhodní malíři`
- tři profily v řadě

Pod tím volitelně ještě jedna karta:
- `Co může cenu změnit`

Pravidlo:
- výsledková stránka nemá vypadat jako tabulka
- má působit jako elegantní dashboard

---

## 9. Ikony a malé ilustrace

Použít přesně stejný princip jako reference:
- měkké bílé destičky
- jednoduchý symbol
- výrazný stín

Typ ikon:
- jednoduché line / flat symboly
- ne příliš detailní

Pro Malíř Hned:
- kalendář
- váleček nebo štětka
- domek / byt
- foto
- telefon
- cenovka nebo jednoduchý badge

Pravidlo:
- žádné agresivní barevné ikony
- ikonografie musí vypadat jako součást stejného světa

---

## 10. Textura a pozadí

První hero panel má mít:
- jemnou tečkovanou / zrnitou texturu jako reference

Další sekce:
- čisté světlé plochy
- občasné velmi jemné oddělení sekcí

Nesmí vzniknout:
- tmavé bloky
- silné gradienty
- barevně těžké pruhy

Výjimka:
- jedna jemně modrá plocha v sekci výsledku nebo feature preview, stejně jako reference používá modré pozadí za dashboardem

---

## 11. Co přesně zachovat

Zachovat:
- světle šedé okolní pozadí
- velký bílý rounded hlavní kontejner
- hero s měkkou tečkovanou texturou
- velký headline s černým a světle šedým řádkem
- plovoucí karty v rozích
- čistou bílou dashboardovou kartu pro výsledek
- velké feature karty níže na stránce
- grid styl pro profily / důvěryhodný obsah
- tenký, lehký header
- zaoblené buttony
- velmi jemné stíny

---

## 12. Co změnit pouze obsahově

Přepsat:
- task management -> malování bytů
- reminders -> termíny
- to-do list -> ukázkové ceny / rozsah zakázky
- integrations -> vhodní malíři
- testimonials -> skuteční malíři

Nový obsah nesmí rozbít původní kompozici.

---

## 13. Co nedělat

Nedělat:
- nové barevné schéma
- dark mode
- jinou typografickou logiku
- výrazně ostřejší radius
- minimalistický brutalismus
- ilustrace úplně jiným stylem
- příliš mnoho textu
- technickou nebo developerskou estetiku

---

## 14. Přepis textů do vizuálního stylu

### Hero headline

Řádek 1:
- `Cena, termín a malíř`

Řádek 2:
- `na jednom místě`

### Hero podtext

`Spočítejte si orientační cenu, podívejte se na nejbližší možnosti a vyberte si konkrétního malíře.`

### Hero CTA

`Ukázat cenu a termíny`

### Sekční headline

`Všechno důležité hned před sebou`

### Sekce s malíři

`Skuteční malíři, které si můžete vybrat`

---

## 15. Produktové mapování referencí

### Reference 1 -> Homepage hero
- použít skoro 1:1 jako základ landing page

### Reference 2 -> Výsledková stránka
- použít jako základ layoutu výsledku

### Reference 3 -> Sekce “jak to funguje” / feature cards
- použít na bloky Cena, Termín, Malíři

### Reference 4 -> Sekce s profily malířů
- použít na důvěryhodný grid s lidmi

---

## 16. Implementační závěr

Při návrhu a vývoji platí:
- design neřešit znovu od nuly
- reference jsou závazný vizuální základ
- produktový obsah se do nich pouze překládá

Pracovní mantra:

`Stejný svět, jiný produkt.`

