
//steps
const steps = {
    'START': {
        request: '?',
        response: 'BUY or SELL'
    },
    'STEP_1': {
        request: 'BUY',
        response: 'ISIN'
    },
    'STEP_2': {
        request: 'DE0007164600',
        response: 'ISIN=DE0007164600 <br /> Quantity'
    },
    'STEP_3': {
        request: '100',
        response: 'Quantity=100 Units <br /> Price'
    },
    'STEP_4': {
        request: '10.96',
        response: 'Price=10.96'
    }
};

module.exports = steps;