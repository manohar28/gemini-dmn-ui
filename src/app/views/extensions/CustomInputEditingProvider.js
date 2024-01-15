import { closest as domClosest } from 'min-dom';
import InputCell from 'dmn-js-decision-table/lib/features/decision-table-head/editor/components/InputCell';
import InputCellContextMenu from 'dmn-js-decision-table/lib/features/decision-table-head/editor/components/InputCellContextMenu';

class CustomInputEditingProvider {
  constructor(components, contextMenu, eventBus, renderer) {
    components.onGetComponent('cell', _ref => {
      var cellType = _ref.cellType;
      if (cellType === 'input-header') {
        return InputCell;
      }
    });
    components.onGetComponent('context-menu', function () {
      var context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      if (context.contextMenuType === 'input-edit') {
        return InputCellContextMenu;
      }
    });
    eventBus.on('input.edit', _ref2 => {
      var event = _ref2.event,
        input = _ref2.input;
      var target = event.target;
      var node = domClosest(target, 'th', true);
      var _node$getBoundingClie = node.getBoundingClientRect(),
        left = _node$getBoundingClie.left,
        top = _node$getBoundingClie.top;
      contextMenu.open({
        x: left,
        y: top,
        align: 'bottom-right'
      }, {
        contextMenuType: 'input-edit',
        input
      });
    });
  }
}
CustomInputEditingProvider.$inject = ['components', 'contextMenu', 'eventBus', 'renderer'];
//# sourceMappingURL=InputEditingProvider.js.map

export default {
  __init__: [ 'CustomInputEditingProvider' ],
  CustomInputEditingProvider: [ 'type', CustomInputEditingProvider ]
};
