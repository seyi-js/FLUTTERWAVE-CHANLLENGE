const {validateData,validateField} =require('./helper')
exports.validateEndpoint = async ( req, res, next ) => {
    const { rule, data } = req.body;
    //Validate if present
    if ( !rule ) {
        return res.json( {
            "message": "rule is required.",
            "status": "error",
            "data": null
        } );
    };
    if ( !data ) {
        return res.json( {
            "message": "data is required.",
            "status": "error",
            "data": null
        } );
    };

    //Validate type
    if ( typeof ( rule ) !== 'object' ) {
        return res.status( 400 ).json( {
            "message": "rule should be an object.",
            "status": "error",
            "data": null
        } );
    };

    //Validate Field
  
    let value = validateField( req.body )
    // console.log(value)
    if ( !value ) {
        return res.status( 400 ).json( {
            "message": `field ${ rule.field } is missing from data.`,
            "status": "error",
            "data": null
        } );
    };

    try {
        //Validation of data using the rule
        let result = await validateData( req.body );
        console.log( result )
        if ( result === 'Success' ) {
            return res.status( 200 ).json( {
                "message": `field ${ rule.field } successfully validated.`,
                "status": "success",
                "data": {
                    "validation": {
                        "error": false,
                        "field": rule.field,
                        "field_value": value,
                        "condition": rule.condition,
                        "condition_value": rule.condition_value
                    }
                }
            }
            );
        } else {
            return res.status( 400 ).json( {
                "message": `field ${ rule.field } failed validation.`,
                "status": "error",
                "data": {
                    "validation": {
                        "error": true,
                        "field": rule.field,
                        "field_value": value,
                        "condition": rule.condition,
                        "condition_value": rule.condition_value
                    }
                }
            } );
        };
    } catch ( err ) {
        console.log( err )
    }
};



exports.getDataFromRequest = ( req, res, next ) => {
    const userAgent = req.headers[ 'user-agent' ];
    const host = req.headers[ 'host' ];
    let remoteIp;
    if ( process.env.NODE_ENV === 'production' ) {


        if ( req.headers[ 'x-forwarded-for' ] ) {
            if ( typeof(req.headers[ 'x-forwarded-for' ]) === Array ) {
               remoteIp= req.headers[ 'x-forwarded-for' ].split(',')[1]
            } else {
                remoteIp =req.headers[ 'x-forwarded-for' ]
        }
    }
        if ( !remoteIp ) {
            const ip = req.connection.remoteAddress ||
            req.socket.remoteAddress 
            // ( req.connection.socket ? req.connection.socket.remoteAddress : null );
            remoteIp = ip.replace( '::ffff:', '' );
       }
        console.log(req.headers['x-forwarded-for'])
        if ( userAgent && host) {
            const data = {
                userAgent,
                host,
                remoteIp,
                endpoint: req.originalUrl,
                referrer:req.headers.referer,
                time:new Date().toLocaleString()
                
            };
            console.log(data)
           
            next();
        } else {
           ;
            let dataToLog = {
                endpoint: req.originalUrl,
                host:req.headers.host,
                date: Date.now(),
                message:'Problem getting data from request'
            }
            console.log( dataToLog )
            next()
        }
    
    } else {
        const data = {
            userAgent:'testing122348jbjjhgds',
            host:'testing',
            remoteIp:'1234454666464',
            endpoint: 'testing.com',
            referrer:'testing.com',
            time:new Date().toLocaleString()
            
        };
       
        console.log(data)
        next()
    }
    
};
