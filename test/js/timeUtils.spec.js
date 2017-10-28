import { expect } from 'chai'
import { getUnixTimestamp, getDate, cleanDate, cleanDateUtc } from '../../src/js/timeUtils'

describe('timeUtils', () => {
  const JAN_FIRST_2017 = 1483246800
  const HUMAN_DATE = '01/01/2017'

  describe('getUnixTimestamp', () => {
    it('is a function', () => {
      expect(getUnixTimestamp).to.be.a('function')
    })

    it('takes a human readable date and returns a unix timestamp in local time', () => {
      const unixTimestamp = getUnixTimestamp(HUMAN_DATE)
      expect(unixTimestamp).to.equal(JAN_FIRST_2017)
    })

    it('throws an error for no input', () => {
      expect(() => getUnixTimestamp()).to.throw()
    })
    it('throws an error for invalid human date input', () => {
      expect(() => getUnixTimestamp('asdfasdf')).to.throw('Cannot parse date')
    })
  })

  describe('getDate', () => {
    it('is a function', () => {
      expect(getDate).to.be.a('function')
    })

    it('returns an instance of a Date object', () => {
      expect(getDate(JAN_FIRST_2017).toString()).to.equal('Sun Jan 01 2017 00:00:00 GMT-0500 (EST)')
    })
  })

  describe('cleanDate', () => {
    it('is a function', () => {
      expect(cleanDate).to.be.a('function')
    })

    it('turns a timestamp into a human date', () => {
      expect(cleanDate(JAN_FIRST_2017)).to.equal('Jan. 01, 2017 00:00:00')
    })

    it('throws an error if called without a timestamp', () => {
      expect(() => cleanDate()).to.throw('You must provide a timestamp')
    })
  })

  describe('cleanDateUtc', () => {
    it('is a function', () => {
      expect(cleanDateUtc).to.be.a('function')
    })

    it('turns a timestamp into a human date', () => {
      expect(cleanDateUtc(JAN_FIRST_2017)).to.equal('Jan. 01, 2017 05:00:00')
    })

    it('throws an error if called without a timestamp', () => {
      expect(() => cleanDateUtc()).to.throw('You must provide a timestamp')
    })
  })
});