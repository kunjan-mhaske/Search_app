// import React, { Component } from "react";
// import RecordDataService from "../services/record.service";

// import { TextField, Button, withStyles } from "@material-ui/core";
// import { styles } from "../css-common";

// class AddRecord extends Component {
//     constructor(props) {
//         super(props);
//         this.onChangeName = this.onChangeName.bind(this);
//         this.onChangeURL = this.onChangeURL.bind(this);
//         this.onChangeCity = this.onChangeCity.bind(this);
//         this.onChangeState = this.onChangeState.bind(this);
//         this.onChangeZip = this.onChangeZip.bind(this);
//         this.saveRecord = this.saveRecord.bind(this);
//         this.newRecord = this.newRecord.bind(this);

//         this.state = {
//             id: null,
//             school_name: "",
//             school_url: "",
//             school_city: "",
//             school_state: "",
//             school_zip: 0
//         };
//     }

//     onChangeName(e) {
//         this.setState({
//             school_name: e.target.value
//         });
//     }

//     onChangeURL(e) {
//         this.setState({
//             school_url: e.target.value
//         });
//     }

//     onChangeCity(e) {
//         this.setState({
//             school_city: e.target.value
//         });
//     }
//     onChangeState(e) {
//         this.setState({
//             school_state: e.target.value
//         });
//     }
//     onChangeZip(e) {
//         this.setState({
//             school_zip: e.target.value
//         });
//     }

//     saveRecord() {
//         var data = {
//             school_name: this.state.school_name,
//             school_url: this.state.school_url,
//             school_city: this.state.school_city,
//             school_state: this.state.school_state,
//             school_zip: this.state.school_zip
//         };

//         RecordDataService.create(data)
//             .then(response => {
//                 this.setState({
//                     id: response.data.id,
//                     school_name: response.data.school_name,
//                     school_url: response.data.school_url,
//                     school_city: response.data.city,
//                     school_state: response.data.school_state,
//                     school_zip: response.data.school_zip

//                 });
//                 console.log(response.data);
//             })
//             .catch(e => {
//                 console.log(e);
//             });
//     }

//     newRecord() {
//         this.setState({
//             id: null,
//             school_name: "",
//             school_url: "",
//             school_city: "",
//             school_state: "",
//             school_zip: 0
//         });
//     }

//     render() {
//         // ...
//         const { classes } = this.props

//         return (
//             <React.Fragment>
//                 { this.state.submitted ? (
//                     <div className={classes.form}>
//                         <h4>You submitted successfully!</h4>
//                         <Button
//                             size="small"
//                             color="primary"
//                             variant="contained"
//                             onClick={this.newRecord}>
//                             Add
//                         </Button>
//                     </div>
//                     ) : (
//                         <div className={classes.form}>
//                             <div className={classes.textField}>
//                                 <TextField
//                                     label="School Name"
//                                     name="school_name"
//                                     value={this.state.school_name}
//                                     onChange={this.onChangeName}
//                                     required
//                                 />
//                             </div>

//                             <div className={classes.textField}>
//                                 <TextField
//                                     label="School URL"
//                                     name="school_url"
//                                     value={this.state.school_url}
//                                     onChange={this.onChangeURL}
//                                     required
//                                 />
//                             </div>

//                             <div className={classes.textField}>
//                                 <TextField
//                                     label="School City"
//                                     name="school_city"
//                                     value={this.state.school_city}
//                                     onChange={this.onChangeCity}
//                                     required
//                                 />
//                             </div>

//                             <div className={classes.textField}>
//                                 <TextField
//                                     label="School State"
//                                     name="school_state"
//                                     value={this.state.school_state}
//                                     onChange={this.onChangeState}
//                                     required
//                                 />
//                             </div>

//                             <div className={classes.textField}>
//                                 <TextField
//                                     label="School Zip"
//                                     name="school_zip"
//                                     value={this.state.school_zip}
//                                     onChange={this.onChangeZip}
//                                     inputProps={{inputMode: 'numeric'}}
//                                     required
//                                 />
//                             </div>

//                             <Button
//                                 size="small"
//                                 color="primary"
//                                 variant="contained"
//                                 onClick={this.saveRecord}>
//                                 Submit
//                             </Button>
//                         </div>
//                     )
//                 } 
//                 </React.Fragment>
//         );
//     }
// }

// export default withStyles(styles)(AddRecord);
