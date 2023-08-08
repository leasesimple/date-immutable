const assert = require('assert')
const dateImmutable = require('./dist/DateImmutable')
const { DateImmutable, from, fromTimestamp, fromString, fromDate, fromObject } = dateImmutable

assert.deepStrictEqual(DateImmutable.from, from)
assert.deepStrictEqual(DateImmutable.fromDate, fromDate)
assert.deepStrictEqual(DateImmutable.fromString, fromString)
assert.deepStrictEqual(DateImmutable.fromObject, fromObject)
assert.deepStrictEqual(DateImmutable.fromTimestamp, fromTimestamp)

assert.deepStrictEqual(DateImmutable.from(0).toDate(), new Date(0))
