import React from 'react';
var dateFormat = require('dateformat');

class DateLine extends React.Component {
  render() {
    const date = dateFormat(new Date(this.props.date), "dddd, mmmm dS, yyyy");
    return (
      <div>
        <p className="text-divider"><span>{date}</span></p>
      </div>
    );
  }
}

DateLine.defaultProps = {
  date: '',
};

export default DateLine;
