import React, { Component } from "react";

// API service to retrieve records
import RecordDataService from "../services/np-records.service";

// CSS styles for UI
import { styles } from "../css-common";
import { withStyles } from "@material-ui/core";

// pagination
import Pagination from "@material-ui/lab/Pagination";

import { InputGroup, FormControl, Button, Container, Row, Col } from 'react-bootstrap';
import { Multiselect } from "multiselect-react-dropdown";

class NonProfitRecords extends Component {
  constructor(props) {
    super(props);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handlePageSizeChange = this.handlePageSizeChange.bind(this);
    this.onChangeSearchName = this.onChangeSearchName.bind(this);
    this.searchByName = this.searchByName.bind(this);
    this.handlerDisplayFilters = this.handlerDisplayFilters.bind(this);

    // multiselect methods
    this.multiselectRef = React.createRef();
    this.loadFilters = this.loadFilters.bind(this);
    this.applyFilters = this.applyFilters.bind(this);
    this.resetFilters = this.resetFilters.bind(this);
    this.onSelectStates = this.onSelectStates.bind(this);
    this.onSelectCauses = this.onSelectCauses.bind(this);
    this.onSelectEthnics = this.onSelectEthnics.bind(this);
    this.onRemoveStates = this.onRemoveStates.bind(this);
    this.onRemoveCauses = this.onRemoveCauses.bind(this);
    this.onRemoveEthnics = this.onRemoveEthnics.bind(this);

    // State to save and retrieve properties
    this.state = {
      records: [],
      currentRecord: "",
      searchName: "",
      searchCity: "",
      searchState: "",
      searchZip: "",
      searchCause: "",
      searchEthnic: "",

      page: 1,
      count: 0,
      pageSize: 100,
      total_records: 0,
      displayFilters: false,

      // multiselect options
      selectedStates: [],
      selectedCauses: [],
      selectedEthnics: [],
      
      // Filters
      filters:{
         state:[],
         cause:[],
         ethnic:[]
      },
      

    };
  }
  // Call methods while loading the application
  componentDidMount() {
    this.loadFilters();
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
  // method to save the search query name in state
  onChangeSearchName(e) {
    const name = e.target.value;
    this.setState({
      searchName: name,
    });
  }
  // method for request parameters
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
 
  // method to retrieve the non profit records
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

  // retrieve filter values
  loadFilters(){
    const { filters } = this.state;
    const filter_obj = {};
    for (const filter in filters){
      const params = {"filter_name":filter}
      RecordDataService.getFilters(params)
      .then(response => {
        filter_obj[filter] = response.data;
      })
      .catch(e => {
        console.log(e);
      });  
    }
    this.setState({
      filters:filter_obj      
    });
  }

  // Toggle Display filters 
  handlerDisplayFilters() {
    const { displayFilters } = this.state;
    this.setState({ displayFilters: !displayFilters });
  }

  // Get all selected states
  onSelectStates(selectedList, selectedItem){
    this.setState({
      selectedStates: selectedList
    });
    console.log(this.state.filters)
  }
  // Remove selected states
  onRemoveStates(selectedList, removedItem){
    this.setState({
      selectedStates: selectedList
    });
  }

  // Get all selected Causes
  onSelectCauses(selectedList, selectedItem){
    this.setState({
      selectedCauses: selectedList
    });
  }
  // Remove selected causes
  onRemoveCauses(selectedList, removedItem){
    this.setState({
      selectedCauses: selectedList
    });
  }

  // Get all selected Ethnics
  onSelectEthnics(selectedList, selectedItem){
    this.setState({
      selectedEthnics: selectedList
    });
  }
  // Remove selected ethnics
  onRemoveEthnics(selectedList, removedItem){
    this.setState({
      selectedEthnics: selectedList
    });
  }

  // Apply filters
  applyFilters(){
    console.log("applied");
  }

  // Reset the selections in filter
  resetFilters(){
    this.multiselectRef.current.resetSelectedValues();
    this.setState({
      selectedStates: [],
      selectedCauses: [],
      selectedEthnics: []
    });
  }

  // render the HTML block
  render() {
    const { searchName, currentRecord, page, count, displayFilters, objectArray } = this.state;
    const { state, cause, ethnic } = this.state.filters;

    return (
      <div className="list row main-section">
          <label>Non-Profit Name</label>

          <InputGroup>
            <FormControl
              placeholder="Enter Non-Profit Name"
              aria-label="Non-Profit Name"
              value={searchName} onChange={this.onChangeSearchName}
            />
            <Button variant="outline-secondary" className="btn btn-outline-secondary"
              type="submit" onClick={this.searchByName}>Search</Button>
              
            <Button variant="outline-secondary" className="btn btn-outline-secondary"
              type="" onClick={this.handlerDisplayFilters}>Filters</Button>
          </InputGroup>
          
          <Container className={displayFilters ? null : "d-none"}>
            <Row className="pad-t-1"> 
              <Col className="pad-l-0">
                <div className="row d-content">
                  <label>States</label>
                  <Multiselect
                      options={state}
                      // selectedValues={}
                      displayValue="state"
                      showCheckbox={true}
                      closeOnSelect={false}
                      avoidHighlightFirstOption={true}
                      onSelect={this.onSelectStates}
                      onRemove={this.onRemoveStates}
                      ref={this.multiselectRef}
                  />
                </div>
              </Col>
              <Col className="pad-l-0">
                <div className="row d-content">
                  <label>Causes</label>
                  <Multiselect 
                      options={cause}
                      displayValue="cause"
                      showCheckbox={true}
                      closeOnSelect={false}
                      avoidHighlightFirstOption={true}
                      onSelect={this.onSelectCauses}
                      onRemove={this.onRemoveCauses}
                      ref={this.multiselectRef}
                  />
                </div>
              </Col>
              <Col className="pad-l-0">
                <div className="row d-content">
                  <label>Ethnics</label>
                  <Multiselect
                      options={ethnic}
                      displayValue="ethnic"
                      showCheckbox={true}
                      closeOnSelect={false}
                      avoidHighlightFirstOption={true}
                      onSelect={this.onSelectEthnics}
                      onRemove={this.onRemoveEthnics}
                      ref={this.multiselectRef}
                  />
                </div>
              </Col>
            </Row>
            <p></p>
            <div className="right"> 
              <Button variant="outline-secondary" className="btn btn-outline-secondary"
                onClick={this.applyFilters}>Apply</Button>
              <Button variant="outline-secondary" className="btn btn-outline-secondary"
                onClick={this.resetFilters}>Reset</Button>
              {/* <a> Apply </a> &nbsp;
              <a> Reset </a> */}
            </div>
          </Container>

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