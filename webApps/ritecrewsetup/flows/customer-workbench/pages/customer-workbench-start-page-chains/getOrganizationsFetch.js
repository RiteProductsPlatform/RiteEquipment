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

  class getOrganizationsFetch extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {{hookHandler:'vb/RestHookHandler'}} params.configuration
     */
    async run(context, { configuration }) {
      const { $page, $flow, $application, $constants, $variables } = context;
      const callRestEndpoint1 = await Actions.callRest(context, {
        endpoint: 'Hcm_Latest/getOrganizations',
        uriParams: {
          Name: $variables.salescontractobj.OrgName?$variables.salescontractobj.OrgName:"",
        },
        responseType: 'getOrganizationsResponse',
        hookHandler: configuration.hookHandler,
        requestType: 'json',
      });

      return callRestEndpoint1;
    }
  }

  return getOrganizationsFetch;
});
