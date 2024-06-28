import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';
import dontenv from 'dotenv';
dontenv.config();
const secretKey = process.env.SECRET_KEY;

/**
 * Middleware to authenticate if user has a valid Authorization token
 * Authorization: Bearer <token>
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const userAuth = async (req, res, next) => {
  try {
    let bearerToken = req.header('Authorization');
    // console.log(bearerToken);
    if (!bearerToken)
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'Authorization token is required'
      };
    bearerToken = bearerToken.split(' ')[1];

    const user  = await jwt.verify(bearerToken, secretKey);
    req.body.userId= user.userId
    res.locals.user = user;
    res.locals.token = bearerToken;
    next();
  } catch (error) {
    next(error);
  }
};
