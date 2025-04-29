export interface DateImmutableObject {
  year?: number
  month?: number
  date?: number
  hours?: number
  minutes?: number
  seconds?: number
  milliseconds?: number
}

const DateImmutableEnumerableProperties: Array<keyof DateImmutable> = ['year', 'month', 'date', 'hours', 'minutes', 'seconds', 'milliseconds']

/**
 * Immutable date object with:
 * - Builders
 * - Immutable operations
 * - Destructuring
 * - Enumeration
 * - Month start from 1
 */
export class DateImmutable {
  private constructor(private readonly _date: Date) {
    // Hides _date from enumerable
    Object.defineProperty(this, '_date', { enumerable: false })

    // Make the getters of this instance enumerable
    DateImmutableEnumerableProperties.forEach((propertyName) => {
      const descriptor = Object.getOwnPropertyDescriptor(DateImmutable.prototype, propertyName)
      Object.defineProperty(this, propertyName, { ...descriptor, enumerable: true })
    })

    // Make this instance really immutable
    Object.seal(this)
    Object.freeze(this)
  }

  // #region Builders

  /**
   * Build a DateImmutable object from the current date and time
   */
  static now(): DateImmutable {
    return new DateImmutable(new Date())
  }

  /**
   * Build a DateImmutable object from UNIX timestamp (number of milliseconds since 1970-01-01T00:00:00.000 UTC)
   */
  static from(timestamp: number): DateImmutable

  /**
   * Build a DateImmutable object from an ISO string
   */
  static from(isoString: string): DateImmutable

  /**
   * Build a DateImmutable object from a JS Date object
   */
  static from(date: Date): DateImmutable

  /**
   * Build a DateImmutable object from an object
   */
  static from(object: DateImmutableObject): DateImmutable

  /**
   * Build a DateImmutable from  a list of parameters
   */
  static from(year: number, month: number, date?: number, hours?: number, minutes?: number, seconds?: number, milliseconds?: number): DateImmutable

  /**
   * Build a DateImmutable object from either a list of parameters, a UNIX timestamp, an ISO string, a JS Date object or a plain object
   */
  static from(
    ...args:
      | [year: number, month: number, date?: number, hours?: number, minutes?: number, seconds?: number, milliseconds?: number]
      | [timestamp: number]
      | [isoString: string]
      | [date: Date]
      | [object: DateImmutableObject]
  ): DateImmutable {
    const [value, month, ...other] = args
    if (typeof value === 'number' && typeof month === 'number') return new DateImmutable(new Date(value, month - 1, ...other))
    if (typeof value === 'number') return DateImmutable.fromTimestamp(value)
    if (typeof value === 'string') return DateImmutable.fromString(value)
    if (value instanceof Date) return DateImmutable.fromDate(value)
    if (typeof value === 'object') return DateImmutable.fromObject(value)
    throw new Error('Invalid parameters')
  }

  /**
   * Build a DateImmutable object from UNIX timestamp (number of milliseconds since 1970-01-01T00:00:00.000 UTC)
   */
  static fromTimestamp(milliseconds: number): DateImmutable {
    return new DateImmutable(new Date(milliseconds))
  }

  /**
   * Build a DateImmutable object from a JS Date object
   */
  static fromDate(date: Date): DateImmutable {
    return new DateImmutable(date)
  }

  /**
   * Build a DateImmutable object from a string (rely on Date.parse).
   * @see https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Date/parse
   *
   * ```markdown
   * ## Examples with dates
   * - `2023`        -> 2023-01-01, 00:00:00.000 UTC
   * - `2023-08`     -> 2023-08-01, 00:00:00.000 UTC
   * - `2023-08-04`  -> 2023-08-04, 00:00:00.000 UTC
   * - `2023/`       -> 2023-01-01, 00:00:00.000 local time
   * - `2023/08`     -> 2023-08-01, 00:00:00.000 local time
   * - `2023/08/04`  -> 2023-08-04, 00:00:00.000 local time
   *
   * ## Examples with dates and time
   * - `2023-08-04T01:02`              -> 2023-08-04, 01:02:00.000 local time
   * - `2023-08-04T01:02:03`           -> 2023-08-04, 01:02:03.000 local time
   * - `2023-08-04T01:02:03.004`       -> 2023-08-04, 01:02:03.004 local time
   * - `2023-08-04T01:02Z`             -> 2023-08-04, 01:02:00.000 UTC
   * - `2023-08-04T01:02:03Z`          -> 2023-08-04, 01:02:03.000 UTC
   * - `2023-08-04T01:02:03.004Z`      -> 2023-08-04, 01:02:03.004 UTC
   * - `2023-08-04T01:02:03.004+00:00` -> 2023-08-04, 01:02:03.004 UTC
   * - `2023-08-04T01:02:03.004-06:00` -> 2023-08-04, 01:02:03.004 GMT-0600
   * ```
   */
  static fromString(date: string): DateImmutable {
    return new DateImmutable(new Date(date))
  }

  /**
   * Build a DateImmutable object from plain object, undefined values are replaced by the locale date of 1970-01-01T00:00:00.000
   */
  static fromObject(object: DateImmutableObject): DateImmutable {
    return DateImmutable.from(object.year ?? 1970, object.month ?? 1, object.date ?? 1, object.hours ?? 0, object.minutes ?? 0, object.seconds ?? 0, object.milliseconds ?? 0)
  }

  // #endregion

  // #region Getters

  get year(): number {
    return this._date.getFullYear()
  }

  get month(): number {
    return this._date.getMonth() + 1
  }

  get date(): number {
    return this._date.getDate()
  }

  get day(): number {
    return this._date.getDay()
  }

  get hours(): number {
    return this._date.getHours()
  }

  get minutes(): number {
    return this._date.getMinutes()
  }

  get seconds(): number {
    return this._date.getSeconds()
  }

  get milliseconds(): number {
    return this._date.getMilliseconds()
  }

  get timezoneOffset(): number {
    return this._date.getTimezoneOffset()
  }

  // #endregion

  // #region Converters

  [Symbol.iterator](): Iterator<number> {
    const components = [this.year, this.month, this.date, this.hours, this.minutes, this.seconds, this.milliseconds]
    let index = 0
    return {
      next(): IteratorResult<number> {
        if (index < components.length) {
          return { value: components[index++], done: false }
        } else {
          return { value: undefined, done: true }
        }
      },
    }
  }

  toTimestamp(): number {
    return this._date.getTime()
  }

  toString(): string {
    return this._date.toString()
  }

  toISOString(): string {
    return this._date.toISOString()
  }

  toJSON(): string {
    return this._date.toJSON()
  }

  toDate(): Date {
    return new Date(this._date)
  }

  toObject(): object {
    const { year, month, date, hours, minutes, seconds, milliseconds } = this
    return { year, month, date, hours, minutes, seconds, milliseconds }
  }

  // #endregion

  // #region Operations

  set(object: { year?: number; month?: number; date?: number; hours?: number; minutes?: number; seconds?: number; milliseconds?: number }): DateImmutable {
    return DateImmutable.from(
      object.year ?? this.year,
      object.month ?? this.month,
      object.date ?? this.date,
      object.hours ?? this.hours,
      object.minutes ?? this.minutes,
      object.seconds ?? this.seconds,
      object.milliseconds ?? this.milliseconds,
    )
  }

  setDate(year: number, month = 1, date = 1): DateImmutable {
    return this.set({ year, month, date })
  }

  setTime(hours: number, minutes = 0, seconds = 0, milliseconds = 0): DateImmutable {
    return this.set({ hours, minutes, seconds, milliseconds })
  }

  add(duration: { years?: number; months?: number; days?: number; hours?: number; minutes?: number; seconds?: number; milliseconds?: number }): DateImmutable {
    const { year, month, date, hours, minutes, seconds, milliseconds } = this
    return DateImmutable.from(
      year + (duration.years ?? 0),
      month + (duration.months ?? 0),
      date + (duration.days ?? 0),
      hours + (duration.hours ?? 0),
      minutes + (duration.minutes ?? 0),
      seconds + (duration.seconds ?? 0),
      milliseconds + (duration.milliseconds ?? 0),
    )
  }

  substract(duration: { years?: number; months?: number; days?: number; hours?: number; minutes?: number; seconds?: number; milliseconds?: number }): DateImmutable {
    const { year, month, date, hours, minutes, seconds, milliseconds } = this
    return DateImmutable.from(
      year - (duration.years ?? 0),
      month - (duration.months ?? 0),
      date - (duration.days ?? 0),
      hours - (duration.hours ?? 0),
      minutes - (duration.minutes ?? 0),
      seconds - (duration.seconds ?? 0),
      milliseconds - (duration.milliseconds ?? 0),
    )
  }

  // #endregion
}

export const from = DateImmutable.from
export const fromDate = DateImmutable.fromDate
export const fromString = DateImmutable.fromString
export const fromObject = DateImmutable.fromObject
export const fromTimestamp = DateImmutable.fromTimestamp
