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

  class SelectValueItemChangeChain10 extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.key 
     * @param {any} params.data 
     * @param {any} params.metadata 
     */
    async run(context, { key, data, metadata }) {
      const { $page, $flow, $application } = context;
      $page.variables.projectNumber = data.ProjectName;
      $page.variables.projectId = data.ProjectId;
      $page.variables.projectIdNumber = data.ProjectId;

      // ---- TODO: Add your code here ---- //
      console.log(data.ProjectId);
    }
  }

  return SelectValueItemChangeChain10;
});
