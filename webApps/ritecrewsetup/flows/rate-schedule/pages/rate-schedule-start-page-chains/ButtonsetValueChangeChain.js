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

  class ButtonsetValueChangeChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.value 
     */
    async run(context, { value }) {
      const { $page, $flow, $application } = context;

      // added partially, add insert to custom table
      await Actions.navigateBack(context, {
      }, { id: 'NavigateBack' });
    }
  }

  return ButtonsetValueChangeChain;
});
