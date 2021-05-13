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
      currentRecord: null,
      currentIndex: -1,
      searchName: "",
      searchCity: "",
      searchState: "",
      searchZip: 0,

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

  // pagination method 1
  getRequestParams(searchName, page, pageSize){
      let params = {};
      if (searchName){
          params["school_name"] = searchName;
      }
      if (page){
          params["page"] = page-1;
      }
      if (pageSize){
          params["size"] = pageSize;
      }
      return params;
  }


  retrieveRecords() {
    const { searchName, page, pageSize } = this.state;
    const params = this.getRequestParams(searchName, page, pageSize);

    RecordDataService.findByName(params)
      .then(response => {
        const { records, totalPages } = response.data;

        this.setState({
          records: records,
          count: totalPages
        });
        console.log(response.data);
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
    RecordDataService.findByCityState(this.state.searchCity, this.state.searchState)
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
  searchZip() {
    RecordDataService.findByZip(this.state.searchZip)
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
      <div className="list row">
        <div className="col-md-8"> 
          <div className="input-group mb-3">
              <input type="text" className="form-control"
                    placeholder="Search by Name"
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
        </div>

        <div className="col-md-6">
          <h4>Schools List</h4>

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

          <ul className="list-group">
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
                  {record.school_name}
                </li>
              ))}
          </ul>
          <Button
              className={`${classes.button} ${classes.removeAll}`}
              size="small"
              color="secondary"
              variant="contained"
              onClick={this.removeAllRecords}
            >
              Remove All
          </Button>
        </div>

        <Grid item md={8}>
             {currentRecord ? (
              <div className={classes.record}>
                <h4>Record</h4>
                <div className={classes.detail}>
                  <label>
                    <strong>Name:</strong>
                  </label>{" "}
                  {currentRecord.school_name}
                </div>
                
                <div className={classes.detail}>
                  <label>
                    <strong>City:</strong>
                  </label>{" "}
                  {currentRecord.school_city}
                </div>

                <div className={classes.detail}>
                  <label>
                    <strong>State:</strong>
                  </label>{" "}
                  {currentRecord.school_state}
                </div>

                <div className={classes.detail}>
                  <label>
                    <strong>Zip:</strong>
                  </label>{" "}
                  {currentRecord.school_zip}
                </div>

                <div className={classes.detail}>
                  <label>
                    <strong>URL:</strong>
                  </label>{" "}
                  {<a href={currentRecord.school_url}>Click here</a>}
                  {/* {currentRecord.school_url} */}
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
          </Grid>



      </div>
    //   <div className={classes.form}>
    //     <Grid container>
    //       <Grid className={classes.search} item md={12}>
    //         <TextField
    //           label="Search by Name"
    //           value={searchName}
    //           onChange={this.onChangeSearchName}
    //         />
    //         <Button
    //           size="small"
    //           variant="outlined"
    //           className={classes.textField}
    //           onClick={this.searchName}>
    //           Search
    //         </Button>
    //       </Grid>

    //       <Grid item md={4}>
    //         <h2>School List</h2>
    //         <div className="list-group">
    //           {records &&
    //             records.map((record, index) => (
    //               <ListItem
    //                 selected={index === currentIndex}
    //                 onClick={() => this.setActiveRecord(record, index)}
    //                 divider
    //                 button	
    //                 key={index}>
    //                 {record.school_name}
    //               </ListItem>
    //             ))}
    //         </div>

    //         <Button
    //           className={`${classes.button} ${classes.removeAll}`}
    //           size="small"
    //           color="secondary"
    //           variant="contained"
    //           onClick={this.removeAllRecords}
    //         >
    //           Remove All
    //       </Button>
    //       </Grid>

    //       <Grid item md={8}>
    //         {currentRecord ? (
    //           <div className={classes.record}>
    //             <h4>Record</h4>
    //             <div className={classes.detail}>
    //               <label>
    //                 <strong>Name:</strong>
    //               </label>{" "}
    //               {currentRecord.school_name}
    //             </div>
                
    //             <div className={classes.detail}>
    //               <label>
    //                 <strong>City:</strong>
    //               </label>{" "}
    //               {currentRecord.school_city}
    //             </div>

    //             <div className={classes.detail}>
    //               <label>
    //                 <strong>State:</strong>
    //               </label>{" "}
    //               {currentRecord.school_state}
    //             </div>

    //             <div className={classes.detail}>
    //               <label>
    //                 <strong>Zip:</strong>
    //               </label>{" "}
    //               {currentRecord.school_zip}
    //             </div>

    //             <div className={classes.detail}>
    //               <label>
    //                 <strong>URL:</strong>
    //               </label>{" "}
    //               {<a href={currentRecord.school_url}/>}
    //               {/* {currentRecord.school_url} */}
    //             </div>

    //             <Link
    //               to={"/records/" + currentRecord.id}
    //               className={classes.edit}
    //             >
    //               Edit
    //           </Link>
    //           </div>
    //         ) : (
    //             <div>
    //             <br />
    //             <p className={classes.record}>Please click on a Record...</p>
    //             </div>
    //         )}
    //       </Grid>
    //     </Grid>
    //   </div>
    );
  }
}

export default withStyles(styles)(RecordsList);