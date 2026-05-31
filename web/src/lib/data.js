export const featureCards = [
  {
    badge: 'Cena',
    title: 'Orientační cena bez zbytečného čekání',
    text: 'Stačí lokalita, dispozice nebo metry a hned vidíte realistický rozsah ceny.',
    variant: 'price',
  },
  {
    badge: 'Termín',
    title: 'Volné termíny dřív než první telefon',
    text: 'Nejdřív se podíváte, kdy to dává smysl. Až potom řešíte domluvu.',
    variant: 'calendar',
  },
  {
    badge: 'Malíři',
    title: 'Skuteční lidé, ne anonymní seznam',
    text: 'Vyberete si podle obličeje, stylu práce, běžné ceny i nejbližší dostupnosti.',
    variant: 'painters',
  },
]

export const companyProfile = {
  name: 'Malíř Hned s.r.o.',
  founder: 'Jan Havel',
  phone: '+420 777 650 320',
  email: 'info@malirhned.cz',
  address: 'K Červenému dvoru 18, 160 00 Praha 6',
  ico: '218 45 731',
  story: [
    'Malíř Hned vznikl z jednoduché zkušenosti z terénu. Když si lidé objednávají malování, často netápou jen v ceně, ale hlavně v tom, komu vlastně zavolají, kdy se to dá reálně udělat a jestli druhá strana opravdu ví, co dělá.',
    'Platformu proto staví lidé, kteří mají za sebou skutečnou řemeslnou praxi. Zakládající tým vyrostl kolem malířů, kteří se přes deset let pohybují na bytech, kancelářích i menších rekonstrukcích po Praze a okolí.',
    'Nechtěli jsme další anonymní formulář. Chtěli jsme prostředí, kde je vidět termín, člověk i základní kontext zakázky dřív, než začne zdlouhavé obvolávání a nejasné nacenění.',
  ],
  principles: [
    'Za profilem stojí reálná zkušenost z malířských zakázek, ne katalog bez kontextu.',
    'Cena má být orientační a čitelná hned na začátku, ne až po třetím telefonátu.',
    'Domluva musí být lidská, věcná a bez zbytečných překvapení.',
  ],
}

export const aboutMilestones = [
  { year: '2013', title: 'První společné zakázky', text: 'Začínáme malováním bytů po nájemnících a menších kanceláří v Praze 6 a 7.' },
  { year: '2017', title: 'Stálý okruh řemeslníků', text: 'Kolem zakládající dvojice vzniká ověřená síť malířů, kteří mají podobný standard práce i komunikace.' },
  { year: '2021', title: 'Desítky realizací měsíčně', text: 'Přibývají novostavby, byty před prodejem i zakázky pro správce nemovitostí.' },
  { year: '2026', title: 'Malíř Hned online', text: 'Vzniká platforma, která spojuje řemeslnou praxi s rychlým výběrem termínu, ceny a konkrétního člověka.' },
]

export const aboutPeople = [
  {
    name: 'Jan Havel',
    role: 'Zakladatel a malíř',
    note: '15 let v terénu, byty po nájemnících, koordinace zakázek a první prohlídky.',
  },
  {
    name: 'Petr Havel',
    role: 'Malíř a realizace',
    note: 'Menší byty, rychlé přemalby a zakázky s krátkým termínem.',
  },
  {
    name: 'Lenka Horová',
    role: 'Klientská koordinace',
    note: 'Sbírá podklady, hlídá návaznost poptávky a drží komunikaci pohromadě.',
  },
]

export const calculatorRoomTypes = [
  { id: 'flat-1kk', label: 'Byt 1+kk', area: 35, basePrice: 8500 },
  { id: 'flat-2kk', label: 'Byt 2+kk', area: 55, basePrice: 12500 },
  { id: 'flat-3kk', label: 'Byt 3+kk', area: 75, basePrice: 16500 },
  { id: 'flat-4kk', label: 'Byt 4+kk+', area: 100, basePrice: 22000 },
  { id: 'office', label: 'Kancelář', area: 120, basePrice: 25000 },
  { id: 'commercial', label: 'Provozovna', area: 180, basePrice: 34000 },
]

export const calculatorExtras = [
  { id: 'ceiling', label: 'Stropní malba', price: 3500 },
  { id: 'repair', label: 'Tmelení a opravy zdí', price: 2500 },
  { id: 'covering', label: 'Kompletní zakrytí a ochrana', price: 1800 },
  { id: 'express', label: 'Expresní termín', price: 4000 },
]

export const customerProfileSnapshot = {
  name: 'Klientský profil',
  intro: 'Jednoduché místo, kde zákazník vidí svoje rozpracované zadání, oblíbené malíře a poslední domluvené termíny.',
  upcoming: [
    { label: 'Aktivní poptávka', value: 'Byt 2+1, Praha 6' },
    { label: 'Vybraný termín', value: '10. dubna 2026' },
    { label: 'Přiřazený kontakt', value: 'Petr Havel' },
  ],
  savedPainters: ['Petr Havel', 'Marek Novotný', 'Lenka Horová'],
}

export const decisionPaths = [
  {
    key: 'painters',
    title: 'Chci si vybrat malíře',
    subtitle: 'Nejdřív správný člověk',
    href: '/maliri',
    image:
      'https://images.unsplash.com/photo-1639736681890-56d5bce03cdb?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=80&w=1600',
    steps: [
      'Projdu si skutečné profily malířů.',
      'Zadáním bytu a lokality se hned spočítá cena.',
      'Pak řeším termín a detaily zakázky s vybraným člověkem.',
    ],
  },
  {
    key: 'calendar',
    title: 'Chci hlavně termín',
    subtitle: 'Nejdřív zjistím, kdy se může malovat',
    href: '/kalendar',
    image:
      'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1400',
    steps: [
      'Zadáte kdy chcete malovat a kde.',
      'Systém hned spočítá orientační cenu.',
      'Pak uvidíte nejbližší reálné možnosti a vhodné malíře.',
    ],
  },
]

const rawPainters = [
  {
    id: 'petr-havel',
    name: 'Petr Havel',
    experience: '12 let praxe',
    role: 'Po nájemníkovi a menší byty',
    summary:
      'Nejčastěji maluju byty před nastěhováním a rychlé přemalby, kde je důležitá jasná domluva a čistá práce bez zbytečných okolků.',
    price: '9 000–16 000 Kč',
    availability: 'Pátek 10. 4.',
    avatar: 'P',
    response: 'Volá do 18 min',
    jobs: '286 zakázek',
    areas: ['Praha 5', 'Praha 6', 'Praha-západ'],
    specialties: ['Po nájemníkovi', '1+kk až 3+1', 'Rychlé termíny'],
    photos: ['Obývák po malbě', 'Ložnice po nájemníkovi', 'Chodba a dveře'],
    about:
      'Jsem typ malíře pro klienty, kteří chtějí rychle vyřešit byt po nájemníkovi nebo běžnou přemalbu před nastěhováním. Držím termíny a rovnou říkám, co může ovlivnit cenu.',
    fit: 'Ideální pro menší byty a rychlé přemalby mezi nájemníky.',
    communication: 'Věcný, rychlý, bez zbytečných okolků.',
  },
  {
    id: 'martin-ruzicka',
    name: 'Martin Růžička',
    experience: '14 let praxe',
    role: 'Novostavby a větší byty',
    summary:
      'Sedí mi čisté zakázky, které se dají dobře naplánovat dopředu. Mám rád přesný rozsah práce a klidnou organizaci.',
    price: '14 000–25 000 Kč',
    availability: 'Úterý 14. 4.',
    avatar: 'M',
    response: 'Volá do 25 min',
    jobs: '198 zakázek',
    areas: ['Praha 4', 'Praha 10', 'Říčany'],
    specialties: ['Novostavby', '3+kk a větší', 'Stropy'],
    photos: ['Nový byt 3+kk', 'Malba stropů', 'Kuchyňský kout'],
    about:
      'Dělám hlavně novostavby a větší byty, kde je potřeba klidný průběh, přesný rozsah a žádné improvizace na poslední chvíli.',
    fit: 'Silný na větší zakázky, kde se plánuje dopředu.',
    communication: 'Klidný, systematický, plánovací typ.',
  },
  {
    id: 'roman-vesely',
    name: 'Roman Veselý',
    experience: '11 let praxe',
    role: 'Přemalby a opravy',
    summary:
      'Dělám běžné přemalby i stěny, které potřebují před malbou srovnat a připravit. Hodí se tam, kde je potřeba opravit drobnosti.',
    price: '8 000–18 000 Kč',
    availability: 'Čtvrtek 9. 4.',
    avatar: 'R',
    response: 'Volá do 22 min',
    jobs: '244 zakázek',
    areas: ['Praha 2', 'Praha 3', 'Praha 8'],
    specialties: ['Opravy stěn', 'Přemalby', 'Starší byty'],
    photos: ['Opravené rohy stěn', 'Přemalovaný pokoj', 'Stěna po tmelení'],
    about:
      'Když je potřeba opravit stěny před malbou, rovnou řeknu, co bude mít vliv na cenu a jestli má smysl řešit to v jednom kroku.',
    fit: 'Výborný tam, kde nejsou stěny úplně v top stavu.',
    communication: 'Praktický, upřímný, vysvětlí co a proč.',
  },
  {
    id: 'david-svoboda',
    name: 'David Svoboda',
    experience: '8 let praxe',
    role: 'Rychlé termíny',
    summary:
      'Když je potřeba rychle malovat menší byt nebo kancelář, umím se přizpůsobit tempu a fungovat i v kratším okně.',
    price: '7 500–15 000 Kč',
    availability: 'Středa 8. 4.',
    avatar: 'D',
    response: 'Volá do 12 min',
    jobs: '173 zakázek',
    areas: ['Praha 1', 'Praha 7', 'Praha 9'],
    specialties: ['Menší byty', 'Kanceláře', 'Do 48 hodin'],
    photos: ['Rychlá kancelářská malba', '1+kk po malbě', 'Bílá výmalba'],
    about:
      'Jsem dobrá volba tam, kde je důležitý rychlý termín a menší rozsah práce. Typicky 1+kk, kancelář nebo byt mezi nájmy.',
    fit: 'Nejlepší volba pro urgentní menší zakázky.',
    communication: 'Rychlý, operativní, dostupný po telefonu.',
  },
  {
    id: 'jakub-cerny',
    name: 'Jakub Černý',
    experience: '10 let praxe',
    role: 'Přesné zakrytí a detail',
    summary:
      'Víc než rychlost řeším pečlivost. Hodím se tam, kde je důležité šetrné zakrytí a čistý detail kolem nábytku nebo kuchyně.',
    price: '12 000–20 000 Kč',
    availability: 'Pondělí 13. 4.',
    avatar: 'J',
    response: 'Volá do 31 min',
    jobs: '127 zakázek',
    areas: ['Praha 2', 'Praha 4', 'Praha 11'],
    specialties: ['Detailní práce', 'Zakrytí nábytku', 'Barevné malby'],
    photos: ['Barevná stěna', 'Zakrytá kuchyň', 'Ložnice detail'],
    about:
      'Vyhovují mi klienti, kteří chtějí spíš klidnou a pečlivou realizaci než úplně nejrychlejší výjezd.',
    fit: 'Dobrý tam, kde hraje roli detail a pečlivost.',
    communication: 'Klidný, pečlivý, vysvětluje postup.',
  },
  {
    id: 'tomas-pospisil',
    name: 'Tomáš Pospíšil',
    experience: '13 let praxe',
    role: 'Rodinné byty',
    summary:
      'Nejčastěji dělám běžné rodinné byty, kde je potřeba zvládnout víc pokojů najednou a jasně držet harmonogram.',
    price: '13 000–22 000 Kč',
    availability: 'Úterý 14. 4.',
    avatar: 'T',
    response: 'Volá do 27 min',
    jobs: '211 zakázek',
    areas: ['Praha 9', 'Praha 14', 'Brandýs'],
    specialties: ['3+1 a větší', 'Rodinné byty', 'Více pokojů'],
    photos: ['Dětský pokoj', 'Obývací pokoj', 'Vstupní chodba'],
    about:
      'Jsem silný hlavně v bytech, kde je potřeba udělat víc místností v jednom rytmu a bez zmatku kolem termínů.',
    fit: 'Hodí se na větší byty a víc místností najednou.',
    communication: 'Klidný, organizačně silný, drží plán.',
  },
  {
    id: 'ondrej-kral',
    name: 'Ondřej Král',
    experience: '9 let praxe',
    role: 'Bílá výmalba bez komplikací',
    summary:
      'Hodím se na čisté bílé malby a standardní přemalby, kde klient nechce nic komplikovat a potřebuje rychle hotovo.',
    price: '8 500–14 000 Kč',
    availability: 'Čtvrtek 16. 4.',
    avatar: 'O',
    response: 'Volá do 15 min',
    jobs: '164 zakázek',
    areas: ['Praha 3', 'Praha 10', 'Praha-východ'],
    specialties: ['Bílá malba', 'Standardní přemalby', 'Rychlý průběh'],
    photos: ['Bílý pokoj', 'Strop a stěny', 'Hotová ložnice'],
    about:
      'Když klient chce klasickou bílou výmalbu bez složitostí, umím to mít rychle spočítané i rychle hotové.',
    fit: 'Silný na jednoduché standardní zakázky.',
    communication: 'Přímý, jednoduchý, rychlé potvrzení.',
  },
  {
    id: 'marek-novotny',
    name: 'Marek Novotný',
    experience: '10 let praxe',
    role: 'Byty před prodejem',
    summary:
      'Maluju byty před prodejem nebo před focením. Hlídám čistý výsledek a neutrální tón, který dobře funguje na prohlídkách.',
    price: '11 000–19 000 Kč',
    availability: 'Pátek 17. 4.',
    avatar: 'N',
    response: 'Volá do 29 min',
    jobs: '139 zakázek',
    areas: ['Praha 1', 'Praha 2', 'Praha 5'],
    specialties: ['Před prodejem', 'Čisté bílé tóny', 'Reality'],
    photos: ['Byt před focením', 'Světlý obývák', 'Vymalovaná kuchyň'],
    about:
      'Často dělám zakázky pro pronajímatele a realitní makléře, kde je důležité, aby byt působil co nejčistěji a nejklidněji.',
    fit: 'Dobré pro pronajímatele a byty před focením.',
    communication: 'Profesionální, vhodný pro reality a správce.',
  },
  {
    id: 'filip-horak',
    name: 'Filip Horák',
    experience: '9 let praxe',
    role: 'Kanceláře a menší provozy',
    summary:
      'Kanceláře a menší provozy zvládám rychle, aby byl co nejmenší zásah do běžného provozu a fungování týmu.',
    price: '10 000–18 000 Kč',
    availability: 'Středa 15. 4.',
    avatar: 'F',
    response: 'Volá do 19 min',
    jobs: '121 zakázek',
    areas: ['Praha 4', 'Praha 5', 'Praha 13'],
    specialties: ['Kanceláře', 'Mimo špičku', 'Menší provozy'],
    photos: ['Kancelářský open space', 'Zasedačka', 'Recepce po malbě'],
    about:
      'Když je potřeba vymalovat kancelář bez velkého chaosu a s jasným časovým oknem, tohle je přesně typ práce, který dělám rád.',
    fit: 'Nejlepší pro kanceláře a menší provozy.',
    communication: 'Jasný, organizační, zvyklý na firemní klienty.',
  },
  {
    id: 'adam-benes',
    name: 'Adam Beneš',
    experience: '7 let praxe',
    role: 'Barevné stěny a akcenty',
    summary:
      'Kromě klasické bílé dělám rád i barevné akcenty, dětské pokoje nebo výraznější stěny v obýváku.',
    price: '11 500–20 500 Kč',
    availability: 'Pondělí 20. 4.',
    avatar: 'A',
    response: 'Volá do 24 min',
    jobs: '118 zakázek',
    areas: ['Praha 6', 'Praha 7', 'Kladno'],
    specialties: ['Barevné stěny', 'Dětské pokoje', 'Akcentní malby'],
    photos: ['Modrá stěna', 'Dětský pokoj', 'Akcent v obýváku'],
    about:
      'Pokud klient nechce jen klasickou bílou, ale i citlivě zvolenou barevnou plochu, umím pomoct i s tím, co bude v prostoru fungovat.',
    fit: 'Dobrá volba pro klienty, kteří chtějí i barvu a ne jen bílou.',
    communication: 'Kreativnější, poradí i s tónem a kombinací.',
  },
]

const painterImages = [
  'https://images.pexels.com/photos/4981775/pexels-photo-4981775.jpeg?auto=compress&cs=tinysrgb&w=900&h=900&fit=crop',
  'https://images.pexels.com/photos/7788241/pexels-photo-7788241.jpeg?auto=compress&cs=tinysrgb&w=900&h=900&fit=crop',
  'https://images.pexels.com/photos/8961528/pexels-photo-8961528.jpeg?auto=compress&cs=tinysrgb&w=900&h=900&fit=crop',
  'https://images.pexels.com/photos/3931131/pexels-photo-3931131.jpeg?auto=compress&cs=tinysrgb&w=900&h=900&fit=crop',
  'https://images.pexels.com/photos/10682438/pexels-photo-10682438.jpeg?auto=compress&cs=tinysrgb&w=900&h=900&fit=crop',
  'https://images.pexels.com/photos/20814721/pexels-photo-20814721.jpeg?auto=compress&cs=tinysrgb&w=900&h=900&fit=crop',
  'https://images.pexels.com/photos/26547256/pexels-photo-26547256.jpeg?auto=compress&cs=tinysrgb&w=900&h=900&fit=crop',
  'https://images.pexels.com/photos/30640160/pexels-photo-30640160.jpeg?auto=compress&cs=tinysrgb&w=900&h=900&fit=crop',
  'https://images.pexels.com/photos/34670931/pexels-photo-34670931.jpeg?auto=compress&cs=tinysrgb&w=900&h=900&fit=crop',
  'https://images.pexels.com/photos/8486919/pexels-photo-8486919.jpeg?auto=compress&cs=tinysrgb&w=900&h=900&fit=crop',
]

const painterPortfolios = [
  [
    'https://images.unsplash.com/photo-1625585598750-3535fe40efb3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900',
    'https://images.unsplash.com/photo-1748680223695-2a009f22e917?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900',
    'https://images.unsplash.com/photo-1728649054288-61f332ee389b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900',
  ],
  [
    'https://images.unsplash.com/photo-1616046229478-9901c5536a45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900',
    'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900',
    'https://images.unsplash.com/photo-1484154218962-a197022b5858?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900',
  ],
]

export const painters = rawPainters.map((painter, index) => {
  const [lowPrice, highPrice] = painter.price.match(/\d[\d ]+/g) ?? []

  return {
    ...painter,
    image: painterImages[index % painterImages.length],
    portfolio: painterPortfolios[index % painterPortfolios.length],
    priceRangeCompact: lowPrice && highPrice ? `${lowPrice}–${highPrice} Kč` : painter.price,
    availabilityLabel: painter.availability,
    shortDescription: painter.summary.split('. ')[0],
    verified: true,
  }
})

export const painterMap = Object.fromEntries(painters.map((painter) => [painter.name, painter]))

export const calendarDays = [
  { day: 30, muted: true, jobs: [] },
  { day: 31, muted: true, jobs: [] },
  { day: 1, jobs: [{ painter: 'Petr Havel', time: '9:00', type: 'medium' }, { painter: 'Roman Veselý', time: '13:30', type: 'soft' }] },
  { day: 2, jobs: [{ painter: 'David Svoboda', time: '8:00', type: 'high' }, { painter: 'Ondřej Král', time: '14:00', type: 'medium' }, { painter: 'Marek Novotný', time: '16:00', type: 'soft' }] },
  { day: 3, jobs: [{ painter: 'Tomáš Pospíšil', time: '11:00', type: 'medium' }] },
  { day: 4, jobs: [{ painter: 'Martin Růžička', time: '10:00', type: 'soft' }, { painter: 'Jakub Černý', time: '15:00', type: 'medium' }] },
  { day: 5, jobs: [{ painter: 'Filip Horák', time: '9:30', type: 'high' }] },
  { day: 6, jobs: [] },
  { day: 7, jobs: [{ painter: 'Adam Beneš', time: '8:30', type: 'soft' }, { painter: 'Petr Havel', time: '12:30', type: 'medium' }] },
  { day: 8, jobs: [{ painter: 'David Svoboda', time: '9:00', type: 'available' }, { painter: 'Roman Veselý', time: '13:00', type: 'medium' }] },
  { day: 9, jobs: [{ painter: 'Roman Veselý', time: '10:00', type: 'available' }, { painter: 'Jakub Černý', time: '15:00', type: 'soft' }, { painter: 'Adam Beneš', time: '17:00', type: 'soft' }] },
  { day: 10, selected: true, jobs: [{ painter: 'Petr Havel', time: '8:30', type: 'available' }, { painter: 'Marek Novotný', time: '12:00', type: 'soft' }, { painter: 'Filip Horák', time: '15:30', type: 'medium' }] },
  { day: 11, jobs: [{ painter: 'Ondřej Král', time: '9:00', type: 'high' }, { painter: 'Tomáš Pospíšil', time: '11:00', type: 'high' }, { painter: 'Martin Růžička', time: '14:30', type: 'medium' }] },
  { day: 12, jobs: [] },
  { day: 13, jobs: [{ painter: 'Tomáš Pospíšil', time: '8:00', type: 'soft' }, { painter: 'David Svoboda', time: '13:30', type: 'available' }] },
  { day: 14, jobs: [] },
  { day: 15, jobs: [{ painter: 'Filip Horák', time: '9:30', type: 'medium' }, { painter: 'Martin Růžička', time: '12:00', type: 'available' }] },
  { day: 16, jobs: [{ painter: 'Ondřej Král', time: '10:00', type: 'available' }, { painter: 'Adam Beneš', time: '16:30', type: 'soft' }] },
  { day: 17, jobs: [{ painter: 'Marek Novotný', time: '11:00', type: 'available' }, { painter: 'Jakub Černý', time: '14:30', type: 'medium' }, { painter: 'Roman Veselý', time: '17:00', type: 'high' }] },
  { day: 18, jobs: [{ painter: 'Petr Havel', time: '7:00', type: 'soft' }] },
  { day: 19, jobs: [] },
  { day: 20, jobs: [{ painter: 'Adam Beneš', time: '9:00', type: 'available' }, { painter: 'Filip Horák', time: '13:00', type: 'soft' }] },
  { day: 21, jobs: [{ painter: 'Marek Novotný', time: '11:30', type: 'medium' }, { painter: 'Jakub Černý', time: '15:00', type: 'soft' }] },
  { day: 22, jobs: [{ painter: 'David Svoboda', time: '9:00', type: 'available' }, { painter: 'Roman Veselý', time: '13:30', type: 'medium' }] },
  { day: 23, jobs: [{ painter: 'Martin Růžička', time: '10:00', type: 'soft' }] },
  { day: 24, jobs: [{ painter: 'Ondřej Král', time: '8:30', type: 'available' }, { painter: 'Tomáš Pospíšil', time: '12:30', type: 'high' }, { painter: 'Petr Havel', time: '15:30', type: 'medium' }] },
  { day: 25, jobs: [] },
  { day: 26, jobs: [] },
  { day: 27, jobs: [{ painter: 'Filip Horák', time: '9:00', type: 'soft' }] },
  { day: 28, jobs: [{ painter: 'Marek Novotný', time: '11:00', type: 'medium' }, { painter: 'Adam Beneš', time: '14:45', type: 'soft' }] },
  { day: 29, jobs: [{ painter: 'Roman Veselý', time: '9:30', type: 'available' }] },
  { day: 30, jobs: [{ painter: 'Tomáš Pospíšil', time: '10:30', type: 'high' }, { painter: 'Jakub Černý', time: '17:00', type: 'soft' }] },
  { day: 1, muted: true, jobs: [] },
  { day: 2, muted: true, jobs: [] },
  { day: 3, muted: true, jobs: [] },
]

export const dayNames = ['Po', 'Út', 'St', 'Čt', 'Pá', 'So', 'Ne']

export const initialForm = {
  location: 'Praha 6',
  propertyType: 'Byt',
  size: '2+1',
  workType: 'Po nájemníkovi',
  whenType: 'Co nejdřív',
  date: '10. dubna',
  details: '',
  photos: 'Ne',
  name: '',
  phone: '',
}

export function getPainterById(id) {
  return painters.find((painter) => painter.id === id) ?? painters[0]
}

export function getCalendarDay(dayNumber) {
  return calendarDays.find((day) => day.day === dayNumber && !day.muted) ?? calendarDays[9]
}

export function getRecommendedPaintersForDay(dayNumber) {
  const selectedDay = getCalendarDay(dayNumber)

  return selectedDay.jobs
    .map((job) => painterMap[job.painter])
    .filter(Boolean)
    .slice(0, 3)
}
