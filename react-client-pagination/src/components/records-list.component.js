import React, { Component } from "react";

// API service to retrieve records
import RecordDataService from "../services/record.service";

// CSS styles for form UI
import { styles } from "../css-common"
import { withStyles } from "@material-ui/core";

// pagination
import Pagination from "@material-ui/lab/Pagination";

// States select dropdown
// import SelectUSState from 'react-select-us-states';
import states from "../states.json";

// Utilize Component class to update properties and state
class RecordsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchName = this.onChangeSearchName.bind(this);
    this.onChangeCity = this.onChangeCity.bind(this);
    this.onChangeState = this.onChangeState.bind(this);
    this.onChangeZip = this.onChangeZip.bind(this);
    this.retrieveRecords = this.retrieveRecords.bind(this);
    this.searchCityState = this.searchCityState.bind(this);
    this.searchZip = this.searchZip.bind(this);
    this.commonSearch = this.commonSearch.bind(this);

    // pagination
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handlePageSizeChange = this.handlePageSizeChange.bind(this);

    // State to save and retrieve properties
    this.state = {
      records: [],
      currentRecord: '',
      currentIndex: -1,
      searchName: "",
      searchCity: "",
      searchState: "",
      searchZip: '',

      page: 1,
      count: 0,
      pageSize: 100,
      current_search: '',
      total_records: 0,
    };
    // change here for default page size
    this.pageSizes = [5, 10, 15];
  }
  // Call methods while loading the application
  componentDidMount() {
    // this.retrieveRecords();
  }

  // change properties when user gives input in Name field
  onChangeSearchName(e) {
    const searchName = e.target.value;

    this.setState({
      searchName: searchName,
      current_search: "ByName",
      // reset other fields
      searchCity: "",
      searchState: "",
      searchZip: "",
    });
  }

  // change properties when user gives input in City field
  onChangeCity(e) {
    const searchCity = e.target.value;

    this.setState({
      searchCity: searchCity,
      current_search: "ByCityState",

      // reset other fields
      searchName: "",
      searchZip: "",
    });
  }

  // change properties when user gives input in State field
  onChangeState(e) {
    const searchState = e.target.value;
    // const searchState = e;
    // console.log(searchState);

    this.setState({
      searchState: searchState,
      current_search: "ByCityState",

      // reset other fields
      searchName: "",
      searchZip: "",

    });
  }

  // change properties when user gives input in ZIP field
  onChangeZip(e) {
    const searchZip = e.target.value;

    this.setState({
      searchZip: searchZip,
      current_search: "ByZip",

      // reset other fields
      searchName: "",
      searchCity: "",
      searchState: "",

    });
  }

  // generate parameters mapping to forward request
  getRequestParams(searchName, page, pageSize) {
    let params = {};
    if (searchName) {
      params["school_name"] = searchName;
    }
    if (page) {
      params["page"] = page - 1;
    }
    if (pageSize) {
      params["size"] = pageSize;
    }
    return params;
  }

  // generate parameters mapping to forward request
  getRequestParams2(searchCity, searchState, page, pageSize) {
    let params = {};
    if (searchCity) {
      params["school_city"] = searchCity;
    }
    if (searchState) {
      params["school_state"] = searchState;
    }
    if (page) {
      params["page"] = page - 1;
    }
    if (pageSize) {
      params["size"] = pageSize;
    }
    return params;
  }

  // generate parameters mapping to forward request
  getRequestParams3(searchZip, page, pageSize) {
    let params = {};
    if (searchZip) {
      params["school_zip"] = searchZip;
    }
    if (page) {
      params["page"] = page - 1;
    }
    if (pageSize) {
      params["size"] = pageSize;
    }
    return params;
  }

  // Search using School Name
  retrieveRecords() {
    const { searchName, page, pageSize } = this.state;
    const params = this.getRequestParams(searchName, page, pageSize);

    RecordDataService.findByName(params)
      .then(response => {
        const { totalItems, records, totalPages } = response.data;

        this.setState({
          total_records: totalItems,
          current_search: "ByName",
          currentRecord: records,
          count: totalPages
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  // Search using either By City and State or By ZIP as selected by user
  commonSearch() {
    const { current_search } = this.state;
    if (current_search === "ByCityState") {
      this.searchCityState();
    }
    else if (current_search === "ByZip") {
      this.searchZip();
    }
    // else{this.searchCityState();}
  }

  // Search usign City and State
  searchCityState() {
    const { searchCity, searchState, page, pageSize } = this.state;
    const params = this.getRequestParams2(searchCity, searchState, page, pageSize);

    RecordDataService.findByCityState(params)
      .then(response => {
        const { totalItems, records, totalPages } = response.data;

        this.setState({
          total_records: totalItems,
          current_search: "ByCityState",
          currentRecord: records,
          count: totalPages
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  // Search using ZIP
  searchZip() {
    const { searchZip, page, pageSize } = this.state;
    const params = this.getRequestParams3(searchZip, page, pageSize);

    RecordDataService.findByZip(params)
      .then(response => {
        const { totalItems, records, totalPages } = response.data;

        this.setState({
          total_records: totalItems,
          current_search: "ByZip",
          currentRecord: records,
          count: totalPages
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  // pagination method to handle page changes
  handlePageChange(event, value) {
    this.setState(
      {
        page: value,
      },
      () => {
        if (this.state.current_search === "ByName") { this.retrieveRecords(); }
        else if (this.state.current_search === "ByCityState") { this.searchCityState(); }
        else if (this.state.current_search === "ByZip") { this.searchZip(); }
        // this.retrieveRecords();
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
        if (this.state.current_search === "ByName") { this.retrieveRecords(); }
        else if (this.state.current_search === "ByCityState") { this.searchCityState(); }
        else if (this.state.current_search === "ByZip") { this.searchZip(); }
        // this.retrieveRecords();
      }
    );
  }

  // Render the HTML block
  render() {
    const { searchCity, searchState, searchZip,
      currentRecord,
      page, count
    } = this.state;

    return (
      <div className="list row  main-section">
        <div className="container">
          <div className="row">
            <div className="col-sm">
              <div className="form-group">
                <label>City</label>
                <input type="text"
                  name="city"
                  id="city"
                  className="form-control"
                  placeholder="Enter City"
                  value={searchCity}
                  onChange={this.onChangeCity}
                />
              </div>
              <p> </p>
              <div className="form-group">
                <label>State</label>

                {/* Works on only abbreviation - Keep it for future */}
                {/* <div id="custom-select">
                  <SelectUSState id="State"  className="form-control" onChange={this.onChangeState} />
                </div> */}

                {/* Works on both abbreviation and full name of state - keeping it for now */}
                <div id="custom-select">
                  <select id="State" className="form-control" onChange={this.onChangeState}
                  value = {searchState}
                  >
                      {<option hidden value="" style={{color:'#ced4da !important'}}>Select State</option>}
                        {states.map(item => (
                        <option key={item.abbreviation} value={item.name}>
                          {item.name}
                        </option>
                      ))}

                  </select>
                </div>
                {/* Can use this instead of DropDown */}
                {/* <input type="text"
                  name="State"
                  id="State"
                  className="form-control"
                  placeholder="Select State"
                  value={searchState}
                  onChange={this.onChangeState}
                /> */}
              </div>
            </div>
            <div className="col-sm-2 sep">
              <span className="sepText">OR</span>
            </div>
            <div className="col-sm">
              <div className="form-group">
                <label>ZIP</label>
                <input type="text"
                  name="zip"
                  id="zip"
                  className="form-control"
                  placeholder="Enter ZIP"
                  value={searchZip}
                  onChange={this.onChangeZip}
                />
              </div>
            </div>
          </div>
        </div>
        <p> </p>
        <div className="text-center">
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="submit"
              onClick={this.commonSearch}
            >
              Search
                </button>
          </div>
        </div>

        {currentRecord !== '' &&
          <div className="col-md-12">
            <h4>Schools List</h4>
            {this.state.total_records !== 1 && <p>Total {this.state.total_records} records found.</p>}
            {this.state.total_records === 1 && <p>Only {this.state.total_records} record found.</p>}
            <table id="example1" className="table table-responsive">
              <thead>
                <tr>
                  {/* <th>Sr. No.</th> */}
                  <th>School Name</th>
                  {/* <th>URL</th> */}
                  <th>City</th>
                  <th>State</th>
                  <th>Zip</th>
                </tr>
              </thead>
              <tbody >
                {currentRecord.map((item, i) =>
                  <tr>
                    {/* <td>{i+1}</td> */}
                    <td><a href={item.URL_CtP} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                      {item.School_Name}
                    </a></td>
                    {/* <td><a href={item.URL_CtP} target = "_blank" rel = "noopener noreferrer">{item.URL_CtP} </a></td> */}
                    <td>{item.City}</td>
                    <td>{item.State}</td>
                    <td>{item.Zip}</td>
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
export default withStyles(styles)(RecordsList);
