import { Component, React } from 'react';

// CSS styles
// import { styles } from "../css-common"
import { withStyles } from '@material-ui/core/styles';
import { Scrollbars } from 'react-custom-scrollbars';


import { Container, Row, Col, Image, OverlayTrigger, Button, Tooltip } from 'react-bootstrap';

import { Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';

class FollowGrid extends Component{
  constructor(props) {
    super(props);
      this.generateGridSeparate = this.generateGridSeparate.bind(this);
      this.generateGridComplete = this.generateGridComplete.bind(this);
      this.toggleFollowerLabel = this.toggleFollowerLabel.bind(this);
      this.toggleFollowingLabel = this.toggleFollowingLabel.bind(this);

      this.state = {
        toggleLabel1: "See",
        toggleLabel2: "See",

        top_following_num: 4,
        following_top_users: [],
        following_user_grid: [],
        total_following:0,

        top_follower_num: 4,
        follower_top_users: [],
        follower_user_grid: [],
        total_followers:0,

        followingUsers: [
          { "name": "1AmazonOwnerJefferyBezosWenttoSpace", "image": "https://logo.uplead.com/amazon.com" },
          { "name": "2Microsoft", "image": "https://logo.uplead.com/microsoft.com" },
          { "name": "3Fox", "image": "https://logo.uplead.com/fox.com" },
          { "name": "Vishwanathan Vishwanathankunjn", "image": "https://logo.uplead.com/sony.com" },
          { "name": "5IBM", "image": "https://logo.uplead.com/ibm.com" },
          { "name": "6Toshiba", "image": "https://logo.uplead.com/toshiba.com" },
          { "name": "7Amazon", "image": "https://logo.uplead.com/amazon.com" },
          { "name": "Kunjan Mhaske", "image": "https://logo.uplead.com/microsoft.com" },
          { "name": "9Fox", "image": "https://logo.uplead.com/fox.com" },
          { "name": "10Sony", "image": "https://logo.uplead.com/sony.com" },
          { "name": "11IBM", "image": "https://logo.uplead.com/ibm.com" },
          { "name": "Robert Tolmach", "image": "https://logo.uplead.com/toshiba.com" },
          { "name": "13Amazon", "image": "https://logo.uplead.com/amazon.com" },
          { "name": "14Microsoft", "image": "https://logo.uplead.com/microsoft.com" },
          { "name": "15Fox", "image": "https://logo.uplead.com/fox.com" },
          { "name": "16Sony", "image": "https://logo.uplead.com/sony.com" },
          { "name": "17IBM", "image": "https://logo.uplead.com/ibm.com" },
          { "name": "18Toshiba", "image": "https://logo.uplead.com/toshiba.com" },
          { "name": "19Amazon", "image": "https://logo.uplead.com/amazon.com" },
          { "name": "20Microsoft", "image": "https://logo.uplead.com/microsoft.com" },
          { "name": "1Amazon", "image": "https://logo.uplead.com/amazon.com" },
          { "name": "2Microsoft", "image": "https://logo.uplead.com/microsoft.com" },
          { "name": "3Fox", "image": "https://logo.uplead.com/fox.com" },
          { "name": "4Sony", "image": "https://logo.uplead.com/sony.com" },
          { "name": "5IBM", "image": "https://logo.uplead.com/ibm.com" },
          { "name": "6Toshiba", "image": "https://logo.uplead.com/toshiba.com" },
          { "name": "7Amazon", "image": "https://logo.uplead.com/amazon.com" },
          { "name": "8Microsoft", "image": "https://logo.uplead.com/microsoft.com" },
          { "name": "9Fox", "image": "https://logo.uplead.com/fox.com" },
          { "name": "10Sony", "image": "https://logo.uplead.com/sony.com" },
          { "name": "11IBM", "image": "https://logo.uplead.com/ibm.com" },
          { "name": "12Toshiba", "image": "https://logo.uplead.com/toshiba.com" },
          { "name": "13Amazon", "image": "https://logo.uplead.com/amazon.com" },
          { "name": "14Microsoft", "image": "https://logo.uplead.com/microsoft.com" },
          { "name": "15Fox", "image": "https://logo.uplead.com/fox.com" },
          { "name": "16Sony", "image": "https://logo.uplead.com/sony.com" },
          { "name": "17IBM", "image": "https://logo.uplead.com/ibm.com" },
          { "name": "18Toshiba", "image": "https://logo.uplead.com/toshiba.com" },
          { "name": "19Amazon", "image": "https://logo.uplead.com/amazon.com" },
          { "name": "20Microsoft", "image": "https://logo.uplead.com/microsoft.com" },

        ],
        followerUsers: [
          { "name": "01Fox", "image": "https://logo.uplead.com/fox.com" },
          { "name": "02Sony", "image": "https://logo.uplead.com/sony.com" },
          { "name": "03IBM", "image": "https://logo.uplead.com/ibm.com" },
          { "name": "04Toshiba", "image": "https://logo.uplead.com/toshiba.com" },
          { "name": "05Amazon", "image": "https://logo.uplead.com/amazon.com" },
          { "name": "06Microsoft", "image": "https://logo.uplead.com/microsoft.com" },
          { "name": "07Fox", "image": "https://logo.uplead.com/fox.com" },
          { "name": "08Sony", "image": "https://logo.uplead.com/sony.com" },
          { "name": "09IBM", "image": "https://logo.uplead.com/ibm.com" },
          { "name": "010Toshiba", "image": "https://logo.uplead.com/toshiba.com" },
          { "name": "011Amazon", "image": "https://logo.uplead.com/amazon.com" },
          { "name": "012Microsoft", "image": "https://logo.uplead.com/microsoft.com" },
          { "name": "013Fox", "image": "https://logo.uplead.com/fox.com" },
          { "name": "014Sony", "image": "https://logo.uplead.com/sony.com" },
          { "name": "015IBM", "image": "https://logo.uplead.com/ibm.com" },
          { "name": "016Toshiba", "image": "https://logo.uplead.com/toshiba.com" },
          { "name": "017Amazon", "image": "https://logo.uplead.com/amazon.com" },
          { "name": "018Microsoft", "image": "https://logo.uplead.com/microsoft.com" },
          { "name": "019Fox", "image": "https://logo.uplead.com/fox.com" },
          { "name": "01Fox", "image": "https://logo.uplead.com/fox.com" },
          { "name": "02Sony", "image": "https://logo.uplead.com/sony.com" },
          { "name": "03IBM", "image": "https://logo.uplead.com/ibm.com" },
          { "name": "04Toshiba", "image": "https://logo.uplead.com/toshiba.com" },
          { "name": "05Amazon", "image": "https://logo.uplead.com/amazon.com" },
          { "name": "06Microsoft", "image": "https://logo.uplead.com/microsoft.com" },
          { "name": "07Fox", "image": "https://logo.uplead.com/fox.com" },
          { "name": "08Sony", "image": "https://logo.uplead.com/sony.com" },
          { "name": "09IBM", "image": "https://logo.uplead.com/ibm.com" },
          { "name": "010Toshiba", "image": "https://logo.uplead.com/toshiba.com" },
          { "name": "011Amazon", "image": "https://logo.uplead.com/amazon.com" },
          { "name": "012Microsoft", "image": "https://logo.uplead.com/microsoft.com" },
          { "name": "013Fox", "image": "https://logo.uplead.com/fox.com" },
          { "name": "014Sony", "image": "https://logo.uplead.com/sony.com" },
          { "name": "015IBM", "image": "https://logo.uplead.com/ibm.com" },
          { "name": "016Toshiba", "image": "https://logo.uplead.com/toshiba.com" },
          { "name": "017Amazon", "image": "https://logo.uplead.com/amazon.com" },
          { "name": "016Toshiba", "image": "https://logo.uplead.com/toshiba.com" },
          { "name": "017Amazon", "image": "https://logo.uplead.com/amazon.com" },
          { "name": "016Toshiba", "image": "https://logo.uplead.com/toshiba.com" },
          { "name": "017Amazon", "image": "https://logo.uplead.com/amazon.com" },
        ],
      };
  }

  componentDidMount(){
    // this.generateGridSeparate();
    this.generateGridComplete();
  }

  generateGridComplete(){
    const { followingUsers, followerUsers } = this.state;
    const { top_following_num, top_follower_num } = this.state;
    const following_grid = [];
    const follower_grid = []; 
    const t_follower = followerUsers.length;
    const t_following = followingUsers.length;

    // Following
    while(followingUsers.length) following_grid.push(followingUsers.splice(0,top_following_num));
    // Follower
    while(followerUsers.length) follower_grid.push(followerUsers.splice(0,top_follower_num));

    this.setState({
      following_user_grid: following_grid,
      follower_user_grid: follower_grid,
      total_followers: t_follower,
      total_following: t_following,
    });

  }

  generateGridSeparate(){
    const { followingUsers, followerUsers } = this.state;
    const { top_following_num, top_follower_num } = this.state;
    const following_grid = [];
    const following_top = [];
    const follower_grid = [];
    const follower_top = [];
    const t_follower = followerUsers.length;
    const t_following = followingUsers.length;

    // Following
    for (let i =0; i<top_following_num; i++){
      following_top.push(followingUsers[i])
    }
    const remaining = followingUsers.splice(top_following_num, followingUsers.length);
    while(remaining.length) following_grid.push(remaining.splice(0,top_following_num));
    
    // Follower
    for (let i =0; i<top_follower_num; i++){
      follower_top.push(followerUsers[i])
    }
    const remaining_ = followerUsers.splice(top_follower_num, followerUsers.length);
    while(remaining_.length) follower_grid.push(remaining_.splice(0,top_follower_num));

    this.setState({
      following_top_users: following_top,
      following_user_grid: following_grid,
      follower_top_users: follower_top,
      follower_user_grid: follower_grid,
      total_followers: t_follower,
      total_following: t_following,

    });

    // console.log(following_top);
    // console.log(following_grid);
    // console.log(follower_top);
    // console.log(follower_grid);
  }

  toggleFollowingLabel(){
    const { toggleLabel1 } = this.state;
    if (toggleLabel1 === "See"){
      this.setState({
        toggleLabel1: "Close"
      });
    }else{
      this.setState({
        toggleLabel1: "See"
      });
    }
  }

  toggleFollowerLabel(){
    const { toggleLabel2 } = this.state;
    if (toggleLabel2 === "See"){
      this.setState({
        toggleLabel2: "Close"
      });
    }else{
      this.setState({
        toggleLabel2: "See"
      });
    }
  }

  render() {
    const { following_top_users, following_user_grid, follower_top_users, follower_user_grid } = this.state;
    const { total_following, total_followers, toggleLabel1, toggleLabel2 } = this.state;
    return(
      <div>
        <div>
        <Accordion style={{boxShadow:"none"}}>
          <AccordionSummary>
              <Button variant="outline-none" style={{boxShadow:"none",  padding:0}} onClick={this.toggleFollowerLabel}>{toggleLabel2} {toggleLabel2==="See"?total_followers:null} followers</Button>
          </AccordionSummary>
          {/* <div>
              <Row>
                {follower_top_users.map(co => <Col> <a href="#"> <Image className="thumbnail_img" src={co.image} thumbnail/> </a></Col>)}
              </Row>
            </div> */}

          <AccordionDetails>

            <Container className="scrollbar">
            <Scrollbars autoHeight autoHeightMin="0px" autoHeightMax="400px" 
                        renderTrackHorizontal={({ style, ...props }) =><div {...props} style={{...style }}/>}>
              {follower_user_grid.map(ro => 
                <Row> 
                  {ro.map(co => 
                    <Col> 
                      <OverlayTrigger placement="auto" overlay={<Tooltip id="name-tooltip">{co.name}</Tooltip>}>
                        <a href={co.image}> 
                          <Image className="thumbnail_img" src={co.image} thumbnail/> 
                        </a>
                      </OverlayTrigger>
                    </Col>)}
                </Row>)}
              </Scrollbars>
              </Container>
          </AccordionDetails>
        </Accordion>
        </div>

        <div>
        <Accordion style={{boxShadow:"none"}}>
          <AccordionSummary>
            <Button variant="outline-none" style={{boxShadow:"none", padding:0}} onClick={this.toggleFollowingLabel} >{toggleLabel1} {toggleLabel1==="See"?total_following:null} following</Button>
          </AccordionSummary>
          {/* <div>
              <Row>
                {following_top_users.map(co => <Col> <a href="#"> <Image className="thumbnail_img" src={co.image} thumbnail/> </a></Col>)}
              </Row>
            </div> */}

          <AccordionDetails>
            <Container className="scrollbar">
            <Scrollbars autoHeight autoHeightMin="0px" autoHeightMax="400px" 
                        renderTrackHorizontal={({ style, ...props }) =><div {...props} style={{ ...style }}/>}>
              {following_user_grid.map(ro => 
                <Row> 
                  {ro.map(co => 
                    <Col> 
                      <OverlayTrigger placement="auto" overlay={<Tooltip id="name-tooltip">{co.name}</Tooltip>}>
                        <a href={co.image}> 
                          <Image className="thumbnail_img" src={co.image} thumbnail/> 
                        </a>
                      </OverlayTrigger>
                    </Col>)}
                </Row>)}
            </Scrollbars>
              </Container>
          </AccordionDetails>
        </Accordion>
        </div>

      </div>
    );
  }
}

// export default withStyles(styles)(FollowGrid);
export default FollowGrid;