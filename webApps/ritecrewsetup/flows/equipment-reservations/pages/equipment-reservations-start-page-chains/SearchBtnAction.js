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

  class SearchBtnAction extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      await Actions.resetVariables(context, {
        variables: [
    '$page.variables.tableADP',
    '$page.variables.tableADP.data',
  ],
      });

      await Actions.fireDataProviderEvent(context, {
        target: $variables.tableADP,
        refresh: null,
      });

      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/getGetReservationStatus',
        uriParams: {
          eqpName: $variables.eqpName?$variables.eqpName:'',
          eqpClass: $variables.eqClass?$variables.eqClass:'',
          reqName: $variables.reqName?$variables.reqName:'',
          status: $variables.status?$variables.status:'',
          reqStatus: $variables.status?$variables.status:'',
          projectNumber: $variables.projectNumber?$variables.projectNumber:'',
          'request_type': $variables.request_type ? $variables.request_type : '',
          customer: $variables.customer_name ? $variables.customer_name : '',
          'eqp_request_number': $variables.requestnumber ? $variables.requestnumber : "",
          'equipment_cart_number': $variables.cartNumber ?  $variables.cartNumber:"",
          'p_page_name': 'project-inspection',
        },
      });

      $variables.tableADP.data = response.body.items;

      const response2 = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/getQuoteDetails2',
      });

      $variables.rentalADP.data = response2.body.items;
    }
  }

  return SearchBtnAction;
});
