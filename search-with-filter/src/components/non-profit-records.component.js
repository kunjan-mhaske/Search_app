import React, {Component} from "react";

class NonProfitRecords extends Component{
    constructor(props){
        super(props);

        // State to save and retrieve properties
        this.state = {
            records: [],
            currentRecord: '',
            searchName: "",
            searchCity: "",
            searchState: "",
            
            searchCause: "",
            searchEthnic: "",
            totalRecords: 0,
        };
    }
    // Call methods while loading the application
    componentDidMount(){

    }

    onChangeSearchName(e){
        const name = e.target.value;
        this.setState({
            searchName: name,
        });
    }

    doSearch(){
      
    }

    // render the HTML block
    render () {
        const { searchName } = this.state;

        return (
            <div className="list row main-section">
              <div className="container">
                <div className="row">
                  <div className="form-group">
                    <label>Non-Profit Name</label>
                    <input type="text" name="npname" id="npname" 
                      className="form-control" placeholder="Enter name"
                      value={searchName} onChange={this.onChangeSearchName}/>
                  </div>
                  <div className="text-center">
                    <div className="input-group-append">
                      <button className="btn btn-outline-secondary" 
                        type="submit" onClick={this.doSearch}>
                        Search
                      </button>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="form-group">
                    <label>Filters</label>

                  </div>
                </div>
              </div>
            </div>
        );
    }
}
export default NonProfitRecords;