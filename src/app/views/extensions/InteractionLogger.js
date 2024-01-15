// logging component
function InteractionLogger(eventBus) {
    console.log('inside ')
    eventBus.on('element.hover', function (event) {
        console.log('sample');
    });

}

InteractionLogger.$inject = ['eventBus'];

export default {
    __init__: [ 'InteractionLogger' ],
    InteractionLogger: [ 'type', InteractionLogger ]
};
  



