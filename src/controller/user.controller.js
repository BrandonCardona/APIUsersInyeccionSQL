import database from '../config/mysql.config.js';
import Response from '../domain/response.js';
import logger from '../util/logger.js';
import QUERY from '../query/user.query.js'

const HttpStatus = {
    OK: { code: 200, status: 'OK'},
    CREATED: { code: 201, status: 'CREATED'},
    NO_CONTENT: { code: 204, status: 'NO_CONTENT'},
    BAD_REQUEST: { code: 400, status: 'BAD_REQUEST'},
    NOT_FOUND: { code: 404, status: 'NOT_FOUND'},
    INTERNAL_SERVER_ERROR: { code: 500, status: 'INTERNAL_SERVER_ERROR'}
};

export const getUsers = (req, res)=>{

    const {name, email, phone} = req.headers;
    logger.info(`${req.method} ${req.originalUrl}, fetching users`);
    if (name.match(/^[0-9a-zA-Z]+$/) && email.match(/^[0-9a-zA-Z@.]+$/) && phone.match(/^[0-9a-zA-Z]+$/)) {
        
        database.query(QUERY.SELECT_USERS, [name, email, phone], (error, results) =>{
            if(!results) {
                res.status(HttpStatus.OK.code).send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `No users found`));
            }else{
                res.status(HttpStatus.OK.code).send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `Users retrieved`, { users : results}));
            }
        });
    } else {
        res.status(HttpStatus.BAD_REQUEST.code).send(new Response(HttpStatus.BAD_REQUEST.code, HttpStatus.BAD_REQUEST.status, `Es una inyeccion SQL`));
    }  
};


export default HttpStatus;


