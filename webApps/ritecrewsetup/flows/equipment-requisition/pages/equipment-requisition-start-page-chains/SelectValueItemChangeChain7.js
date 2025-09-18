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

  class SelectValueItemChangeChain7 extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.key 
     * @param {any} params.data 
     * @param {any} params.metadata 
     */
    async run(context, { key, data, metadata }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      $variables.availableQuantity = data.equipment_count?data.equipment_count:0;
      $variables.nlrResource = data.non_labor_resource;
      $variables.nlrResourceOrg = data.non_labor_resource_org;
    }
  }

  return SelectValueItemChangeChain7;
});
