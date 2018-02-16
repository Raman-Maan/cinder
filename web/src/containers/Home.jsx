import React, { Component } from 'react';
import { Button, Container, Row, Col } from 'reactstrap';

import './styles/Home.css';
import Recommendation from './Recommendation';
import MatchesList from '../components/MatchesList';
import UserDetail from '../components/UserDetail';
import Auth from '../utils/authService';

class Home extends Component {
  constructor(props) {
    super(props);

    this.fetchUserDetail = this.fetchUserDetail.bind(this);
    this.onBackButtonClick = this.onBackButtonClick.bind(this);
    this.state = {
      matches: [],
      userDetail: false,
      buttonSelected: false
    };
  }

  onBackButtonClick() {
    this.setState({ buttonSelected: true });
    this.setState({ userDetail: false });
  }

  componentDidMount() {
    this.fetchUserMatches();
  }

  fetchUserDetail(id) {
    fetch(`/api/users/${Auth.loggedInUser.id}/matches/${id}`)
      .then(res => res.json())
      .then(res => {
        this.setState({
          userDetail: {
            userID: res.userID,
            userName: res.userName,
            userPics: res.userPics,
            userAge: res.userAge,
            userGender: res.userGender,
            matchTime: new Date(),
            userBio: res.userBio ? res.userBio : 'No bio'
          }
        });
      })
      .catch(err => err);
  }

  fetchUserMatches() {
    fetch(`/api/users/${Auth.loggedInUser.id}/matches`)
      .then(res => res.json())
      .then(res => {
        this.setState({
          matches: res.map(x => ({
            id: x.userID,
            title: x.userName,
            subtitle: 'You\'ve just matched!',
            date: new Date(x.matchDate),
            img: x.primaryPic
          }))
        });
      })
      .catch(err => console.error(err));
  }

  render() {
    let rightPane = null;

    if (!this.state.userDetail) {
      rightPane = <Recommendation />;
    } else {
      rightPane = (
        <div>
          <Button
            outline
            color="primary"
            className="BackButton"
            onClick={() => this.onBackButtonClick()}
          >
            Back
          </Button>
          <UserDetail
            img={this.state.userDetail.userPics}
            name={this.state.userDetail.name}
            age={this.state.userDetail.userAge}
            bio={this.state.userDetail.userBio}
            matchDate={this.state.userDetail.matchTime}
          />
        </div>
      );
    }
    return (
      <div className="Home">
        <Container fluid>
          <Row className="full">
            <Col sm="4">
              <MatchesList
                matches={this.state.matches}
                clickHandler={this.fetchUserDetail.bind(this)}
              />
            </Col>
            <Col sm="8">{rightPane}</Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Home;
