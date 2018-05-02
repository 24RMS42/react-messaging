import { authHeader } from '../_helpers';


function handleResponse(response) {
  if (!response.ok) {
    return Promise.reject(response.statusText);
  }
  return response.json();
}

function login(email, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  };
  return fetch('http://localhost:7777/user/login', requestOptions)
    .then((response) => {
      if (!response.ok) {
        return Promise.reject(response.statusText);
      }
      return response.json();
    })
    .then((user) => {
      // login successful if there's a jwt token in the response
      if (user && user.data) {
        localStorage.setItem('user', JSON.stringify(user));
      }
      return user;
    });
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('user');
}

function getById(id) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };
  return fetch(`/users/${id}`, requestOptions).then(handleResponse);
}

function register(user) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  };
  return fetch('http://localhost:7777/user/register', requestOptions).then(handleResponse);
}

function update(user) {
  const requestOptions = {
    method: 'PUT',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  };

  return fetch(`/users/${user.id}`, requestOptions).then(handleResponse);
}

function createWorkspace(admin) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(admin),
  };
  return fetch('http://localhost:7777/workspace/new', requestOptions).then(handleResponse);
}

function sendEmail(data) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  };
  return fetch('http://localhost:7777/workspace/sendEmail', requestOptions).then(handleResponse);
}

function getWorkspaceList(admin) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  };
  return fetch('http://localhost:7777/workspace/getList', requestOptions).then(handleResponse);
}

export const userService = {
  login,
  logout,
  register,
  getById,
  update,
  createWorkspace,
  sendEmail
};
