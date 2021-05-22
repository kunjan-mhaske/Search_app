import React, { Component } from "react";
import RecordDataService from "../services/record.service";
// import { Link } from "react-router-dom";

import { styles } from "../css-common"
// import { TextField, Button, Grid, ListItem, withStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/core";

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
    // this.refreshList = this.refreshList.bind(this);
    // this.setActiveRecord = this.setActiveRecord.bind(this);
    // this.removeAllRecords = this.removeAllRecords.bind(this);
    // this.searchName = this.searchName.bind(this);
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
      pageSize: 5,
      current_search: '',
      total_records: 0,
    };
    // change here for default page size
    this.pageSizes = [5, 10, 15];
  }

  componentDidMount() {
    // this.retrieveRecords();
  }

  onChangeSearchName(e) {
    const searchName = e.target.value;

    this.setState({
      searchName: searchName,

      // reset other fields
      searchCity: "",
      searchState: "",
      searchZip:"",
    });
  }
  onChangeCity(e) {
    const searchCity = e.target.value;

    this.setState({
      searchCity: searchCity,

      // reset other fields
      searchName: "",
      searchZip:"",
    });
  }
  onChangeState(e) {
    const searchState = e.target.value;

    this.setState({
      searchState: searchState,

      // reset other fields
      searchName: "",
      searchZip:"",
      
    });
  }
  onChangeZip(e) {
    const searchZip = e.target.value;

    this.setState({
      searchZip: searchZip,

      // reset other fields
      searchName: "",
      searchCity:"",
      searchState: "",

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

  // refreshList() {
  //   this.retrieveRecords();
  //   this.setState({
  //     currentRecord: null,
  //     currentIndex: -1
  //   });
  // }

  // setActiveRecord(record, index) {
  //   this.setState({
  //     currentRecord: record,
  //     currentIndex: index
  //   });
  // }

  // removeAllRecords() {
  //   RecordDataService.deleteAll()
  //     .then(response => {
  //       console.log(response.data);
  //       this.refreshList();
  //     })
  //     .catch(e => {
  //       console.log(e);
  //     });
  // }

  // searchName() {
  //   const { searchName, page, pageSize } = this.state;
  //   const params = this.getRequestParams(searchName, page, pageSize);

  //   // RecordDataService.findByName(this.state.searchName)
  //   RecordDataService.findByName(params)
  //     .then(response => {
  //       this.setState({
  //         records: response.data,
  //         count: totalPages
  //       });
  //       console.log(response.data);
  //     })
  //     .catch(e => {
  //       console.log(e);
  //     });
  // }

  
  retrieveRecords() {
    const { searchName, page, pageSize } = this.state;
    const params = this.getRequestParams(searchName, page, pageSize);
    // console.log('Params for retrievrecords:',params);
    
    RecordDataService.findByName(params)
      .then(response => {
        const { totalItems, records, totalPages } = response.data;

        // this.setState({
        //   records: records,
        //   count: totalPages
        // });
        this.setState({
          total_records: totalItems,
          current_search: "ByName",
          currentRecord: records,
          count: totalPages
        });
        // console.log('records:', this.state.currentRecord);
        // console.log("retrieveRecords", this.state.current_search);
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
        const { totalItems, records, totalPages } = response.data;

        // this.setState({
        //   records: records,
        //   count: totalPages
        // });
        // console.log(response.data);
        this.setState({
          total_records: totalItems,
          current_search: "ByCityState",
          currentRecord: records,
          count: totalPages
        });
        // console.log('records:', this.state.currentRecord);
        // console.log(response.data);
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
        const { totalItems, records, totalPages } = response.data;

        // this.setState({
        //   records: records,
        //   count: totalPages
        // });
        // console.log(response.data);
        this.setState({
          total_records: totalItems,
          current_search: "ByZip",
          currentRecord: records,
          count: totalPages
        });
        // console.log('records:', this.state.currentRecord);
        // console.log(response.data);
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
        if(this.state.current_search === "ByName"){this.retrieveRecords();}
        else if(this.state.current_search === "ByCityState"){this.searchCityState();}
        else if(this.state.current_search === "ByZip"){this.searchZip();}
        // this.retrieveRecords();
        // console.log("pageChange", this.state.current_search);
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
        if(this.state.current_search === "ByName"){this.retrieveRecords();}
        else if(this.state.current_search === "ByCityState"){this.searchCityState();}
        else if(this.state.current_search === "ByZip"){this.searchZip();}
        // this.retrieveRecords();
        // console.log("pagesizeChange", this.state.current_search);
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
          <div className="input-group mb-4" style={{padding:20}}>
            Search by Name
            <input type="text" className="form-control"
              placeholder="Enter School Name"
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
          <div className="input-group mb-4" style={{padding:20,borderLeft:1, borderLeftStyle:"solid",borderRight:1, borderRightStyle:"solid", borderColor: "black"}}>
            <p style={{height: "2rem"}}>Search by City and State </p>
            <br></br>
              <input type="text" className="form-control"
                placeholder="Enter City"
                value={searchCity}
                onChange={this.onChangeCity}
              />
            
            <input type="text" className="form-control"
              placeholder="Enter State (NY, NJ, etc.)"
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

          <div className="input-group mb-4" style={{padding:20}}>
            Search by ZIP
            <input type="text" className="form-control"
              placeholder="Enter ZIP"
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

        {currentRecord !== '' &&
         <div className="col-md-12">
          <h4>Schools List</h4>
          <p>Total {this.state.total_records} records found.</p>
          <table id="example1" className="table table-bordered table-striped">
            <thead>
              <tr>
                {/* <th>Sr. No.</th> */}
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
                  {/* <td>{i+1}</td> */}
                  <td>{item.School_Name}</td>
                  <td><a href={"https://"+item.URL} target = "_blank" rel = "noopener noreferrer">{item.URL} </a></td>
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