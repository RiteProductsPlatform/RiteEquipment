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

  class FileSelectionAction extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object[]} params.files 
     */
    async run(context, { files }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      const processFile = await $functions.processFile(files[0]);

      $variables.RowData.file_content = processFile.fileContent;
    }
  }

  return FileSelectionAction;
});
