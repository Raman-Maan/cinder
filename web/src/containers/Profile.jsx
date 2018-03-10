import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Container,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input
} from 'reactstrap';
import { fetchProfile, hideProfile } from '../actions';

import './styles/Profile.css';

export class Profile extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
  }

  toggle(e) {
    e.stopPropagation();
    this.props.hideProfile();
  }

  componentDidMount() {
    this.props.fetchData();
  }

  renderBody() {
    return (
      <div>
        <div className="name">
          <h5>Display Name</h5>
          <Input type="text" defaultValue={this.props.profile.UserName} />
        </div>
        <hr />
        <div className="birthday">
          <h5>Birthday</h5>
          <Input
            type="date"
            defaultValue={
              new Date(this.props.profile.Birthday).toJSON().split('T')[0]
            }
          />
        </div>
        <hr />
        <div className="bio">
          <h5>User Bio</h5>
          <Input type="textarea" defaultValue={this.props.profile.Bio} />
        </div>
      </div>
    );
  }

  render() {
    const modal = !this.props.view ? null : (
      <div className="profile modal" onClick={e => this.toggle(e)}>
        <Container>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <ModalHeader toggle={e => this.toggle(e)}>My Profile</ModalHeader>
            <ModalBody>{this.renderBody()}</ModalBody>
            <ModalFooter>
              <Button color="secondary" outline onClick={e => this.toggle(e)}>
                Discard Changes
              </Button>
              <Button color="primary">Save Changes</Button>
            </ModalFooter>
          </div>
        </Container>
      </div>
    );

    return <div>{modal}</div>;
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
  loading: state.profileIsLoading,
  errored: state.profileHasErrored,
  open: state.profileOpened,
  view: state.profileView
});

const mapDispatchToProps = dispatch => ({
  fetchData: () => dispatch(fetchProfile()),
  hideProfile: () => dispatch(hideProfile())
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
