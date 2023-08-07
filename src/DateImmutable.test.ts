import DateImmutable from './DateImmutable'

describe('DateImmutable', () => {
  test('Builders', () => {
    expect(DateImmutable.from(2023, 8, 4, 1, 2, 3, 4).toDate()).toStrictEqual(new Date(2023, 7, 4, 1, 2, 3, 4))
    expect(DateImmutable.from(1691110923004).toDate()).toStrictEqual(new Date(1691110923004))
    expect(DateImmutable.from(new Date(2023, 7, 4, 1, 2, 3, 4)).toDate()).toStrictEqual(new Date(2023, 7, 4, 1, 2, 3, 4))
    expect(DateImmutable.from('2023-08-04T01:02:03.004Z').toDate()).toStrictEqual(new Date('2023-08-04T01:02:03.004Z'))
    expect(DateImmutable.from({ year: 2023, month: 8, date: 4, hours: 1, minutes: 2, seconds: 3, milliseconds: 4 }).toDate()).toStrictEqual(new Date(2023, 7, 4, 1, 2, 3, 4))
    expect(DateImmutable.from({}).toDate()).toStrictEqual(new Date(1970, 0, 1, 0, 0, 0, 0))
    expect(DateImmutable.from({ year: 2023 }).toDate()).toStrictEqual(new Date(2023, 0, 1, 0, 0, 0, 0))
    expect(DateImmutable.from({ year: 2023, month: 8 }).toDate()).toStrictEqual(new Date(2023, 7, 1, 0, 0, 0, 0))
    expect(DateImmutable.from({ year: 2023, month: 8, date: 4 }).toDate()).toStrictEqual(new Date(2023, 7, 4, 0, 0, 0, 0))
    expect(DateImmutable.from({ year: 2023, month: 8, date: 4, hours: 1 }).toDate()).toStrictEqual(new Date(2023, 7, 4, 1, 0, 0, 0))
    expect(DateImmutable.from({ year: 2023, month: 8, date: 4, hours: 1, minutes: 2 }).toDate()).toStrictEqual(new Date(2023, 7, 4, 1, 2, 0, 0))
    expect(DateImmutable.from({ year: 2023, month: 8, date: 4, hours: 1, minutes: 2, seconds: 3 }).toDate()).toStrictEqual(new Date(2023, 7, 4, 1, 2, 3, 0))
    expect(DateImmutable.from({ year: 2023, month: 8, date: 4, hours: 1, minutes: 2, seconds: 3, milliseconds: 4 }).toDate()).toStrictEqual(new Date(2023, 7, 4, 1, 2, 3, 4))
    expect(DateImmutable.now().toTimestamp()).toBeLessThanOrEqual(new Date().getTime())
  })
  test('Destructuring', () => {
    const { year, month, date, hours, minutes, seconds, milliseconds, timezoneOffset } = DateImmutable.from(2023, 8, 4, 1, 2, 3, 4)
    expect(year).toBe(2023)
    expect(month).toBe(8)
    expect(date).toBe(4)
    expect(hours).toBe(1)
    expect(minutes).toBe(2)
    expect(seconds).toBe(3)
    expect(milliseconds).toBe(4)
    expect(timezoneOffset).toBe(new Date().getTimezoneOffset())
  })
  test('Enumerable', () => {
    expect({ ...DateImmutable.from(2023, 8, 4, 1, 2, 3, 4) }).toStrictEqual({
      year: 2023,
      month: 8,
      date: 4,
      hours: 1,
      minutes: 2,
      seconds: 3,
      milliseconds: 4,
    })
  })
  test('Getters', () => {
    const date = DateImmutable.from(2023, 8, 4, 1, 2, 3, 4)
    expect(date.year).toBe(2023)
    expect(date.month).toBe(8)
    expect(date.date).toBe(4)
    expect(date.day).toBe(5)
    expect(date.hours).toBe(1)
    expect(date.minutes).toBe(2)
    expect(date.seconds).toBe(3)
    expect(date.milliseconds).toBe(4)
    expect(date.timezoneOffset).toBe(new Date().getTimezoneOffset())
  })
  test('set', () => {
    const initial = DateImmutable.from(2023, 8, 4, 1, 2, 3, 4)
    expect(initial.set({ year: 2025 }).toDate()).toStrictEqual(new Date(2025, 7, 4, 1, 2, 3, 4))
    expect(initial.set({ month: 10 }).toDate()).toStrictEqual(new Date(2023, 9, 4, 1, 2, 3, 4))
    expect(initial.set({ date: 6 }).toDate()).toStrictEqual(new Date(2023, 7, 6, 1, 2, 3, 4))
    expect(initial.set({ hours: 3 }).toDate()).toStrictEqual(new Date(2023, 7, 4, 3, 2, 3, 4))
    expect(initial.set({ minutes: 4 }).toDate()).toStrictEqual(new Date(2023, 7, 4, 1, 4, 3, 4))
    expect(initial.set({ seconds: 5 }).toDate()).toStrictEqual(new Date(2023, 7, 4, 1, 2, 5, 4))
    expect(initial.set({ milliseconds: 6 }).toDate()).toStrictEqual(new Date(2023, 7, 4, 1, 2, 3, 6))
    expect(initial.toDate()).toStrictEqual(new Date(2023, 7, 4, 1, 2, 3, 4))
  })
  test('add', () => {
    const initial = DateImmutable.fromString('2023-08-04T01:02:03.004Z')
    expect(initial.add({ years: 2 }).toISOString()).toBe('2025-08-04T01:02:03.004Z')
    expect(initial.add({ months: 2 }).toISOString()).toBe('2023-10-04T01:02:03.004Z')
    expect(initial.add({ days: 2 }).toISOString()).toBe('2023-08-06T01:02:03.004Z')
    expect(initial.add({ hours: 2 }).toISOString()).toBe('2023-08-04T03:02:03.004Z')
    expect(initial.add({ minutes: 2 }).toISOString()).toBe('2023-08-04T01:04:03.004Z')
    expect(initial.add({ seconds: 2 }).toISOString()).toBe('2023-08-04T01:02:05.004Z')
    expect(initial.add({ milliseconds: 2 }).toISOString()).toBe('2023-08-04T01:02:03.006Z')
    expect(initial.toISOString()).toBe('2023-08-04T01:02:03.004Z')
  })
  test('substract', () => {
    const initial = DateImmutable.fromString('2023-08-04T01:02:03.004Z')
    expect(initial.substract({ years: 2 }).toISOString()).toBe('2021-08-04T01:02:03.004Z')
    expect(initial.substract({ months: 2 }).toISOString()).toBe('2023-06-04T01:02:03.004Z')
    expect(initial.substract({ days: 2 }).toISOString()).toBe('2023-08-02T01:02:03.004Z')
    expect(initial.substract({ hours: 2 }).toISOString()).toBe('2023-08-03T23:02:03.004Z')
    expect(initial.substract({ minutes: 2 }).toISOString()).toBe('2023-08-04T01:00:03.004Z')
    expect(initial.substract({ seconds: 2 }).toISOString()).toBe('2023-08-04T01:02:01.004Z')
    expect(initial.substract({ milliseconds: 2 }).toISOString()).toBe('2023-08-04T01:02:03.002Z')
    expect(initial.toISOString()).toBe('2023-08-04T01:02:03.004Z')
  })
  test('Converters', () => {
    const date = DateImmutable.fromString('2023-08-04T01:02:03.004Z')
    expect(date.toTimestamp()).toBe(1691110923004)
    expect(date.toString()).toBe('2023-08-04T01:02:03.004Z')
    expect(date.toISOString()).toBe('2023-08-04T01:02:03.004Z')
    expect(date.toJSON()).toBe('2023-08-04T01:02:03.004Z')
    expect(date.toDate()).toBeInstanceOf(Date)
    expect(date.toDate().getTime()).toBe(new Date('2023-08-04T01:02:03.004Z').getTime())
    expect(DateImmutable.from(2023, 8, 4, 1, 2, 3, 4).toObject()).toStrictEqual({
      year: 2023,
      month: 8,
      date: 4,
      hours: 1,
      minutes: 2,
      seconds: 3,
      milliseconds: 4,
    })
  })
})
