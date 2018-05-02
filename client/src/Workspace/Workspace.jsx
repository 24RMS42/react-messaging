import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Col } from 'react-bootstrap';

import { userActions } from '../_actions';

class Workspace extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fullName: '',
      displayName: '',
      email: '',
      password: '',
      submitted: false,
      workspaceList: [],
      workEmail: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSendEmail = this.handleSendEmail.bind(this);
  }
  
  componentDidMount() {
    fetch('http://localhost:7777/workspace/getList')
      .then(response => response.json())
      .then((data) => {
        const result = data.data;
        console.log('workspace list:----------', result);
        this.setState({ workspaceList: result });
      });
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({ submitted: true });
    const { fullName, displayName, email, password } = this.state;
    const { dispatch } = this.props;

    if (email && password && fullName && displayName) {
      const admin = {
        fullName: fullName,
        displayName: displayName,
        email: email,
        password: password
      }
      dispatch(userActions.createWorkspace(admin));
    }
  }

  handleSendEmail(e) {
    e.preventDefault();
    const { dispatch } = this.props;

    const workEmail = this.state.workEmail;
    console.log('work email:', workEmail);
    this.state.workspaceList.map(function(workspace, i){
      // console.log('==========', workspace.email);
      if (workspace.email === workEmail) {
        const data = {
          workEmail: workEmail,
          link: 'http://localhost:8080/' + workspace.displayName
        }
        console.log('==========', data);
        dispatch(userActions.sendEmail(data));

        return;
      }
    })
  }

  render() {
    const { registering } = this.props;
    const { submitted, fullName, displayName, email, password, workEmail } = this.state;
    return (
      <Col md={6} mdOffset={3}>
        <h2>Workspace List</h2>
        <div className="container">
          {
            this.state.workspaceList.map(function(workspace, i){
              // console.log('==========', workspace);
              return(
                <p key={i}><Link to="/login" className="btn btn-link">{workspace.fullName}</Link></p>
              )
            })
          }
        </div>
        <input type="text" className="form-control" name="workEmail" value={workEmail} onChange={this.handleChange} />
        <button className="btn btn-primary" onClick={this.handleSendEmail}>Send Email</button>
        <h2>Create Workspace</h2>
        <form name="form" onSubmit={this.handleSubmit}>
        <div className={`form-group${submitted && !fullName ? ' has-error' : ''}`}>
          <label htmlFor="firstName">Full Name</label>
          <input type="text" className="form-control" name="fullName" value={fullName} onChange={this.handleChange} />
          {submitted && !fullName &&
            <div className="help-block">Full Name is required</div>
          }
        </div>
        <div className={`form-group${submitted && !displayName ? ' has-error' : ''}`}>
          <label htmlFor="lastName">Display Name</label>
          <input type="text" className="form-control" name="displayName" value={displayName} onChange={this.handleChange} />
          {submitted && !displayName &&
            <div className="help-block">Display Name is required</div>
          }
        </div>
        <div className={`form-group${submitted && !email ? ' has-error' : ''}`}>
          <label htmlFor="email">Email</label>
          <input type="text" className="form-control" name="email" value={email} onChange={this.handleChange} />
          {submitted && !email &&
            <div className="help-block">Email is required</div>
          }
        </div>
        <div className={`form-group${submitted ? ' has-error' : ''}`}>
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
          {submitted && !password &&
            <div className="help-block">Password is required</div>
          }
          {submitted && password && password.length < 8 &&
            <div className="help-block">Your password must be at least 8 characters </div>
          }
        </div>
        <div className="form-group">
          <button className="btn btn-primary">Create Workspace</button>
          {registering &&
            <img src="../../assets/images/loading.gif" alt="" />
          }
        </div>
        </form>
      </Col>
    );
  }
}

function mapStateToProps(state) {
  const { authentication: { user } } = state;
  return { user };
}

const connectedWorkspace = connect(mapStateToProps)(Workspace);
export { connectedWorkspace as Workspace };