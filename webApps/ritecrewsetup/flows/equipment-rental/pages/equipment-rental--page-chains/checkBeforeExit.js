/* Copyright (c) 2024, Oracle and/or its affiliates */

define([
  'vb/action/actionChain',
  'vb/action/actions'
], (
  ActionChain,
  Actions
) => {
  'use strict';

  class checkBeforeExit extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $application } = context;

      if ($page.variables.dirtyDataFlag) {
        // Open dialog
        $page.variables.dirtyDialogOpen = true;

        // Pause navigation
        const callFunctionResult = await $page.functions.checkWithUser();

        if (callFunctionResult === 'YES') {
          // Continue navigation
          return { cancelled: false };
        } else {
          // Stop Navigation
          await Actions.navigateToPage(context, {
            page: $application.currentPage.id,
            params: {
              dirtyDataFlag: $page.variables.dirtyDataFlag,
              objectId: $page.variables.objectId,
            },
          }, { id: 'stopNavigation' });

          // Stay same page
          return { cancelled: true };
        }
      }
    }
  }

  return checkBeforeExit;
});
