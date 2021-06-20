const express = require( 'express' );
const Router = express.Router();
const {validateEndpoint,getDataFromRequest } = require('./middleware')

//@desc GET 

Router.get( '/',getDataFromRequest, ( req, res ) => {
   
    const dataToSend = {
        "message": "Validation API",
        "status": "success",
        "data": {
            "name": "Samuel Oluwaseyi Adebayo",
            "github": "@seyi-js",
            "email": "sadebayo147@gmail.com",
            "mobile": "08147012359",
            "twitter": "@OLU_WASEYI"
        }
    };
      
    res.json( dataToSend );
} );


//@desc POST VALIDATION ROUTE
Router.post( '/validate-rule',getDataFromRequest, validateEndpoint,( req, res ) => {
    
} );


module.exports = Router;





  
//   console.log(typeof(+('0' + '1')));