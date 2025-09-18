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

  class ButtonActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.key 
     * @param {number} params.index 
     * @param {any} params.current 
     */
    async run(context, { key, index, current }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      $flow.variables.selectedReservationNumber = current.rental_reservation_number;

      if (current.status === 'Quote Requested') {


        const toEquipApprovalQuote2 = await Actions.navigateToPage(context, {
          page: 'equip-approval-quote2',
        });
      } else {
        await Actions.callComponentMethod(context, {
          selector: '#oj-dialog-488045790-1',
          method: 'open',
        });
      }
    }
  }

  return ButtonActionChain;
});
