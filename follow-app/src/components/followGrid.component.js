import { Component, React } from 'react';
import RecordDataService from "../services/record.service.js";

import user_silhouette from '../user_silhouette.jpg';

import { Scrollbars } from 'react-custom-scrollbars';
import { Image, OverlayTrigger, Tooltip } from 'react-bootstrap';

class FollowGrid extends Component {
  constructor(props) {
    super(props);
    this.generateGrid = this.generateGrid.bind(this);
    this.generateGridSeparate = this.generateGridSeparate.bind(this);
    this.generateGridComplete = this.generateGridComplete.bind(this);
    this.toggleFollowerLabel = this.toggleFollowerLabel.bind(this);
    this.toggleFollowingLabel = this.toggleFollowingLabel.bind(this);

    this.state = {
      user_email: "emmamoore@changingthepresent.org",

      toggleLabel1: "See",
      toggleLabel2: "See",

      top_following_num: 4,
      following_top_users: [],
      following_user_grid: [],
      total_following: 0,

      top_follower_num: 4,
      follower_top_users: [],
      follower_user_grid: [],
      total_followers: 0,

      followingUsers: [
        // { "name": "01Fox", "image": "" },
        // { "name": "02Sony", "image": "https://cdn.shopify.com/s/files/1/1842/4701/products/ali_200x200.jpg?v=1574125863" },
        // { "name": "03IBM", "image": "https://cdn.shopify.com/s/files/1/1842/4701/products/726011439276018bd95820d60ac74475_square_e6896467-f018-440d-8dc2-bb812041a8d7_200x200.jpg?v=1574124402" },
        // { "name": "04Toshiba", "image": "https://cdn.shopify.com/s/files/1/1842/4701/products/HSboy3a_200x200.jpg?v=1604425464" },
        // { "name": "05Amazon", "image": "https://cdn.shopify.com/s/files/1/1842/4701/products/CourtneySadlersquare_200x200.png?v=1603744572" },
        // { "name": "06Microsoft", "image": "https://cdn.shopify.com/s/files/1/1842/4701/products/HSboy2_200x200.jpg?v=1604425329" },
        // { "name": "07Fox", "image": "https://cdn.shopify.com/s/files/1/1842/4701/products/HSgirl_200x200.jpg?v=1604424844" },
        // { "name": "08Sony", "image": "https://cdn.shopify.com/s/files/1/1842/4701/products/HSstudentpic_200x200.png?v=1604424633" },
        // { "name": "09IBM", "image": "https://cdn.shopify.com/s/files/1/1842/4701/products/jordan_200x200.jpg?v=1574125870" },
        // { "name": "010Toshiba", "image": "https://cdn.shopify.com/s/files/1/1842/4701/products/matt_200x200.jpg?v=1574125861" },
        // { "name": "011Amazon", "image": "https://cdn.shopify.com/s/files/1/1842/4701/products/mckayla_200x200.jpg?v=1574125867" },
        // { "name": "012Microsoft", "image": "https://cdn.shopify.com/s/files/1/1842/4701/products/mollie_200x200.jpg?v=1574125876" },
        // { "name": "013Fox", "image": "https://cdn.shopify.com/s/files/1/1842/4701/products/monica_200x200.jpg?v=1574125879" },
        // { "name": "014Sony", "image": "https://cdn.shopify.com/s/files/1/1842/4701/products/Richard_Aved_200x200.jpg?v=1603685528" },
        // { "name": "015IBM", "image": "https://cdn.shopify.com/s/files/1/1842/4701/products/78452403_1357430384416366_7086704722823872512_n_200x200.jpg?v=1619985012" },
        // { "name": "016Toshiba", "image": "https://cdn.shopify.com/s/files/1/1842/4701/products/pic_square_1_200x200.jpg?v=1571609819" },
        // { "name": "01Fox", "image": "https://cdn.shopify.com/s/files/1/1842/4701/products/alex_128x128.jpg?v=1574125865" },
        // { "name": "02Sony", "image": "https://cdn.shopify.com/s/files/1/1842/4701/products/ali_200x200.jpg?v=1574125863" },
        // { "name": "03IBM", "image": "https://cdn.shopify.com/s/files/1/1842/4701/products/726011439276018bd95820d60ac74475_square_e6896467-f018-440d-8dc2-bb812041a8d7_200x200.jpg?v=1574124402" },
        // { "name": "04Toshiba", "image": "https://cdn.shopify.com/s/files/1/1842/4701/products/HSboy3a_200x200.jpg?v=1604425464" },
        // { "name": "05Amazon", "image": "https://cdn.shopify.com/s/files/1/1842/4701/products/CourtneySadlersquare_200x200.png?v=1603744572" },
        // { "name": "06Microsoft", "image": "https://cdn.shopify.com/s/files/1/1842/4701/products/HSboy2_200x200.jpg?v=1604425329" },
        // { "name": "07Fox", "image": "https://cdn.shopify.com/s/files/1/1842/4701/products/HSgirl_200x200.jpg?v=1604424844" },
        // { "name": "08Sony", "image": "https://cdn.shopify.com/s/files/1/1842/4701/products/HSstudentpic_200x200.png?v=1604424633" },
        // { "name": "09IBM", "image": "https://cdn.shopify.com/s/files/1/1842/4701/products/jordan_200x200.jpg?v=1574125870" },
        // { "name": "010Toshiba", "image": "https://cdn.shopify.com/s/files/1/1842/4701/products/matt_200x200.jpg?v=1574125861" },
        // { "name": "011Amazon", "image": "https://cdn.shopify.com/s/files/1/1842/4701/products/mckayla_200x200.jpg?v=1574125867" },
        // { "name": "012Microsoft", "image": "https://cdn.shopify.com/s/files/1/1842/4701/products/mollie_200x200.jpg?v=1574125876" },
        // { "name": "013Fox", "image": "https://cdn.shopify.com/s/files/1/1842/4701/products/monica_200x200.jpg?v=1574125879" },

        // { "name": "014Sony", "image": "https://cdn.shopify.com/s/files/1/1842/4701/products/Richard_Aved_200x200.jpg?v=1603685528" },
        // { "name": "015IBM", "image": "https://cdn.shopify.com/s/files/1/1842/4701/products/78452403_1357430384416366_7086704722823872512_n_200x200.jpg?v=1619985012" },
        // { "name": "016Toshiba", "image": "https://cdn.shopify.com/s/files/1/1842/4701/products/pic_square_1_200x200.jpg?v=1571609819" },
        // { "name": "01Fox", "image": "https://cdn.shopify.com/s/files/1/1842/4701/products/alex_128x128.jpg?v=1574125865" },
        // { "name": "02Sony", "image": "https://cdn.shopify.com/s/files/1/1842/4701/products/ali_200x200.jpg?v=1574125863" },
        // { "name": "03IBM", "image": "https://cdn.shopify.com/s/files/1/1842/4701/products/726011439276018bd95820d60ac74475_square_e6896467-f018-440d-8dc2-bb812041a8d7_200x200.jpg?v=1574124402" },
        // { "name": "04Toshiba", "image": "https://cdn.shopify.com/s/files/1/1842/4701/products/HSboy3a_200x200.jpg?v=1604425464" },
        // { "name": "05Amazon", "image": "https://cdn.shopify.com/s/files/1/1842/4701/products/CourtneySadlersquare_200x200.png?v=1603744572" },
        // { "name": "06Microsoft", "image": "https://cdn.shopify.com/s/files/1/1842/4701/products/HSboy2_200x200.jpg?v=1604425329" },
        // { "name": "07Fox", "image": "https://cdn.shopify.com/s/files/1/1842/4701/products/HSgirl_200x200.jpg?v=1604424844" },
        // { "name": "08Sony", "image": "https://cdn.shopify.com/s/files/1/1842/4701/products/HSstudentpic_200x200.png?v=1604424633" },
        // { "name": "09IBM", "image": "https://cdn.shopify.com/s/files/1/1842/4701/products/jordan_200x200.jpg?v=1574125870" },
        // { "name": "010Toshiba", "image": "https://cdn.shopify.com/s/files/1/1842/4701/products/matt_200x200.jpg?v=1574125861" },
        // { "name": "011Amazon", "image": "https://cdn.shopify.com/s/files/1/1842/4701/products/mckayla_200x200.jpg?v=1574125867" },
        // { "name": "012Microsoft", "image": "https://cdn.shopify.com/s/files/1/1842/4701/products/mollie_200x200.jpg?v=1574125876" },
        // { "name": "013Fox", "image": "https://cdn.shopify.com/s/files/1/1842/4701/products/monica_200x200.jpg?v=1574125879" },
        // { "name": "014Sony", "image": "https://cdn.shopify.com/s/files/1/1842/4701/products/Richard_Aved_200x200.jpg?v=1603685528" },
        // { "name": "015IBM", "image": "https://cdn.shopify.com/s/files/1/1842/4701/products/78452403_1357430384416366_7086704722823872512_n_200x200.jpg?v=1619985012" },
        // { "name": "016Toshiba", "image": "https://cdn.shopify.com/s/files/1/1842/4701/products/pic_square_1_200x200.jpg?v=1571609819" },
      ],
      followerUsers: [
        // { "name": "01Fox", "image": null },
        // { "name": "02Sony", "image": "https://cdn.shopify.com/s/files/1/1842/4701/products/ali_200x200.jpg?v=1574125863" },
        // { "name": "03IBM", "image": "https://cdn.shopify.com/s/files/1/1842/4701/products/726011439276018bd95820d60ac74475_square_e6896467-f018-440d-8dc2-bb812041a8d7_200x200.jpg?v=1574124402" },
        // { "name": "04Toshiba", "image": "https://cdn.shopify.com/s/files/1/1842/4701/products/HSboy3a_200x200.jpg?v=1604425464" },
        // { "name": "05Amazon", "image": "https://cdn.shopify.com/s/files/1/1842/4701/products/CourtneySadlersquare_200x200.png?v=1603744572" },
        // { "name": "06Microsoft", "image": "https://cdn.shopify.com/s/files/1/1842/4701/products/HSboy2_200x200.jpg?v=1604425329" },
        // { "name": "07Fox", "image": "https://cdn.shopify.com/s/files/1/1842/4701/products/HSgirl_200x200.jpg?v=1604424844" },
        // { "name": "08Sony", "image": "https://cdn.shopify.com/s/files/1/1842/4701/products/HSstudentpic_200x200.png?v=1604424633" },
        // { "name": "09IBM", "image": "https://cdn.shopify.com/s/files/1/1842/4701/products/jordan_200x200.jpg?v=1574125870" },
        // { "name": "010Toshiba", "image": "https://cdn.shopify.com/s/files/1/1842/4701/products/matt_200x200.jpg?v=1574125861" },
        // { "name": "011Amazon", "image": "https://cdn.shopify.com/s/files/1/1842/4701/products/mckayla_200x200.jpg?v=1574125867" },
        // { "name": "012Microsoft", "image": "https://cdn.shopify.com/s/files/1/1842/4701/products/mollie_200x200.jpg?v=1574125876" },
        // { "name": "013Fox", "image": "https://cdn.shopify.com/s/files/1/1842/4701/products/monica_200x200.jpg?v=1574125879" },
        // { "name": "014Sony", "image": "https://cdn.shopify.com/s/files/1/1842/4701/products/Richard_Aved_200x200.jpg?v=1603685528" },
        // { "name": "015IBM", "image": "https://cdn.shopify.com/s/files/1/1842/4701/products/78452403_1357430384416366_7086704722823872512_n_200x200.jpg?v=1619985012" },
        // { "name": "016Toshiba", "image": "https://cdn.shopify.com/s/files/1/1842/4701/products/pic_square_1_200x200.jpg?v=1571609819" },
        // { "name": "01Fox", "image": "https://cdn.shopify.com/s/files/1/1842/4701/products/alex_128x128.jpg?v=1574125865" },
        // { "name": "02Sony", "image": "https://cdn.shopify.com/s/files/1/1842/4701/products/ali_200x200.jpg?v=1574125863" },
        // { "name": "03IBM", "image": "https://cdn.shopify.com/s/files/1/1842/4701/products/726011439276018bd95820d60ac74475_square_e6896467-f018-440d-8dc2-bb812041a8d7_200x200.jpg?v=1574124402" },
        // { "name": "04Toshiba", "image": "https://cdn.shopify.com/s/files/1/1842/4701/products/HSboy3a_200x200.jpg?v=1604425464" },
        // { "name": "05Amazon", "image": "https://cdn.shopify.com/s/files/1/1842/4701/products/CourtneySadlersquare_200x200.png?v=1603744572" },
        // { "name": "06Microsoft", "image": "https://cdn.shopify.com/s/files/1/1842/4701/products/HSboy2_200x200.jpg?v=1604425329" },
        // { "name": "07Fox", "image": "https://cdn.shopify.com/s/files/1/1842/4701/products/HSgirl_200x200.jpg?v=1604424844" },
        // { "name": "08Sony", "image": "https://cdn.shopify.com/s/files/1/1842/4701/products/HSstudentpic_200x200.png?v=1604424633" },
        // { "name": "09IBM", "image": "https://cdn.shopify.com/s/files/1/1842/4701/products/jordan_200x200.jpg?v=1574125870" },
        // { "name": "010Toshiba", "image": "https://cdn.shopify.com/s/files/1/1842/4701/products/matt_200x200.jpg?v=1574125861" },
        // { "name": "011Amazon", "image": "https://cdn.shopify.com/s/files/1/1842/4701/products/mckayla_200x200.jpg?v=1574125867" },

        // { "name": "012Microsoft", "image": "https://cdn.shopify.com/s/files/1/1842/4701/products/mollie_200x200.jpg?v=1574125876" },
        // { "name": "013Fox", "image": "https://cdn.shopify.com/s/files/1/1842/4701/products/monica_200x200.jpg?v=1574125879" },
        // { "name": "014Sony", "image": "https://cdn.shopify.com/s/files/1/1842/4701/products/Richard_Aved_200x200.jpg?v=1603685528" },
        // { "name": "015IBM", "image": "https://cdn.shopify.com/s/files/1/1842/4701/products/78452403_1357430384416366_7086704722823872512_n_200x200.jpg?v=1619985012" },
        // { "name": "016Toshiba", "image": "https://cdn.shopify.com/s/files/1/1842/4701/products/pic_square_1_200x200.jpg?v=1571609819" },
        // { "name": "01Fox", "image": "https://cdn.shopify.com/s/files/1/1842/4701/products/alex_128x128.jpg?v=1574125865" },
        // { "name": "02Sony", "image": "https://cdn.shopify.com/s/files/1/1842/4701/products/ali_200x200.jpg?v=1574125863" },
        // { "name": "03IBM", "image": "https://cdn.shopify.com/s/files/1/1842/4701/products/726011439276018bd95820d60ac74475_square_e6896467-f018-440d-8dc2-bb812041a8d7_200x200.jpg?v=1574124402" },
        // { "name": "04Toshiba", "image": "https://cdn.shopify.com/s/files/1/1842/4701/products/HSboy3a_200x200.jpg?v=1604425464" },
        // { "name": "05Amazon", "image": "https://cdn.shopify.com/s/files/1/1842/4701/products/CourtneySadlersquare_200x200.png?v=1603744572" },
        // { "name": "06Microsoft", "image": "https://cdn.shopify.com/s/files/1/1842/4701/products/HSboy2_200x200.jpg?v=1604425329" },
        // { "name": "07Fox", "image": "https://cdn.shopify.com/s/files/1/1842/4701/products/HSgirl_200x200.jpg?v=1604424844" },
        // { "name": "08Sony", "image": "https://cdn.shopify.com/s/files/1/1842/4701/products/HSstudentpic_200x200.png?v=1604424633" },
        // { "name": "09IBM", "image": "https://cdn.shopify.com/s/files/1/1842/4701/products/jordan_200x200.jpg?v=1574125870" },
        // { "name": "010Toshiba", "image": "https://cdn.shopify.com/s/files/1/1842/4701/products/matt_200x200.jpg?v=1574125861" },
        // { "name": "011Amazon", "image": "https://cdn.shopify.com/s/files/1/1842/4701/products/mckayla_200x200.jpg?v=1574125867" },
        // { "name": "012Microsoft", "image": "https://cdn.shopify.com/s/files/1/1842/4701/products/mollie_200x200.jpg?v=1574125876" },
        // { "name": "013Fox", "image": "https://cdn.shopify.com/s/files/1/1842/4701/products/monica_200x200.jpg?v=1574125879" },
        // { "name": "014Sony", "image": "https://cdn.shopify.com/s/files/1/1842/4701/products/Richard_Aved_200x200.jpg?v=1603685528" },
      ],
    };
  }

  // Execute on page load 
  componentDidMount() {
    // this.generateGridSeparate();    
    // this.generateGridComplete();
    this.generateGrid();

    // Script for customized collapsible container
    <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
    var coll = document.getElementsByClassName("collapsible-b");
    for (var i = 0; i < coll.length; i++) {
      coll[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.maxHeight) {
          content.style.maxHeight = null;
        } else {
          content.style.maxHeight = content.scrollHeight + "px";
        }
      });
    }

  }

  // Prepare params to forward in request
  getRequestParam(userEmail) {
    let params = {};
    params["user_email"] = userEmail;
    return params;
  }

  // Generate all followers and followings separately
  // Not using for now
  async generateGridComplete() {

    const { user_email } = this.state;
    const param = this.getRequestParam(user_email);
    let followers = [];
    let followings = [];

    // await RecordDataService.findFollowers(param)
    // .then(response => {
    //   followers = response.data;
    // })
    // .catch(e => { console.log(e); });

    // await RecordDataService.findFollowings(param)
    // .then(response => {
    //   followings = response.data;
    // })
    // .catch(e => { console.log(e); });

    const { followingUsers, followerUsers } = this.state;
    // const followingUsers = followings;
    // const followerUsers = followers;

    const { top_following_num, top_follower_num } = this.state;
    const following_grid = [];
    const follower_grid = [];
    const t_follower = followerUsers.length;
    const t_following = followingUsers.length;

    // Follower
    if (t_follower >= top_follower_num) {
      while (followerUsers.length) follower_grid.push(followerUsers.splice(0, top_follower_num));
    }
    else {
      follower_grid.push(followingUsers);
    }
    // Following
    if (t_following >= top_following_num) {
      while (followingUsers.length) following_grid.push(followingUsers.splice(0, top_following_num));
    }
    else {
      following_grid.push(followingUsers);
    }

    this.setState({
      following_user_grid: following_grid,
      follower_user_grid: follower_grid,
      total_followers: t_follower,
      total_following: t_following,
    });

    // console.log(this.state);

  }

  // Generate followers followings in a single query
  async generateGrid() {
    const { user_email } = this.state;
    const param = this.getRequestParam(user_email);
    let followers = [];
    let followings = [];

    let data = await RecordDataService.findAllFollowersFollowings(param)
      .then(response => {
        return response.data;
      })
      .catch(e => { console.log(e); });

    for (let row in data) {
      // get all followings that follows the user
      if (data[row].follower_email === user_email) {
        followings.push(data[row]);
      }
      // get all followers followed by user
      if (data[row].followed_email === user_email) {
        followers.push(data[row]);
      }
    }

    const followingUsers = followings;
    const followerUsers = followers;

    const { top_following_num, top_follower_num } = this.state;
    const following_grid = [];
    const follower_grid = [];
    const t_follower = followerUsers.length;
    const t_following = followingUsers.length;

    // Follower
    if (t_follower >= top_follower_num) {
      while (followerUsers.length) follower_grid.push(followerUsers.splice(0, top_follower_num));
    }
    else {
      follower_grid.push(followingUsers);
    }
    // Following
    if (t_following >= top_following_num) {
      while (followingUsers.length) following_grid.push(followingUsers.splice(0, top_following_num));
    }
    else {
      following_grid.push(followingUsers);
    }

    this.setState({
      following_user_grid: following_grid,
      follower_user_grid: follower_grid,
      total_followers: t_follower,
      total_following: t_following,
    });

  }


  // Generate top 4 followers/followings separately
  generateGridSeparate() {
    const { followingUsers, followerUsers } = this.state;
    const { top_following_num, top_follower_num } = this.state;
    const following_grid = [];
    const following_top = [];
    const follower_grid = [];
    const follower_top = [];
    const t_follower = followerUsers.length;
    const t_following = followingUsers.length;

    // Following
    for (let i = 0; i < top_following_num; i++) {
      following_top.push(followingUsers[i])
    }
    const remaining = followingUsers.splice(top_following_num, followingUsers.length);
    while (remaining.length) following_grid.push(remaining.splice(0, top_following_num));

    // Follower
    for (let i = 0; i < top_follower_num; i++) {
      follower_top.push(followerUsers[i])
    }
    const remaining_ = followerUsers.splice(top_follower_num, followerUsers.length);
    while (remaining_.length) follower_grid.push(remaining_.splice(0, top_follower_num));

    this.setState({
      following_top_users: following_top,
      following_user_grid: following_grid,
      follower_top_users: follower_top,
      follower_user_grid: follower_grid,
      total_followers: t_follower,
      total_following: t_following,

    });

  }

  toggleFollowingLabel() {
    const { toggleLabel1 } = this.state;
    if (toggleLabel1 === "See") {
      this.setState({
        toggleLabel1: "Close"
      });
    } else {
      this.setState({
        toggleLabel1: "See"
      });
    }
  }

  toggleFollowerLabel() {
    const { toggleLabel2 } = this.state;
    if (toggleLabel2 === "See") {
      this.setState({
        toggleLabel2: "Close"
      });
    } else {
      this.setState({
        toggleLabel2: "See"
      });
    }
  }

  render() {
    const { following_top_users, following_user_grid, follower_top_users, follower_user_grid } = this.state;
    const { total_following, total_followers, toggleLabel1, toggleLabel2 } = this.state;
    return (
      <div>
        {/* Logos generated as list elements */}
        <div>
          {/* Show only when total followers are 0 */}
          {total_followers === 0 && <button className="collapsible-b">No Followers</button>}
          {/* Show only when total followers are 1 to 4 */}
          <div className={1 <= total_followers && total_followers <= 4 ? null : "d-none"}>
            <button className="collapsible-b">Followers</button>
            <div className="collapsible-content">
              <Scrollbars autoHide autoHeight autoHeightMin="0px" autoHeightMax="350px"
                renderTrackHorizontal={({ style, ...props }) => <div {...props} style={{ ...style }} />}>
                {follower_user_grid.map(ro =>
                  <ul className="logo-list"> {ro.map(co =>
                    <li>
                      <OverlayTrigger id="overlay-id" placement="auto-end" overlay={<Tooltip id="name-tooltip">{co.follower_name}</Tooltip>}>
                        <a href={co.follower_handle} target="_blank" rel="noopener noreferrer">
                          {/* {(co.image === "" || co.image === null) && <Image className="thumbnail_img" src={user_silhouette} thumbnail />} */}
                          {(co.follower_image_url === "" || co.follower_image_url === null) && <Image className="thumbnail_img" src={user_silhouette} thumbnail />}
                          {/* {(co.image !== "" && co.image !== null) && <Image className="thumbnail_img" src={co.image} thumbnail />} */}
                          {(co.follower_image_url !== "" && co.follower_image_url !== null) && <Image className="thumbnail_img" src={co.follower_image_url} thumbnail />}
                        </a>
                      </OverlayTrigger>
                    </li>)}
                  </ul>)}
              </Scrollbars>
            </div>
          </div>

          {/* Show only when total followers are more than 4 */}
          <div className={total_followers > 4 ? null : "d-none"}>
            <button className="collapsible-b" onClick={this.toggleFollowerLabel}>{toggleLabel2} {toggleLabel2 === "See" ? total_followers : null} Followers</button>
            <div className="collapsible-content">
              <Scrollbars autoHide autoHeight autoHeightMin="0px" autoHeightMax="350px"
                renderTrackHorizontal={({ style, ...props }) => <div {...props} style={{ ...style }} />}>
                {follower_user_grid.map(ro =>
                  <ul className="logo-list"> {ro.map(co =>
                    <li>
                      <OverlayTrigger id="overlay-id" placement="auto-end" overlay={<Tooltip id="name-tooltip">{co.follower_name}</Tooltip>}>
                        <a href={co.follower_handle} target="_blank" rel="noopener noreferrer">
                          {/* {(co.image === "" || co.image === null) && <Image className="thumbnail_img" src={user_silhouette} thumbnail />} */}
                          {(co.follower_image_url === "" || co.follower_image_url === null) && <Image className="thumbnail_img" src={user_silhouette} thumbnail />}
                          {/* {(co.image !== "" && co.image !== null) && <Image className="thumbnail_img" src={co.image} thumbnail />} */}
                          {(co.follower_image_url !== "" && co.follower_image_url !== null) && <Image className="thumbnail_img" src={co.follower_image_url} thumbnail />}
                        </a>
                      </OverlayTrigger>
                    </li>)}
                  </ul>)}
              </Scrollbars>
            </div>
          </div>

        </div>

        <div>
          {/* Show only when total following is 0 */}
          {total_following === 0 && <button className="collapsible-b">No Following</button>}
          {/* Show only when total following is 1 to 4 */}
          <div className={1 <= total_following && total_following <= 4 ? null : "d-none"}>
            <button className="collapsible-b">Following</button>
            <div className="collapsible-content">
              <Scrollbars autoHide autoHeight autoHeightMin="0px" autoHeightMax="350px"
                renderTrackHorizontal={({ style, ...props }) => <div {...props} style={{ ...style }} />}>
                {following_user_grid.map(ro =>
                  <ul className="logo-list"> {ro.map(co =>
                    <li>
                      <OverlayTrigger id="overlay-id" placement="auto-end" overlay={<Tooltip id="name-tooltip">{co.followed_name}</Tooltip>}>
                        <a href={co.followed_handle} target="_blank" rel="noopener noreferrer">
                          {/* {(co.image === "" || co.image === null) && <Image className="thumbnail_img" src={user_silhouette} thumbnail />} */}
                          {(co.followed_image_url === "" || co.followed_image_url === null) && <Image className="thumbnail_img" src={user_silhouette} thumbnail />}
                          {/* {(co.image !== "" && co.image !== null) && <Image className="thumbnail_img" src={co.image} thumbnail />} */}
                          {(co.followed_image_url !== "" && co.followed_image_url !== null) && <Image className="thumbnail_img" src={co.followed_image_url} thumbnail />}
                        </a>
                      </OverlayTrigger>
                    </li>)}
                  </ul>)}
              </Scrollbars>
            </div>
          </div>

          {/* Show only when total following is greater than 4 */}
          <div className={total_following > 4 ? null : "d-none"}>
            <button className="collapsible-b" onClick={this.toggleFollowingLabel}>{toggleLabel1} {toggleLabel1 === "See" ? total_following : null} Following</button>
            <div className="collapsible-content">
              <Scrollbars autoHide autoHeight autoHeightMin="0px" autoHeightMax="350px"
                renderTrackHorizontal={({ style, ...props }) => <div {...props} style={{ ...style }} />}>
                {following_user_grid.map(ro =>
                  <ul className="logo-list"> {ro.map(co =>
                    <li>
                      <OverlayTrigger id="overlay-id" placement="auto-end" overlay={<Tooltip id="name-tooltip">{co.followed_name}</Tooltip>}>
                        <a href={co.followed_handle} target="_blank" rel="noopener noreferrer">
                          {/* {(co.image === "" || co.image === null) && <Image className="thumbnail_img" src={user_silhouette} thumbnail />} */}
                          {(co.followed_image_url === "" || co.followed_image_url === null) && <Image className="thumbnail_img" src={user_silhouette} thumbnail />}
                          {/* {(co.image !== "" && co.image !== null) && <Image className="thumbnail_img" src={co.image} thumbnail />} */}
                          {(co.followed_image_url !== "" && co.followed_image_url !== null) && <Image className="thumbnail_img" src={co.followed_image_url} thumbnail />}
                        </a>
                      </OverlayTrigger>
                    </li>)}
                  </ul>)}
              </Scrollbars>
            </div>
          </div>

        </div>

      </div>
    );
  }
}

// export default withStyles(styles)(FollowGrid);
export default FollowGrid;