import axios from 'axios';

const BASE_PATH = 'https://jsonplaceholder.typicode.com';

// eslint-disable-next-line import/prefer-default-export
export const getPosts = () =>
  new Promise((resolve, reject) => {
    axios
      .get(`${BASE_PATH}/photos`)
      .then((response) => {
          resolve(response.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
