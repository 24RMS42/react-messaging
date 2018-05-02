import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

function login(username, password) {
  function request(user) { return { type: userConstants.LOGIN_REQUEST, user }; }
  function success(user) { return { type: userConstants.LOGIN_SUCCESS, user }; }
  function failure(error) { return { type: userConstants.LOGIN_FAILURE, error }; }
  return (dispatch) => {
    dispatch(request({ username }));

    userService.login(username, password)
      .then(
        (user) => {
          dispatch(success(user));
          localStorage.setItem('email', username);
          history.push('/');
        },
        (error) => {
          dispatch(failure(error));
          dispatch(alertActions.error(error));
        },
      );
  };

}

function logout() {
  userService.logout();
  history.push('/login');
  return { type: userConstants.LOGOUT };
}

function register(user) {
  function request(user) { return { type: userConstants.REGISTER_REQUEST, user }; }
  function success(user) { return { type: userConstants.REGISTER_SUCCESS, user }; }
  function failure(error) { return { type: userConstants.REGISTER_FAILURE, error }; }

  return (dispatch) => {
    dispatch(request(user));

    userService.register(user)
      .then(
        (user) => {
          dispatch(success());
          history.push('/login');
          dispatch(alertActions.success('Registration successful'));
        },
        (error) => {
          dispatch(failure(error));
          dispatch(alertActions.error(error));
        },
      );
  };
}

function createWorkspace(workspace) {
  function request(user) { return { type: userConstants.REGISTER_REQUEST, user }; }
  function success(user) { return { type: userConstants.REGISTER_SUCCESS, user }; }
  function failure(error) { return { type: userConstants.REGISTER_FAILURE, error }; }

  return (dispatch) => {
    dispatch(request(workspace));

    userService.createWorkspace(workspace)
      .then(
        (item) => {
          dispatch(success());
          history.push('/login');
          dispatch(alertActions.success(item.message));
        },
        (error) => {
          dispatch(failure(error));
          dispatch(alertActions.error(error));
        },
      );
  };
}

function sendEmail(data) {
  function request(user) { return { type: userConstants.REGISTER_REQUEST, user }; }
  function success(user) { return { type: userConstants.REGISTER_SUCCESS, user }; }
  function failure(error) { return { type: userConstants.REGISTER_FAILURE, error }; }

  return (dispatch) => {
    dispatch(request(data));

    userService.sendEmail(data)
      .then(
        (item) => {
          dispatch(success());
          dispatch(alertActions.success(item.data.message));
        },
        (error) => {
          dispatch(failure(error));
          dispatch(alertActions.error(error));
        },
      );
  };
}

export const userActions = {
  login,
  logout,
  register,
  createWorkspace,
  sendEmail
};
