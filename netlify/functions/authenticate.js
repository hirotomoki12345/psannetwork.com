// authenticate.js

const jwt = require('jsonwebtoken');

exports.handler = async (event, context) => {
  try {
    const { authorization } = event.headers;
    if (!authorization) {
      return {
        statusCode: 401,
        body: JSON.stringify({ message: 'Unauthorized' }),
      };
    }

    const token = authorization.replace('Bearer ', '');
    const decoded = jwt.verify(token, 'hamanan'); // 本当に安全な方法で秘密鍵を保護する必要があります

    if (decoded.role !== 'admin') {
      return {
        statusCode: 403,
        body: JSON.stringify({ message: 'Forbidden' }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Authenticated' }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' }),
    };
  }
};
