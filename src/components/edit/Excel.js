import React, { Component } from 'react';

class Excel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: props.data,
      column: null,
      descending: false,
      edit: null,
    };

    this.sortHandler = this.sortHandler.bind(this);
    this.showEditor = this.showEditor.bind(this);
    this.save = this.save.bind(this);
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

  showEditor(e) {
    this.setState({
      edit: {
        row: parseInt(e.target.dataset.row, 10),
        cell: e.target.cellIndex,
      }
    });
  }

  save(e) {
    e.preventDefault();
    const input = e.target.firstChild;
    const data = this.state.data.slice();
    data[this.state.edit.row][this.state.edit.cell] = input.value;

    this.setState({
      edit: null,
      data: data,
    })
  }

  render() {
    return (
      <div className="table-responsive-xl my-5">
        <h2>Edit Excel</h2>
        <table className="table">
          <thead onClick={this.sortHandler}>
            <tr>
              {this.props.headers.map((title, idx) => {
                if (this.state.column === idx) {
                  title += this.state.descending ? '\u2191' : '\u2193'
                }
                return <th key={idx}>{title}</th>;
              })}
            </tr>
          </thead>
          <tbody onDoubleClick={this.showEditor}>
            {this.state.data.map((row, rowIdx) => (
              <tr key={rowIdx}>
                {row.map((cell, idx) => {
                  let content = cell;
                  const edit = this.state.edit;
                  if (edit && edit.row === rowIdx && edit.cell === idx) {
                    content = (
                      <form onSubmit={this.save}>
                        <input type="text" defaultValue={content} />
                      </form>
                    )
                  }
                  return <td key={idx} data-row={rowIdx}>{content}</td>;
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

export default Excel;
