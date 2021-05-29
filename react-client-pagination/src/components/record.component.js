// import React, { Component } from "react";
// import RecordDataService from "../services/record.service";

// import { styles } from "../css-common"
// // import { TextField, Button, withStyles } from "@material-ui/core";
// import { withStyles } from "@material-ui/core";


// class Record extends Component {
//     constructor(props) {
//         super(props);
//         this.onChangeName = this.onChangeName.bind(this);
//         this.onChangeURL = this.onChangeURL.bind(this);
//         this.onChangeCity = this.onChangeCity.bind(this);
//         this.onChangeState = this.onChangeState.bind(this);
//         this.onChangeZip = this.onChangeZip.bind(this);

//         this.getRecord = this.getRecord.bind(this);
//         // this.updatePublished = this.updatePublished.bind(this);
//         this.updateRecord = this.updateRecord.bind(this);
//         this.deleteRecord = this.deleteRecord.bind(this);

//         this.state = {
//             currentRecord: {
//                 id: null,
//                 school_name: "",
//                 school_url: "",
//                 school_city: "",
//                 school_state: "",
//                 school_zip: 0
//             },
//             message: ""
//         };
//     }

//     componentDidMount() {
//         this.getRecord(this.props.match.params.id);
//     }

//     onChangeName(e) {
//         const school_name = e.target.value;

//         this.setState(function (prevState) {
//             return {
//                 currentRecord: {
//                     ...prevState.currentRecord,
//                     school_name: school_name
//                 }
//             };
//         });
//     }

//     onChangeURL(e) {
//         const school_url = e.target.value;

//         this.setState(function (prevState) {
//             return {
//                 currentRecord: {
//                     ...prevState.currentRecord,
//                     school_url: school_url
//                 }
//             };
//         });
//     }

//     onChangeCity(e) {
//         const school_city = e.target.value;

//         this.setState(function (prevState) {
//             return {
//                 currentRecord: {
//                     ...prevState.currentRecord,
//                     school_city: school_city
//                 }
//             };
//         });
//     }
//     onChangeState(e) {
//         const school_state = e.target.value;

//         this.setState(function (prevState) {
//             return {
//                 currentRecord: {
//                     ...prevState.currentRecord,
//                     school_state: school_state
//                 }
//             };
//         });
//     }
//     onChangeZip(e) {
//         const school_zip = e.target.value;

//         this.setState(function (prevState) {
//             return {
//                 currentRecord: {
//                     ...prevState.currentRecord,
//                     school_zip: school_zip
//                 }
//             };
//         });
//     }

//     getRecord(id) {
//         RecordDataService.get(id)
//             .then(response => {
//                 this.setState({
//                     currentRecord: response.data
//                 });
//                 console.log(response.data);
//             })
//             .catch(e => {
//                 console.log(e);
//             });
//     }

//     // updatePublished(status) {
//     //     var data = {
//     //         id: this.state.currentTutorial.id,
//     //         title: this.state.currentTutorial.title,
//     //         description: this.state.currentTutorial.description,
//     //         published: status
//     //     };

//     //     TutorialDataService.update(this.state.currentTutorial.id, data)
//     //         .then(response => {
//     //             this.setState(prevState => ({
//     //                 currentTutorial: {
//     //                     ...prevState.currentTutorial,
//     //                     published: status
//     //                 }
//     //             }));
//     //             console.log(response.data);
//     //         })
//     //         .catch(e => {
//     //             console.log(e);
//     //         });
//     // }

//     updateRecord() {
//         RecordDataService.update(
//             this.state.currentRecord.id,
//             this.state.currentRecord
//         )
//             .then(response => {
//                 console.log(response.data);
//                 this.setState({
//                     message: "The record was updated successfully!"
//                 });
//             })
//             .catch(e => {
//                 console.log(e);
//             });
//     }

//     deleteRecord() {
//         RecordDataService.delete(this.state.currentRecord.id)
//             .then(response => {
//                 console.log(response.data);
//                 this.props.history.push('/records')
//             })
//             .catch(e => {
//                 console.log(e);
//             });
//     }

//     render() {
//         // ...
//         return(<div></div>);
//      }
//  }
 
//  export default withStyles(styles)(Record)