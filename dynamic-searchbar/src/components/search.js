import React, { Component } from "react";
import RecordDataService from "../services/record.service.js";

// UI
import { Autocomplete } from '@material-ui/lab';
import { TextField } from '@material-ui/core';

// Component for dynamic search bar
class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.onSearchQuery = this.onSearchQuery.bind(this);
    this.onSearchQuery1 = this.onSearchQuery1.bind(this);
    this.retrieveRecords = this.retrieveRecords.bind(this);
    this.getRequestParam = this.getRequestParam.bind(this);

    this.state = {
      currentRecord: [],
      searchName: "",
    };
  }
  // Automatically Call this when this application loads.
  componentDidMount() {
    this.retrieveRecords();
  }
  // Open the link in new tab when click on dropdown option
  onSearchQuery1(event, values) {
    if (values){
      window.open(values.URL_CtP, '_blank', 'noopener,noreferrer');
    }
  }  
  // Not used for now
  onSearchQuery(e) {
    const searchQuery = e.target.value;
    this.setState({
      searchName: searchQuery,
    });
  }  
  // Prepare params to forward in request
  getRequestParam(searchName){
    let params = {};
    params["school_name"] = searchName;
    return params;
  }

  // To get all records based on the name
  retrieveRecords() {
    const { searchName } = this.state;
    const param = this.getRequestParam(searchName);

    RecordDataService.findByName(param)
    .then(response => {
      const records = response.data;
      
      this.setState({
        currentRecord: records,
      });
      // print on console
      // console.log(this.state);
    })
    .catch(e => { console.log(e); });
  }

  render(){
    const { currentRecord } = this.state;
    return (
      <div className="list row main-section">
      <div className="container">
        <div className="row">
          <div className="col-sm">
            <div className="form-group">
              <div className="row">
                  <Autocomplete
                    id="combo-box-demo"
                    style={{borderBlockColor:"#296D80"}}
                    options={currentRecord}
                    getOptionLabel={option => option.School_Name}
                    // Group by first letter of name
                    // groupBy={(option) => option.School_Name.charAt(0)}
                    noOptionsText={"No results found.."}
                    onChange={this.onSearchQuery}
                    renderInput={(params) => 
                        <TextField {...params} 
                          label="University Search" 
                          variant="standard" 
                        />
                      }
                    // To give links for labels
                    renderOption={(option) =>(
                        <a href={option.URL_CtP} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                          {option.School_Name}
                        </a>
                      )}
                    // Lenght of dropdown 
                    ListboxProps={
                      {
                        style:{
                            maxHeight: '30rem',
                        }
                      }
                    }
                  />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  }
}
export default SearchBar;
