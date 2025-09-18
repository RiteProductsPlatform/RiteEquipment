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

  class ButtonActionChain5 extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      await Actions.resetVariables(context, {
        variables: [
    '$page.variables.requestor_name',
    '$page.variables.selectedParams.projectNameId',
    '$page.variables.selectedEquipmentClass',
    '$page.variables.selectedEquipmentName',
  ],
      });
    }
  }

  return ButtonActionChain5;
});
