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

  class SeachButtonActionChain extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/getGetManagerQuoteDetails',
        uriParams: {
          'p_customer_name': $variables.headerobj.customer? $variables.headerobj.customer:"",
          'p_rental_reservation_number': $variables.headerobj.reservation? $variables.headerobj.reservation:"",
        },
      });

      $variables.rentalADP.data = response.body.items;

      await Actions.fireDataProviderEvent(context, {
        refresh: null,
        target: $variables.rentalADP,
      });
    }
  }

  return SeachButtonActionChain;
});
