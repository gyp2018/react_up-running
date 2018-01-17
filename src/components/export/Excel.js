import React, { Component } from 'react';

class Excel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: props.data,
      column: null,
      descending: false,
      edit: null,
      search: false,
    };

    this.sortHandler = this.sortHandler.bind(this);
    this.showEditor = this.showEditor.bind(this);
    this.save = this.save.bind(this);
    this.toggleSearch = this.toggleSearch.bind(this);
    this.search = this.search.bind(this);
    this.download = this.download.bind(this);
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

  toggleSearch() {
    if (this.state.search) {
      this.setState({
        data: this.preSearchData,
        search: false,
      });
      this.preSearchData = null;
    } else {
      this.preSearchData = this.state.data;
      this.setState({
        search: true,
      });
    }
  }

  search(e) {
    const needle = e.target.value.toLowerCase();
    if (!needle) {
      this.setState({
        data: this.preSearchData,
      });
      return;
    }
    const idx = e.target.dataset.idx;
    const searchData = this.preSearchData.filter(row => (
      row[idx].toString().toLowerCase().indexOf(needle) > -1
    ));
    this.setState({
      data: searchData,
    });
  }

  download(e) {
    const format = e.target.dataset.format;
    const contents = format === 'json'
      ? JSON.stringify(this.state.data)
      : this.state.data.reduce((result, row) => {
          return result
            + row.reduce((rowresult, cell, idx) => {
              return rowresult
                + '"'
                + cell.replace(/"/g, '""')
                + '"'
                + (idx < row.length - 1 ? ',' : '');
            }, '')
            + "\n";
        }, '');

    const URL = window.URL || window.webkitURL;
    const blob = new Blob([contents], {type: 'text/' + format});
    e.target.href = URL.createObjectURL(blob);
    e.target.download = 'data.' + format;
  }

  render() {
    return (
      <div className="table-responsive-xl my-5">
        <h2>Filter Excel</h2>
        {this.renderToolbar()}
        {this.renderTable()}
      </div>
    )
  }

  renderToolbar() {
    return (
      <div>
        <button
          type="button"
          className="btn btn-primary btn-sm m-1 float-left"
          onClick={this.toggleSearch}
        >
          search
        </button>
        <a
          href="data.json"
          role="button"
          className="btn btn-primary btn-sm m-1 float-left"
          data-format="json"
          onClick={this.download}
        >
          Export JSON
        </a>
        <a
          href="data.csv"
          role="button"
          className="btn btn-primary btn-sm m-1 float-left"
          data-format="csv"
          onClick={this.download}
        >
          Export CSV
        </a>
      </div>
    )
  }

  renderSearch() {
    if (!this.state.search) {
      return null;
    }
    return (
      <tr onChange={this.search}>
        {this.props.headers.map((ignore, idx) => (
          <td key={idx}>
            <input type="text" data-idx={idx} />
          </td>
        ))}
      </tr>
    )
  }

  renderTable() {
    return (
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
          {this.renderSearch()}
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
    )
  }
}

export default Excel;
