define([
  'vb/action/actionChain',
  'vb/action/actions',
  'vb/action/actionUtils',
], (
  ActionChain,
  Actions,
  ActionUtils
) => {
  'use strict';

  class CancelPoDlgAction extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const poDlgClose = await Actions.callComponentMethod(context, {
        selector: '#poDlg',
        method: 'close',
      });
    }
  }

  return CancelPoDlgAction;
});
