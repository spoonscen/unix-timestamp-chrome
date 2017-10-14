import React from 'react'
import { expect } from 'chai'
import { mount } from 'enzyme'
import sinon from 'sinon'
import UnixTimestampApp from '../../src/js/UnixTimestampApp'

sinon.spy(UnixTimestampApp.prototype, 'componentDidMount')
 
describe('<UnixTimestampApp />', () => {
  it('calls componentDidMount', () => {
    const wrapper = mount(<UnixTimestampApp />)
    expect(UnixTimestampApp.prototype.componentDidMount.calledOnce).to.equal(true)
  })
})