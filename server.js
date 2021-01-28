const express = require( 'express' );
const app = express();
const PORT = process.env.PORT || 5090;




app.use(express.json({urlenncoded:true}));

const apis = require( './routes/api' );
app.use('/', apis)

app.listen( PORT, () => console.log( `Server Started on port ${ PORT }` ) );