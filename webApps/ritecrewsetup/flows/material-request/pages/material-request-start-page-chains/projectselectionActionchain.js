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

  class projectselectionActionchain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.key 
     * @param {any} params.data 
     * @param {any} params.metadata 
     * @param {number} params.index 
     * @param {any} params.current 
     */
    async run(context, { key, data, metadata, index, current }) {
      const { $page, $flow, $application, $constants, $variables } = context;
debugger;
      $variables.ftorowData.project_id = data.ProjectId;
      $variables.ftorowData.project_number = data.ProjectNumber;
    }
  }

  return projectselectionActionchain;
});
