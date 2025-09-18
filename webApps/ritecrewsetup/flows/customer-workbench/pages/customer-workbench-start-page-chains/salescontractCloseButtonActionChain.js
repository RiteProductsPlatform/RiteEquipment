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

  class salescontractCloseButtonActionChain extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const salesContractClose = await Actions.callComponentMethod(context, {
        selector: '#salesContract',
        method: 'close',
      });
    }
  }

  return salescontractCloseButtonActionChain;
});
