import React from 'react'
import { expect } from 'chai'
import { mount } from 'enzyme'
import sinon from 'sinon'
import moment from 'moment'
import { UnixTimestampApp, getInitialState } from '../../src/js/UnixTimestampApp'

describe('<UnixTimestampApp />', () => {
  let wrapper
  let sandbox
  const JAN_FIRST_2017 = 1483246800
  const HUMAN_DATE = '01/01/2017'

  beforeEach(() => {
    wrapper = mount(<UnixTimestampApp />)
    sandbox = sinon.sandbox.create()
    wrapper.find('#reset').simulate('click')
  })

  afterEach(() => {
    wrapper.unmount()
    sandbox.restore()
  })

  describe('basic DOM elements', () => {

    it('mounts', () => {
      expect(wrapper.find('.container')).to.be.ok
    })

    it('has a title', () => {
      expect(wrapper.find('.lead').text()).to.equal('Unix Timestamp Converter')
    })

    it('has a sub-title', () => {
      expect(wrapper.find('.sub-title').text()).to.equal('Press "Convert" for the current time to be converted')
    })

    it('has two inputs', () => {
      expect(wrapper.find('input').length).to.equal(2)
    })

    it('has two buttons', () => {
      expect(wrapper.find('button').length).to.equal(2)
    })

    it('has date results', () => {
      expect(wrapper.find('.cleanDate').length).to.equal(1)
      expect(wrapper.find('.cleanDateUtc').length).to.equal(1)
      expect(wrapper.find('.convertedDateUnix').length).to.equal(1)
    })
  })

  describe('Timestamp conversion', () => {
    it('converts unix timestamps to human readable dates', () => {
      const input = wrapper.find('#unixTimestampInput')
      const submitButton = wrapper.find('#submit')
      input.simulate('change', { target: { value: String(JAN_FIRST_2017) } })
      submitButton.simulate('click')
      expect(wrapper.find('.cleanDate').text()).to.equal('Jan. 01, 2017 00:00:00')
      expect(wrapper.find('.cleanDateUtc').text()).to.equal('Jan. 01, 2017 05:00:00')
      expect(wrapper.find('.convertedDateUnix').text()).to.equal(String(JAN_FIRST_2017))
    })
  })

  describe('Human date conversion', () => {
    it('converts human dates to unix timestamps', () => {
      const input = wrapper.find('#fulldate')
      const submitButton = wrapper.find('#submit')
      input.simulate('change', { target: { value: HUMAN_DATE } })
      submitButton.simulate('click')
      expect(wrapper.find('.cleanDate').text()).to.equal('Jan. 01, 2017 00:00:00')
      expect(wrapper.find('.cleanDateUtc').text()).to.equal('Jan. 01, 2017 05:00:00')
      expect(wrapper.find('.convertedDateUnix').text()).to.equal(String(JAN_FIRST_2017))
    })
  })

  describe('input behavior', () => {
    it('only allows only one input to have value at a time', () => {
      const humanReadableDate = wrapper.find('#fulldate')
      const unixTimestampInput = wrapper.find('#unixTimestampInput')

      expect(humanReadableDate.props().value).to.eq('')
      expect(unixTimestampInput.props().value).to.eq('')

      unixTimestampInput.simulate('change', { target: { value: '1' } })
      expect(unixTimestampInput.props().value).to.eq('1')
      expect(humanReadableDate.props().value).to.eq('')

      humanReadableDate.simulate('change', { target: { value: HUMAN_DATE } })
      expect(unixTimestampInput.props().value).to.eq('')
      expect(humanReadableDate.props().value).to.eq(HUMAN_DATE)

      unixTimestampInput.simulate('change', { target: { value: '1' } })
      expect(unixTimestampInput.props().value).to.eq('1')
      expect(humanReadableDate.props().value).to.eq('')
    })
  })

  describe('reset button behavior', () => {
    it('resets both inputs', () => {
      const humanReadableDate = wrapper.find('#fulldate')
      const unixTimestampInput = wrapper.find('#unixTimestampInput')
      const resetButton = wrapper.find('#reset')

      expect(humanReadableDate.props().value).to.eq('')
      expect(unixTimestampInput.props().value).to.eq('')

      unixTimestampInput.simulate('change', { target: { value: '1' } })
      resetButton.simulate('click')

      expect(humanReadableDate.props().value).to.eq('')
      expect(unixTimestampInput.props().value).to.eq('')

      humanReadableDate.simulate('change', { target: { value: HUMAN_DATE } })
      resetButton.simulate('click')

      expect(humanReadableDate.props().value).to.eq('')
      expect(unixTimestampInput.props().value).to.eq('')
    })

    it('resets date results', () => {
      const humanReadableDate = wrapper.find('#fulldate')
      const unixTimestampInput = wrapper.find('#unixTimestampInput')
      const resetButton = wrapper.find('#reset')
      const cleanDate = wrapper.find('.cleanDate')
      const cleanDateUtc = wrapper.find('.cleanDateUtc')
      const convertedDateUnix = wrapper.find('.convertedDateUnix')
      const submitButton = wrapper.find('#submit')

      expect(cleanDate.text()).to.equal('Date will display here')
      expect(cleanDateUtc.text()).to.equal('Date will display here')
      expect(convertedDateUnix.text()).to.equal('Timestamp will display here')

      unixTimestampInput.simulate('change', { target: { value: String(JAN_FIRST_2017) } })
      submitButton.simulate('click')

      expect(cleanDate.text()).to.equal('Jan. 01, 2017 00:00:00')
      expect(cleanDateUtc.text()).to.equal('Jan. 01, 2017 05:00:00')
      expect(convertedDateUnix.text()).to.equal(String(JAN_FIRST_2017))

      resetButton.simulate('click')

      expect(cleanDate.text()).to.equal('Date will display here')
      expect(cleanDateUtc.text()).to.equal('Date will display here')
      expect(convertedDateUnix.text()).to.equal('Timestamp will display here')

      humanReadableDate.simulate('change', { target: { value: HUMAN_DATE } })
      submitButton.simulate('click')

      expect(cleanDate.text()).to.equal('Jan. 01, 2017 00:00:00')
      expect(cleanDateUtc.text()).to.equal('Jan. 01, 2017 05:00:00')
      expect(convertedDateUnix.text()).to.equal(String(JAN_FIRST_2017))

      resetButton.simulate('click')

      expect(cleanDate.text()).to.equal('Date will display here')
      expect(cleanDateUtc.text()).to.equal('Date will display here')
      expect(convertedDateUnix.text()).to.equal('Timestamp will display here')

    })
  })

})