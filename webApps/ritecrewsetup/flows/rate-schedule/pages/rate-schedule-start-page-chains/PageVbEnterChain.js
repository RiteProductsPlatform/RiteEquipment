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

  class PageVbEnterChain extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $variables } = context;

      $page.variables.location_based_differential = undefined;

      const response = await Actions.callRest(context, {
        endpoint: 'businessObjects/getall_HoursType',
      });

      $variables.allHourTypes = response.body.items;
    }
  }

  return PageVbEnterChain;
});
