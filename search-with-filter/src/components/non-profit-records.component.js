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

    // render the HTML block
    render () {
        const { searchName } = this.state;

        return (
            <div></div>
        );
    }
}
export default NonProfitRecords;