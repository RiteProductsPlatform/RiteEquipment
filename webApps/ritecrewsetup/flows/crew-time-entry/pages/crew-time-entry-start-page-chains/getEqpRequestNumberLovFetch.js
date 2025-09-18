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

  class getEqpRequestNumberLovFetch extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {{hookHandler:'vb/RestHookHandler'}} params.configuration
     */
    async run(context, { configuration }) {
      const { $page, $flow, $application, $constants, $variables } = context;
      const callRestEndpoint1 = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/getEqpRequestNumberLov',
        uriParams: {
          'page_name': 'crew-time-entry',
        },
        responseType: 'getEqpRequestNumberLovResponse',
        hookHandler: configuration.hookHandler,
        requestType: 'json',
      });

      return callRestEndpoint1;
    }
  }

  return getEqpRequestNumberLovFetch;
});
