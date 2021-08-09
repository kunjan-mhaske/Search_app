import { Component } from 'react';

// CSS styles
// import { styles } from "../css-common"
// import { withStyles } from '@material-ui/core';

import { Container, Row, Col } from 'react-bootstrap';


class FollowGrid extends Component{
  constructor(props) {
    super(props);
      this.state = {

      };
    }
  render() {
    return(
      <div>
        <label>Hi there from component</label>

        <Container>
          <Row>
          <Col>1 of 2</Col>
          <Col>2 of 2</Col>
        </Row>
        <Row>
          <Col>1 of 3</Col>
          <Col>2 of 3</Col>
          <Col>3 of 3</Col>
        </Row>
          
        </Container>

      </div>
    );
  }
}

// export default withStyles(styles)(FollowGrid);
export default FollowGrid;