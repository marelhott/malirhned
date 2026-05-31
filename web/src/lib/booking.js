import { calendarDays, getPainterById, painterMap, painters } from './data'

export { calendarDays }

export const bookingDefaults = {
  location: 'Praha 6',
  propertyType: 'Byt',
  size: '2+1',
  customArea: '',
  workType: 'Po nájemníkovi',
  express: 'Ne',
  ceiling: 'Ne',
  repairs: 'Střední',
  covering: 'Ano',
  colors: 'Bílá',
  wallState: 'Běžný stav',
  date: '',
  day: '',
  slot: '',
  painter: '',
  name: '',
  phone: '',
  email: '',
  address: '',
  notes: '',
}

const sizeBasePrices = {
  '1+kk': 8900,
  '2+kk': 11800,
  '2+1': 13200,
  '3+kk': 15600,
  '3+1': 17100,
  '4+kk': 21400,
  '4+1': 23400,
  'Kancelář': 19700,
  'Chodby / SVJ': 16400,
  'Provozovna': 21900,
}

const workTypeMultipliers = {
  'Běžná bílá výmalba': 1,
  'Po nájemníkovi': 1.08,
  'Opravy stěn': 1.16,
  'Stropy': 1.1,
  'Barevné stěny': 1.14,
}

const repairAdditions = {
  Lehké: 0,
  Střední: 1200,
  Větší: 2600,
}

const wallStateAdditions = {
  'Běžný stav': 0,
  'Horší stav': 1700,
}

const slotStateMap = {
  available: {
    label: 'Volno',
    tone: 'free',
    description: 'Dobrá dostupnost',
  },
  soft: {
    label: 'Omezená kapacita',
    tone: 'limited',
    description: 'Ještě se dá rezervovat',
  },
  high: {
    label: 'Poslední místo',
    tone: 'last',
    description: 'Rychlé potvrzení pomůže držet slot',
  },
}

const monthLabel = 'duben 2026'

export const bookingOptions = {
  propertyTypes: ['Byt', 'Pokoj', 'Kancelář', 'Chodby / SVJ', 'Provozovna'],
  sizes: ['1+kk', '2+kk', '2+1', '3+kk', '3+1', '4+kk', '4+1', 'Vlastní metry'],
  workTypes: [
    'Běžná bílá výmalba',
    'Po nájemníkovi',
    'Opravy stěn',
    'Stropy',
    'Barevné stěny',
  ],
  yesNo: ['Ano', 'Ne'],
  repairLevels: ['Lehké', 'Střední', 'Větší'],
  wallStates: ['Běžný stav', 'Horší stav'],
  colorModes: ['Bílá', 'Více barev'],
}

export function createSearchFromBooking(partialState = {}) {
  const state = { ...bookingDefaults, ...partialState }
  const params = new URLSearchParams()

  Object.entries(state).forEach(([key, value]) => {
    if (value !== '' && value != null) params.set(key, String(value))
  })

  return params.toString()
}

export function parseBookingSearch(searchParams) {
  const values = {}

  Object.keys(bookingDefaults).forEach((key) => {
    values[key] = searchParams.get(key) ?? bookingDefaults[key]
  })

  return values
}

function getAreaEstimate(form) {
  if (form.size === 'Vlastní metry') {
    return Math.max(Number(form.customArea) || 0, 0)
  }

  const areas = {
    '1+kk': 34,
    '2+kk': 52,
    '2+1': 58,
    '3+kk': 72,
    '3+1': 81,
    '4+kk': 102,
    '4+1': 118,
    'Kancelář': 110,
    'Chodby / SVJ': 86,
    'Provozovna': 128,
  }

  return areas[form.size] ?? 58
}

export function calculatePriceRange(form) {
  const areaEstimate = getAreaEstimate(form)
  const customBase =
    form.size === 'Vlastní metry'
      ? Math.max(areaEstimate * (form.propertyType === 'Pokoj' ? 210 : 255), 7600)
      : sizeBasePrices[form.size] ?? 13200

  const propertyAdjustments = {
    Byt: 1,
    Pokoj: 0.88,
    Kancelář: 1.12,
    'Chodby / SVJ': 1.18,
    Provozovna: 1.2,
  }

  let total = customBase * (propertyAdjustments[form.propertyType] ?? 1)
  total *= workTypeMultipliers[form.workType] ?? 1
  total += repairAdditions[form.repairs] ?? 0
  total += wallStateAdditions[form.wallState] ?? 0

  if (form.express === 'Ano') total += 2600
  if (form.ceiling === 'Ano') total += 1500
  if (form.covering === 'Ano') total += 900
  if (form.colors === 'Více barev') total += 1400

  const low = Math.round(total / 100) * 100
  const high = Math.round((total * 1.18) / 100) * 100

  return {
    low,
    high,
    areaEstimate,
    summary: `${formatPrice(low)}-${formatPrice(high)} Kč`,
  }
}

export function formatPrice(value) {
  return value.toLocaleString('cs-CZ')
}

export function formatPriceRange(range) {
  return `${formatPrice(range.low)}-${formatPrice(range.high)} Kč`
}

export function getBookingStep(step) {
  return ['Cena', 'Termín', 'Malíř', 'Objednávka'].map((label, index) => ({
    label,
    active: index + 1 === step,
    complete: index + 1 < step,
  }))
}

export function getCalendarState(day) {
  if (day.muted) {
    return {
      label: 'Nedostupné',
      tone: 'off',
      description: 'Mimo zobrazené období',
    }
  }

  if (!day.jobs.length) {
    return {
      label: 'Plno',
      tone: 'full',
      description: 'Aktuálně bez vhodného slotu',
    }
  }

  if (day.jobs.some((job) => job.type === 'high')) {
    return {
      label: 'Poslední místo',
      tone: 'last',
      description: 'Rychle mizí',
    }
  }

  if (day.jobs.some((job) => job.type === 'available')) {
    return {
      label: 'Volno',
      tone: 'free',
      description: 'Dobrá dostupnost',
    }
  }

  return {
    label: 'Omezená kapacita',
    tone: 'limited',
    description: 'Ještě se dá rezervovat',
  }
}

export function getDayLabel(dayNumber) {
  return `${dayNumber}. ${monthLabel}`
}

export function getDayByNumber(dayNumber) {
  return calendarDays.find((day) => day.day === dayNumber && !day.muted) ?? null
}

export function getDayPriceRange(day, form) {
  const base = calculatePriceRange(form)
  const state = getCalendarState(day)

  const adjustments = {
    free: 0,
    limited: 500,
    last: 900,
    full: 0,
    off: 0,
  }

  const delta = adjustments[state.tone] ?? 0
  return {
    low: base.low + delta,
    high: base.high + delta,
  }
}

export function getRecommendedTerms(form) {
  const activeDays = calendarDays.filter((day) => !day.muted && day.jobs.length)
  const earliest = activeDays[0]
  const tomorrow = activeDays.find((day) => day.day >= 2) ?? activeDays[1] ?? earliest
  const thisWeek = activeDays.find((day) => day.day >= 7) ?? activeDays[2] ?? earliest
  const cheaper = activeDays.find((day) => day.day >= 15) ?? activeDays[3] ?? earliest

  return [
    {
      key: 'earliest',
      badge: 'Nejbližší možný',
      day: earliest.day,
      time: earliest.jobs[0]?.time ?? '8:30',
      caption: 'Nejrychlejší start',
      range: getDayPriceRange(earliest, form),
    },
    {
      key: 'tomorrow',
      badge: 'Zítra',
      day: tomorrow.day,
      time: tomorrow.jobs[0]?.time ?? '9:00',
      caption: 'Rychlé potvrzení',
      range: getDayPriceRange(tomorrow, form),
    },
    {
      key: 'week',
      badge: 'Tento týden',
      day: thisWeek.day,
      time: thisWeek.jobs[0]?.time ?? '11:00',
      caption: 'Vyvážená dostupnost',
      range: getDayPriceRange(thisWeek, form),
    },
    {
      key: 'cheaper',
      badge: 'Levnější příští týden',
      day: cheaper.day,
      time: cheaper.jobs[0]?.time ?? '10:00',
      caption: 'Klidnější termín',
      range: {
        low: Math.max(3500, getDayPriceRange(cheaper, form).low - 800),
        high: Math.max(5200, getDayPriceRange(cheaper, form).high - 800),
      },
    },
  ]
}

export function getSlotsForDay(dayNumber, form) {
  const day = getDayByNumber(dayNumber)
  if (!day) return []

  return day.jobs.map((job, index) => {
    const painter = painterMap[job.painter]
    const priceRange = getDayPriceRange(day, form)
    const state = slotStateMap[job.type] ?? slotStateMap.soft

    return {
      id: `${day.day}-${job.painter}-${job.time}-${index}`,
      day: day.day,
      time: job.time,
      painter,
      state,
      priceRange,
      fit: painter?.fit ?? 'Vhodné pro rychlé dokončení zakázky.',
      compactFit: painter?.specialties?.slice(0, 2).join(' / ') ?? 'Ověřený malíř',
    }
  })
}

export function getSelectedPainter(painterId) {
  if (!painterId) return null
  return getPainterById(painterId)
}

export function createOrderPayload(form, slot, painterId) {
  const painter = getSelectedPainter(painterId)
  const range = calculatePriceRange(form)

  return {
    ...form,
    painter: painter?.id ?? '',
    date: slot ? getDayLabel(slot.day) : form.date,
    day: slot ? String(slot.day) : form.day,
    slot: slot?.time ?? form.slot,
    priceLow: String(range.low),
    priceHigh: String(range.high),
  }
}

export function getBookingSummary(form) {
  const painter = getSelectedPainter(form.painter)
  const range = calculatePriceRange(form)

  return {
    painter,
    priceLabel: formatPriceRange(range),
    dateLabel: form.date || (form.day ? getDayLabel(Number(form.day)) : 'Vyberete v dalším kroku'),
    slotLabel: form.slot || 'Upřesníte po výběru dne',
    areaLabel: form.size === 'Vlastní metry' ? `${form.customArea || '?'} m2` : form.size,
  }
}

export function getPainterHighlights(painter) {
  if (!painter) return []

  return [
    { label: 'Praxe', value: painter.experience },
    { label: 'Zakázky', value: painter.jobs },
    { label: 'Reakce', value: painter.response },
    { label: 'Oblasti', value: painter.areas.slice(0, 2).join(', ') },
  ]
}

export function getAvailablePaintersPreview() {
  return painters.slice(0, 3)
}
