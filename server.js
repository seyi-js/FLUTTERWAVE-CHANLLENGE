const express = require( 'express' );
const app = express();
const PORT = process.env.PORT || 5090;




app.use( express.json( { urlenncoded: true } ), ( err, req, res, next ) => {
    if ( err ) {
        return res.status( 400 ).json( {
            "message": "Invalid JSON payload passed.",
            "status": "error",
            "data": null
        })
    }
});

const apis = require( './routes/api' );
app.use('/', apis)

app.listen( PORT, () => console.log( `Server Started on port ${ PORT }` ) );