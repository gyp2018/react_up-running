import React, { Component } from 'react';

class Excel extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: props.data,
      column: null,
      descending: false,
    };

    this.sortHandler = this.sortHandler.bind(this);

  }

  sortHandler(e) {
    const column = e.target.cellIndex;
    const data = Array.from(this.state.data);
    const descending = this.state.column === column && !this.state.descending;
    data.sort((a, b) => {
      return descending
        ? (a[column] > b[column] ? 1 : -1)
        : (a[column] < b[column] ? 1 : -1);
    });
    this.setState({
      data,
      column,
      descending,
    });
  }

  render() {
    return (
      <table className="table">
        <thead onClick={this.sortHandler}>
          <tr>
          {
            this.props.headers.map((title, idx) => {
              if (this.state.column === idx) {
                title += this.state.descending ? '\u2191' : '\u2193'
              }
              return <th key={idx}>{title}</th>;
            })
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
