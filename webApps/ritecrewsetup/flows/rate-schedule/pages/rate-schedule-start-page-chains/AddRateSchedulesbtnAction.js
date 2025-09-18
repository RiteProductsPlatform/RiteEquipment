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

  class AddRateSchedulesbtnAction extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application } = context;

      await Actions.resetVariables(context, {
        variables: [
    '$page.variables.scheduleTblADP.data',
  ],
      });

      const callComponentMethodOjDialog16537378171OpenResult = await Actions.callComponentMethod(context, {
        selector: '#oj-dialog-1653737817-1',
        method: 'open',
      }, { id: 'openDialogRate' });

      await Actions.callChain(context, {
        chain: 'AddblankSchedule',
      });
    }
  }

  return AddRateSchedulesbtnAction;
});
