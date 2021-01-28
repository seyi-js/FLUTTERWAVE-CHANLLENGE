




const validateField = ( ex ) => {
    let fieldArray = ex.rule.field.split( '.' );
    let value;
    
    if ( fieldArray.length === 1 ) {
        value = ex.data[ fieldArray[ 0 ] ];
        
    } else {
      value=  ex.data[ fieldArray[ 0 ] ][ fieldArray[ 1 ] ];
    }
// console.log(value)
    return value;
};




const validateData =async ( data ) => {
    let rules = [
        {
            name: "eq",
            condition: '>'
        },
        {
            name: ' neq',
            condition: '!=='
        },
        {
            name: 'gte',
            
            condition: '>='
        },
        {
            name: 'gt',
            condition: '>'
        },

        {
            name: 'contains',
            condition: 'contains'
        }
    ];

    try {
        let e = await rules.find( e => e.name ===  data.rule.condition);
   

        if ( e.name !== 'contains' ) {
            let value = validateField( data );
         
            if ( eval( value + e.condition + data.rule.condition_value ) ) {
                return 'Success'
            } else {
                return 'Fail'  
            }
        } else {
            let value = validateField( data );
            // console.log(value)
            // let result = value.find( e => e === data.rule.condition_value );
            let result = value == data.rule.condition_value;
            // console.log(result)
            if (result ) {
                return 'Success'
            } else {
                return 'Fail'  
            }
        }
    
    } catch (err) {
        return 'Fail'
    }


};

  module.exports={validateData,validateField}
