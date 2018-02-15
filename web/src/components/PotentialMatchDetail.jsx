import React from 'react';
import { Button } from 'reactstrap';
import './styles/PotentialMatchDetail.css';

export default class PotentialMatchDetail extends React.Component {
  render() {
    if (!this.props.potentialMatchDetail) {
      return (
        <div className="UserDetailEmpty">
          <div className="empty">
            <h3 className="msg align-self-center">
              There's no one new around you.
            </h3>
          </div>
        </div>
      );
    }

    return (
      <div className="UserDetail">
        <img
          className="userImage"
          src={this.props.potentialMatchDetail.img}
          alt=""
        />
        <br />
        <div className="UserInfo">
          <span className="UserNameAndAge">
            {this.props.potentialMatchDetail.title},
            {this.props.potentialMatchDetail.age}
          </span>
          <br />
          <span className="UserBio">
            {this.props.potentialMatchDetail.subtitle}
          </span>
        </div>
        <div className="buttons">
          <Button
            className="NotButton"
            color="danger"
            size="lg"
            onClick={this.props.handlePass}
          >
            NOT
          </Button>{' '}
          <Button
            className="HotButton"
            color="success"
            size="lg"
            onClick={this.props.handleLike}
          >
            HOT
          </Button>
        </div>
      </div>
    );
  }
}
