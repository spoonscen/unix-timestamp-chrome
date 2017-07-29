import React from 'react';
import {render} from 'react-dom';
import moment from 'moment';
import {getUnixTimestamp, cleanDate, cleanDateUtc} from './unixTimestampConverter'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      unixTimestampInput: '',
      humanDateInputValue: '',
      dateInYourTimeZone: '',
      dateInUtc: '',
      unixTimeStamp: ''
    }
    this.handleUnixInputDate = this.handleUnixInputDate.bind(this)
    this.handleHumanInputDate = this.handleHumanInputDate.bind(this)
    this.resetForm = this.resetForm.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  handleUnixInputDate(event) {
    this.setState({unixTimestampInput: event.target.value});
  }

  handleHumanInputDate(event) {
    this.setState({humanDateInputValue: event.target.value});
  }

  resetForm() {
    this.setState({
      unixTimestampInput: '',
      humanDateInputValue: '',
      dateInYourTimeZone: '',
      dateInUtc: '',
      unixTimeStamp: ''
    });
  }

  onSubmit(event) {
    event.preventDefault()
    const {unixTimestampInput, humanDateInputValue} = this.state
    const bothInputsEmpty = unixTimestampInput === '' && humanDateInputValue === ''
    const unixTimestampInputValue = bothInputsEmpty ? moment().unix() : unixTimestampInput
    this.setState({
      dateInYourTimeZone: cleanDate(unixTimestampInputValue),
      dateInUtc: cleanDateUtc(unixTimestampInputValue),
      unixTimeStamp: unixTimestampInputValue
    })
  }


  render () {
    const {
      humanDateInputValue,
      unixTimestampInput,
      dateInYourTimeZone,
      dateInUtc,
      unixTimeStamp
    } = this.state

    return (
      <div className="container">
    		<h1 className="lead">Unix Timestamp Converter</h1>
    		<form id="convertDateForm" className="form-inline">
    			<div id="unixTimeInput" className="form-group">
    				<h6>Press "Convert" for the current time to be converted</h6>
    				<input onChange={this.handleUnixInputDate}value={unixTimestampInput} type="number" className="form-control" placeholder="Unix Timestamp eg:" min="-999999999999" max="999999999999" name="number"
    				 id="unixTimestampInput" />
    			</div>
    			<h5>or enter a date in any format</h5>
    			<div className="form-group" id="humanReadableDate">
    				<input onChange={this.handleHumanInputDate} value={humanDateInputValue} className="form-control" name="fulldate" type="text/number" id="fulldate" placeholder="eg: 01/01/1970 12:30 pm" />
    			</div>
    			<div id="buttonGroup">
    				<p>
    					<button onClick={this.onSubmit} id="submit" type="submit" className="btn btn-primary">Convert</button>
    					<button onClick={this.resetForm} id="reset" type="reset" className="btn btn-warning">Reset</button>
    				</p>
    			</div>
    		</form>
    		<p><strong><span id="yourTz">Your Timezone: </span></strong><span className="cleanDate">{dateInYourTimeZone ? dateInYourTimeZone : 'Date will display here'}</span></p>
    		<p><strong>UTC: </strong><span className="cleanDateUtc">{dateInUtc ? dateInUtc : 'Date will display here'}</span></p>
    		<p><strong>Unix: </strong><span className="convertedDateUnix">{unixTimeStamp ? unixTimeStamp : 'Timestamp will display here'}</span></p>
    	</div>
    );
  }
}

render(<App/>, document.getElementById('app'));
