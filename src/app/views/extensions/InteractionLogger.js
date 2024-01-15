// logging component
function InteractionLogger(eventBus) {
    console.log('inside ')
    eventBus.on('addInput', function (event) {
        console.log('sample');
    });

}

InteractionLogger.$inject = ['eventBus'];

export default {
    __init__: [ 'InteractionLogger' ],
    InteractionLogger: [ 'type', InteractionLogger ]
};
  



