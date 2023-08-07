const assert = require('assert')
const DateImmutable = require('./dist/DateImmutable')

assert.deepStrictEqual(DateImmutable.default.from, DateImmutable.from)
assert.deepStrictEqual(DateImmutable.default.fromDate, DateImmutable.fromDate)
assert.deepStrictEqual(DateImmutable.default.fromString, DateImmutable.fromString)
assert.deepStrictEqual(DateImmutable.default.fromObject, DateImmutable.fromObject)
assert.deepStrictEqual(DateImmutable.default.fromTimestamp, DateImmutable.fromTimestamp)

DateImmutable.fromString()
