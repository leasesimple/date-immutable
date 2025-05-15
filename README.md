# DateImmutable

## Introduction

Immutable date object with:

- Month start from 1
- Builders
- Getters
- Destructuring
- Enumeration
- Immutable operations

## Installation

```bash
npm install date-immutable
```

```bash
yarn add date-immutable
```

## Basic usage

```ts
import { DateImmutable } from 'date-immutable'

const date = DateImmutable.from(2023, 5, 4) // May 4th, 2023, 00:00:00.000 local time
const anotherDate = date.add({ month: 1 }) // June 4th, 2023, 00:00:00.000 local time
```

## Builders

```ts
import { DateImmutable } from 'date-immutable'

// (locale time) year: number, month: number, date = 1, hours = 0, minutes = 0, seconds = 0, milliseconds = 0
DateImmutable.from(2023, 5, 4, 9, 41, 0, 0) // Also accepts string, timestamp, Date or object

// String, @see https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Date/parse
DateImmutable.fromString('2023-05-04T09:41:00.000Z')

// Javascript Date
DateImmutable.fromDate(new Date('2023-05-04T09:41:00.000Z'))

// UNIX timestamp: number
DateImmutable.fromTimestamp(1683193260000)

// Object { year?: number, month?: number, date?: number, hours?: number, minutes?: number, seconds?: number, milliseconds?: number }
DateImmutable.fromObject({ year: 2023, month: 5, date: 4, hours: 9, minutes: 41, seconds: 0, milliseconds: 0 })
```

## Getters

```ts
import { DateImmutable } from 'date-immutable'

const date = DateImmutable.from(2023, 5, 4, 9, 41)
date.year // 2023
date.month // 5
date.date // 4
date.day // 0
date.hours // 9
date.minutes // 41
date.seconds // 0
date.milliseconds // 0
date.timezoneOffset // your local timezone offset
```

## Destructuring

```ts
import { DateImmutable } from 'date-immutable'

const { year, month, date, day, hours, minutes, seconds, milliseconds, timezoneOffset } = DateImmutable.from(2023, 5, 4, 9, 41)

// Caution: day and timezoneOffset are not part of the array destructuring to match the fromObject builder or the toObject signature.
const [year, month, date, hours, minutes, seconds, milliseconds] = DateImmutable.from(2023, 5, 4, 9, 41)
```

## Enumeration

Caution: `day` and `timezoneOffset` are not part of the enumeration to match the `fromObject` builder or the `toObject` signature.

```ts
import { DateImmutable } from 'date-immutable'

const initialDate = DateImmutable.from(2023, 5, 4, 9, 41)
const nextYear = DateImmutable.from({ ...initialDate, year: initialDate.year + 1 })
// {
//   year: 2024,
//   month: 5,
//   date: 4,
//   hours: 9,
//   minutes: 41,
//   seconds: 0,
//   milliseconds: 0,
// }
```

## Immutable operations

```ts
import { DateImmutable } from 'date-immutable'

const initialDate = DateImmutable.from(2023, 5, 4, 9, 41)

// { years?: number; months?: number; days?: number; hours?: number; minutes?: number; seconds?: number; milliseconds?: number }
const nextYear = initialDate.add({ years: 1 })
// {
//   year: 2024,
//   month: 5,
//   date: 4,
//   hours: 9,
//   minutes: 41,
//   seconds: 0,
//   milliseconds: 0,
// }

// Same as `add`
const previousYear = initialDate.subtract({ years: 1 })
// {
//   year: 2024,
//   month: 5,
//   date: 4,
//   hours: 9,
//   minutes: 41,
//   seconds: 0,
//   milliseconds: 0,
// }

// { year?: number; month?: number; date?: number; hours?: number; minutes?: number; seconds?: number; milliseconds?: number }
const anotherYear = initialDate.set({ year: 2025 })
// {
//   year: 2025,
//   month: 5,
//   date: 4,
//   hours: 9,
//   minutes: 41,
//   seconds: 0,
//   milliseconds: 0,
// }
```

## Converters

```ts
import { DateImmutable } from 'date-immutable'

const date = DateImmutable.from(/* … */)
date.toTimestamp() // Same as Date.getTime()
date.toString() // Same as Date.toString()
date.toISOString() // Same as Date.toISOString()
date.toJSON() // Same as Date.toJSON()
date.toDate() // Build a new Date object
date.toObject() // { year, month, date, hours, minutes, seconds, milliseconds }
```
