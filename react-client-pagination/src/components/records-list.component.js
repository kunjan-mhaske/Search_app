import React, { Component } from "react";
import RecordDataService from "../services/record.service";
import { Link } from "react-router-dom";

import { styles } from "../css-common"
import { TextField, Button, Grid, ListItem, withStyles } from "@material-ui/core";

// pagination
import Pagination from "@material-ui/lab/Pagination";

class RecordsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchName = this.onChangeSearchName.bind(this);
    this.onChangeCity = this.onChangeCity.bind(this);
    this.onChangeState = this.onChangeState.bind(this);
    this.onChangeZip = this.onChangeZip.bind(this);
    this.retrieveRecords = this.retrieveRecords.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveRecord = this.setActiveRecord.bind(this);
    this.removeAllRecords = this.removeAllRecords.bind(this);
    this.searchName = this.searchName.bind(this);
    this.searchCityState = this.searchCityState.bind(this);
    this.searchZip = this.searchZip.bind(this);

    // pagination
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handlePageSizeChange = this.handlePageSizeChange.bind(this);

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
      pageSize: 3,
    };
    // change here for default page size
    this.pageSizes = [3, 6, 9];
  }

  componentDidMount() {
    this.retrieveRecords();
  }

  onChangeSearchName(e) {
    const searchName = e.target.value;

    this.setState({
      searchName: searchName
    });
  }
  onChangeCity(e) {
    const searchCity = e.target.value;

    this.setState({
      searchCity: searchCity
    });
  }
  onChangeState(e) {
    const searchState = e.target.value;

    this.setState({
      searchState: searchState
    });
  }
  onChangeZip(e) {
    const searchZip = e.target.value;

    this.setState({
      searchZip: searchZip
    });
  }

  // pagination method 1
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
  // pagination method 2
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
  // pagination method 3
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


  retrieveRecords() {
    const { searchName, page, pageSize } = this.state;
    const params = this.getRequestParams(searchName, page, pageSize);
    // console.log('Params for retrievrecords:',params);

    RecordDataService.findByName(params)
      .then(response => {
        const { records, totalPages } = response.data;

        // this.setState({
        //   records: records,
        //   count: totalPages
        // });
        this.setState({
          currentRecord: records,
        });
        console.log('records:', this.state.currentRecord);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveRecords();
    this.setState({
      currentRecord: null,
      currentIndex: -1
    });
  }

  setActiveRecord(record, index) {
    this.setState({
      currentRecord: record,
      currentIndex: index
    });
  }

  removeAllRecords() {
    RecordDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchName() {
    RecordDataService.findByName(this.state.searchName)
      .then(response => {
        this.setState({
          records: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchCityState() {
    const { searchCity, searchState, page, pageSize } = this.state;
    const params = this.getRequestParams2(searchCity, searchState, page, pageSize);

    RecordDataService.findByCityState(params)
      .then(response => {
        const { records, totalPages } = response.data;

        // this.setState({
        //   records: records,
        //   count: totalPages
        // });
        // console.log(response.data);
        this.setState({
          currentRecord: records,
        });
        console.log('records:', this.state.currentRecord);
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchZip() {
    const { searchZip, page, pageSize } = this.state;
    const params = this.getRequestParams3(searchZip, page, pageSize);

    RecordDataService.findByZip(params)
      .then(response => {
        const { records, totalPages } = response.data;

        // this.setState({
        //   records: records,
        //   count: totalPages
        // });
        // console.log(response.data);
        this.setState({
          currentRecord: records,
        });
        console.log('records:', this.state.currentRecord);
      })
      .catch(e => {
        console.log(e);
      });
  }


  // pagination methods 2 and 3
  handlePageChange(event, value) {
    this.setState(
      {
        page: value,
      },
      () => {
        this.retrieveRecords();
      }
    );
  }

  handlePageSizeChange(event) {
    this.setState(
      {
        pageSize: event.target.value,
        page: 1
      },
      () => {
        this.retrieveRecords();
      }
    );
  }

  render() {
    const { classes } = this.props
    const { searchName, searchCity, searchState, searchZip,
      records, currentRecord, currentIndex,
      page, count, pageSize
    } = this.state;

    return (
      <div className="list row container main-section">
        <div className="col-md-12 flex">
          <div className="input-group mb-3">
            <input type="text" className="form-control"
              placeholder="Search by name"
              value={searchName}
              onChange={this.onChangeSearchName}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.retrieveRecords}
              >
                Search
              </button>
            </div>
          </div>

          <div className="input-group mb-6 margin-left-2">
            <input type="text" className="form-control"
              placeholder="Search by city"
              value={searchCity}
              onChange={this.onChangeCity}
            />
            <input type="text" className="form-control"
              placeholder="Search by state"
              value={searchState}
              onChange={this.onChangeState}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchCityState}
              >
                Search
              </button>
            </div>
          </div>

          <div className="input-group mb-3 margin-left-2">
            <input type="text" className="form-control"
              placeholder="Search by zip"
              value={searchZip}
              onChange={this.onChangeZip}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchZip}
              >
                Search
              </button>
            </div>
          </div>
        </div>

        {currentRecord != '' &&
         <div className="col-md-12">
          <h4>Schools List</h4>

          <table id="example1" className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>URL</th>
                <th>City</th>
                <th>State</th>
                <th>Zip</th>
              </tr>
            </thead>
            <tbody>
              {currentRecord.map((item, i) =>
                <tr>
                  <td>{item.School_Name}</td>
                  <td>{item.URL}</td>
                  <td>{item.City}</td>
                  <td>{item.State}</td>
                  <td>{item.Zip}</td>
                </tr>

              )}
            </tbody>
          </table>

           <div className="mt-3">
              {"Items per Page: "}
              <select onChange={this.handlePageSizeChange} value={pageSize}>
                {this.pageSizes.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>

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


        {/* Comment for FrontEnd developer:  */}
        {/* We are using this.retrieveRecords method for search using school name */}
        {/* For search using ZIP: use this.searchZip()   and for search using City+State: use this.searchCityState() */}
        {/* And create this.onChangeSearchZip, this.onChangeSearchCityAndState methods to set the state */}

        {/* <div className="col-md-6"> */}
          {/* <h4>Schools List</h4> */}

          {/* {records &&
            <div className="mt-3">
              {"Items per Page: "}
              <select onChange={this.handlePageSizeChange} value={pageSize}>
                {this.pageSizes.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>

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
          } */}

          {/* <ul className="list-group">
            {records &&
              records.map((record, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveRecord(record, index)}
                  key={index}
                >
                  {record.School_Name}
                </li>
              ))


            }
          </ul> */}
          {/* <Button
              className={`${classes.button} ${classes.removeAll}`}
              size="small"
              color="secondary"
              variant="contained"
              onClick={this.removeAllRecords}
            >
              Remove All
          </Button> */}
        {/* </div> */}

        {/* <Grid item md={8}>
          {currentRecord ? (
            <div className={classes.record}>
              <p> </p>
              <h4>Record</h4>
              <div className={classes.detail}>
                <label>
                  <strong>Name:</strong>
                </label>{" "}
                {currentRecord.School_Name}
              </div>

              <div className={classes.detail}>
                <label>
                  <strong>City:</strong>
                </label>{" "}
                {currentRecord.City}
              </div>

              <div className={classes.detail}>
                <label>
                  <strong>State:</strong>
                </label>{" "}
                {currentRecord.State}
              </div>

              <div className={classes.detail}>
                <label>
                  <strong>Zip:</strong>
                </label>{" "}
                {currentRecord.Zip}
              </div>

              <div className={classes.detail}>
                <label>
                  <strong>URL:</strong>
                </label>{" "}
                {<a href={currentRecord.URL}>Click here</a>}
              </div>

              <Link
                to={"/records/" + currentRecord.id}
                className={classes.edit}
              >
                Edit
              </Link>
            </div>
          ) : (
              <div>
                <br />
                <p className={classes.record}>Please click on a Record...</p>
              </div>
            )}
        </Grid> */}