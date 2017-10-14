import React from 'react';
import { render } from 'react-dom';
import moment from 'moment';
import { getUnixTimestamp, cleanDate, cleanDateUtc, timezoneName } from './timeUtils'

const getInitialState = (currentTime) => ({
  unixTimestampInput: '',
  humanDateInputValue: '',
  dateInYourTimeZone: '',
  dateInUtc: '',
  unixTimeStamp: '',
  currentTime,
})

class UnixTimestampApp extends React.Component {
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
    localStorage.setItem('state', JSON.stringify(state))
  }

  getStateFromStorage() {
    return JSON.parse(localStorage.getItem('state'))
  }

  handleUnixInputDate({ target: { value } }) {
    this.setState({
      unixTimestampInput: value.slice(0, 10),
      humanDateInputValue: ''
    })
  }

  handleHumanInputDate({ target: { value } }) {
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
          <div id="unixTimeInput" className="form-group">
            <h6>Press "Convert" for the current time to be converted</h6>
            <input
              onChange={this.handleUnixInputDate}
              value={unixTimestampInput}
              type="number"
              className="form-control"
              placeholder={`Unix Timestamp eg: ${currentTime}`}
              min="-999999999999"
              max="999999999999"
              name="number"
              id="unixTimestampInput"
            />
          </div>
          <h5>or enter a date in any format</h5>
          <div className="form-group" id="humanReadableDate">
            <input
              onChange={this.handleHumanInputDate}
              value={humanDateInputValue}
              className="form-control"
              name="fulldate"
              type="text/number"
              id="fulldate"
              placeholder="eg: 01/01/1970 12:30 pm"
            />
          </div>
          <div id="buttonGroup">
            <p>
              <button onClick={this.onSubmit} id="submit" type="submit" className="btn btn-primary">Convert</button>
              <button onClick={this.resetForm} id="reset" type="reset" className="btn btn-warning">Reset</button>
            </p>
          </div>
        </form>
        <p><strong><span id="yourTz">{timezoneName + ': '}</span></strong><span className="cleanDate">{dateInYourTimeZone ? dateInYourTimeZone : 'Date will display here'}</span></p>
        <p><strong>UTC: </strong><span className="cleanDateUtc">{dateInUtc ? dateInUtc : 'Date will display here'}</span></p>
        <p><strong>Unix: </strong><span className="convertedDateUnix">{unixTimeStamp ? unixTimeStamp : 'Timestamp will display here'}</span></p>
      </div>
    );
  }
}

render(<UnixTimestampApp />, document.getElementById('app'));
