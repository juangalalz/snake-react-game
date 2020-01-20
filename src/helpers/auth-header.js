export function authHeader() {
  // return authorization header with jwt token
  const token = localStorage.getItem('token');
  // const token = '60a87a2c73b91115a79d498974db287e';
  if (token) {
    return { 'token': token };
  } else {
    return {};
  }
}
