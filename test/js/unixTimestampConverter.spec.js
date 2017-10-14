import { expect } from 'chai'
import { getUnixTimestamp } from '../../src/js/unixTimestampConverter'

describe('unixTimestampConverter', () => {
  describe('getUnixTimestamp', () => {
    it('is a function', () => {
      expect(getUnixTimestamp).to.be.a('function')
    })
  })
});