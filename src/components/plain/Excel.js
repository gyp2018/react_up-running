import React, { Component } from 'react';

class Excel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: props.data,
    };
  }

  render() {
    return (
      <div className="table-responsive-xl my-5">
        <h2>Plain Excel</h2>
        <table className="table">
          <thead>
            <tr>
              {this.props.headers.map((title, idx) => (
                <th key={idx}>{title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {this.state.data.map((row, rowIdx) => (
              <tr key={rowIdx}>
                {row.map((cell, idx) => (
                  <td key={idx}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

export default Excel;
