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
  class InputDateValueChangeChain1 extends ActionChain {
    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.value 
     */
    async run(context, { value }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;
      $variables.locationDetails.p_rental_start_date = value;
      $flow.variables.headerobj.todate = value;
      $flow.variables.dateobj.endDate = value;
      debugger;
    }
  }
  return InputDateValueChangeChain1;
});
