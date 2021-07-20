import React, { Component } from "react";

// API service to retrieve records
import RecordDataService from "../services/np-records.service";

// CSS styles for UI
import { styles } from "../css-common";
import { withStyles } from "@material-ui/core";

// pagination
import Pagination from "@material-ui/lab/Pagination";


class NonProfitRecords extends Component {
  constructor(props) {
    super(props);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handlePageSizeChange = this.handlePageSizeChange.bind(this);
    this.onChangeSearchName = this.onChangeSearchName.bind(this);
    this.searchByName = this.searchByName.bind(this);

    // State to save and retrieve properties
    this.state = {
      records: [],
      currentRecord: '',
      searchName: "",
      searchCity: "",
      searchState: "",
      searchZip: '',
      searchCause: "",
      searchEthnic: "",

      page: 1,
      count: 0,
      pageSize: 100,
      total_records: 0,
      displayFilters: false
    };
  }
  // Call methods while loading the application
  componentDidMount() {

  }

  // pagination method to handle page changes
  handlePageChange(event, value) {
    this.setState(
      {
        page: value,
      },
      () => {
        this.searchByName();
      }
    );
  }

  // pagination method to handle size of retrieved records per page
  handlePageSizeChange(event) {
    this.setState(
      {
        pageSize: event.target.value,
        page: 1
      },
      () => {
        this.searchByName();
      }
    );
  }

  onChangeSearchName(e) {
    const name = e.target.value;
    this.setState({
      searchName: name,
    });
  }

  getReqParams_Name(name, page, pageSize) {
    let params = {};
    if (name) {
      params["np_name"] = name;
    }
    if (page) {
      params["page"] = page - 1;
    }
    if (pageSize) {
      params["size"] = pageSize;
    }
    return params;
  }

  searchByName() {
    const { searchName, page, pageSize } = this.state;
    const params = this.getReqParams_Name(searchName, page, pageSize);

    RecordDataService.findByName(params)
      .then(response => {
        const { totalItems, records, totalPages } = response.data;

        this.setState({
          total_records: totalItems,
          currentRecord: records,
          count: totalPages
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  handlerDisplayFilters() {
    this.setState({ displayFilters: true });
  }
  // render the HTML block
  render() {
    const { searchName, currentRecord, page, count, displayFilters } = this.state;

    return (
      <div className="list row main-section">
        <button className="btn btn-outline-secondary filter-btn"
          type="submit" onClick={this.handlerDisplayFilters}>
            Filter
          </button>
        <div className="column" className="container">
          <div className="row">
            <div className="form-group">
              <label>Non-Profit Name</label>
              <input type="text" name="npname" id="npname"
                className="form-control" placeholder="Enter name"
                value={searchName} onChange={this.onChangeSearchName} />
            </div>
          </div>
        </div>
        <p></p>
        <div className="text-right">
          <div className="input-group-append">
            <button className="btn btn-outline-secondary"
              type="submit" onClick={this.searchByName}>
              Search
            </button>
          </div>
        </div>

        {displayFilters === true &&
          <div>
            <div className="row d-content">
              <div className="form-group width-auto">
                <label>State</label>
                <input type="text" name="npname" id="npname"
                  className="form-control" placeholder="Enter state" />
              </div>
              <div className="form-group width-auto">
                <label>Cause</label>
                <input type="text" name="npname" id="npname"
                  className="form-control" placeholder="Enter cause" />
              </div>
              <div className="form-group width-auto">
                <label>Ethnic</label>
                <input type="text" name="npname" id="npname"
                  className="form-control" placeholder="Enter ethnic" />
              </div>
            </div>
            <div className="text-right">
              <a> Apply </a> &nbsp;
                <a> Reset </a>
            </div>
          </div>
        }
        {currentRecord !== '' &&
          <div className="col-md-12">
            <h4>Non-Profits List</h4>
            {this.state.total_records !== 1 && <p>Total {this.state.total_records} records found.</p>}
            {this.state.total_records === 1 && <p>Only {this.state.total_records} record found.</p>}
            <table id="example1" className="table table-responsive">
              <thead>
                <tr>
                  {/* <th>Sr. No.</th> */}
                  <th>Non Profit</th>
                  {/* <th>URL</th> */}
                  <th>City</th>
                  <th>State</th>
                  <th>Zip</th>
                  <th>Cause</th>
                  <th>Ethnic</th>
                </tr>
              </thead>
              <tbody >
                {currentRecord.map((item, i) =>
                  <tr>
                    {/* <td>{i+1}</td> */}
                    <td><a href={item.url_ctp} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                      {item.np_name}
                    </a></td>
                    <td>{item.city}</td>
                    <td>{item.state}</td>
                    <td>{item.zip}</td>
                    <td>{item.cause}</td>
                    <td>{item.ethnic}</td>
                  </tr>
                )}
              </tbody>
            </table>

            <div className="mt-3">

              <Pagination
                className="my-3"
                count={count}
                page={page}
                siblingCount={1}
                boundaryCount={1}
                variant="outlined"
                shape="rounded"
                onChange={this.handlePageChange}
              />
            </div>
          </div>
        }
      </div>
    );
  }
}
export default withStyles(styles)(NonProfitRecords);