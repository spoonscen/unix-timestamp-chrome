import React from 'react';
import { render } from 'react-dom';
import moment from 'moment';
import { getUnixTimestamp, cleanDate, cleanDateUtc, timezoneName } from './timeUtils'
import { ResultGroup } from './components/ResultGroup'
import { ButtonGroup } from './components/ButtonGroup'
import { InputGroup } from './components/InputGroup'

export const getInitialState = (currentTime) => ({
  unixTimestampInput: '',
  humanDateInputValue: '',
  dateInYourTimeZone: '',
  dateInUtc: '',
  unixTimeStamp: '',
  currentTime,
})

export class UnixTimestampApp extends React.Component {
  constructor() {
    super()
    const prevState = this.getStateFromStorage()
    this.state = prevState ? prevState : getInitialState(moment().unix())
    this.handleUnixInputDate = this.handleUnixInputDate.bind(this)
    this.handleHumanInputDate = this.handleHumanInputDate.bind(this)
    this.resetForm = this.resetForm.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  setStateInStorage(state = this.state) {
    window.localStorage.setItem('state', JSON.stringify(state))
  }

  getStateFromStorage() {
    return JSON.parse(window.localStorage.getItem('state'))
  }

  handleUnixInputDate({ target: { value = '' } }) {
    this.setState({
      unixTimestampInput: value.slice(0, 10),
      humanDateInputValue: ''
    })
  }

  handleHumanInputDate({ target: { value = '' } }) {
    this.setState({
      humanDateInputValue: value,
      unixTimestampInput: ''
    })
  }

  resetForm() {
    const initialState = getInitialState(moment().unix())
    this.setState(initialState);
    this.setStateInStorage(initialState)
  }

  onSubmit(event) {
    event.preventDefault()
    const { unixTimestampInput, humanDateInputValue } = this.state
    const bothInputsEmpty = unixTimestampInput === '' && humanDateInputValue === ''

    const unixTimestampInputValue = bothInputsEmpty ? moment().unix() : unixTimestampInput
    const parsedDate = Date.parse(humanDateInputValue)

    if (!parsedDate) {
      this.setState({ humanDateInputValue: '' })
    }
    const newState = Object.assign({}, this.state, {
      dateInYourTimeZone: humanDateInputValue
        ? cleanDate(getUnixTimestamp(humanDateInputValue))
        : cleanDate(unixTimestampInputValue),
      dateInUtc: humanDateInputValue
        ? cleanDateUtc(getUnixTimestamp(humanDateInputValue))
        : cleanDateUtc(unixTimestampInputValue),
      unixTimeStamp: humanDateInputValue
        ? getUnixTimestamp(humanDateInputValue)
        : unixTimestampInputValue
    })
    this.setState(newState)
    this.setStateInStorage(newState)
  }

  componentDidMount() {
    const oneSecond = 1000
    const setPlaceholderText = (timestamp) => this.setState({ currentTime: timestamp })
    setInterval(() => setPlaceholderText(moment().unix()), oneSecond)
  }


  render() {
    const {
      humanDateInputValue,
      unixTimestampInput,
      dateInYourTimeZone,
      dateInUtc,
      unixTimeStamp,
      currentTime,
    } = this.state

    return (
      <div className="container">
        <h1 className="lead">Unix Timestamp Converter</h1>
        <form id="convertDateForm" className="form-inline">
          <InputGroup
            unixTimestampOnChange={this.handleUnixInputDate}
            unixTimestampVal={unixTimestampInput}
            currentTime={currentTime}
            humanDateOnChange={this.handleHumanInputDate}
            humanDateVal={humanDateInputValue}
          />
          <ButtonGroup submitFn={this.onSubmit} resetFn={this.resetForm} />
        </form>
        <ResultGroup
          timezoneName={timezoneName}
          dateInYourTimeZone={dateInYourTimeZone}
          dateInUtc={dateInUtc}
          unixTimeStamp={unixTimeStamp}
        />
      </div>
    );
  }
}

