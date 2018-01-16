import React, { Component } from 'react';

class Excel extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: props.data
    };

    this.sortHandler = this.sortHandler.bind(this);

  }

  sortHandler(e) {
    const column = e.target.cellIndex;
    const data = Array.from(this.state.data);
    data.sort((a, b) => (a[column] > b[column] ? 1 : -1));
    this.setState({
      data: data,
    });
  }

  render() {
    return (
      <table>
        <thead onClick={this.sortHandler}>
          <tr>
          {
            this.props.headers.map((title, idx) => (
              <th key={idx}>{title}</th>
            ))
          }
          </tr>
        </thead>
        <tbody>
          {
            this.state.data.map((row, idx) => (
              <tr key={idx}>
                {
                  row.map((cell, idx) => (
                    <td key={idx}>{cell}</td>
                  ))
                }
              </tr>
            ))
          }
        </tbody>
      </table>
    )
  }
}

export default Excel;
