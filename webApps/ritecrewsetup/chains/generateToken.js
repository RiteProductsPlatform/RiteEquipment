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

  class generateToken extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $application, $constants, $variables, $functions } = context;

     const jwt =  await $functions.getUsernameFromJwt($variables.jwt);

      $variables.user = jwt ? jwt : $application.user.username;

      // const response = await Actions.callRest(context, {
      //   endpoint: 'TimeRite_Ords_Service/getEQPRite_UserRoleDetails',
      //   uriParams: {
      //     'p_username': $variables.user,
      //   },
      // });

      const response5 = await Actions.callRest(context, {
        endpoint: 'EQUIPMENT_RITE_OIC/getEQUIPMENT_RITEEQP_USERS_JOB_ROLES1_0UsersJobRoles',
        uriParams: {
          'p_username': $variables.user,
        },
      });
      const navigationContent = await $functions.getNavigationContent(response5.body.items);

      $variables.restrictednavTree = navigationContent;

      const results = await Promise.all([
        async () => {

          const response2 = await Actions.callRest(context, {
            endpoint: 'fusion_cloud/getFscmRestApiResources11_13_18_05GenericLookups',
          });
// debugger;
          $variables.eqpclassAdp.data = response2.body.items[0].lookupCodes;
        },
        async () => {

          const response3 = await Actions.callRest(context, {
            endpoint: 'fusion_cloud/getEqpSubClass',
          });

          $variables.eqpsubclassAdp.data = response3.body.items[0].lookupCodes;
        },
         async () => {

          const response4 = await Actions.callRest(context, {
            endpoint: 'fusion_cloud/getFscmRestApiResources11_13_18_05GenericLookups2',
          });

          $variables.eqpTypeAdp.data = response4.body.items[0].lookupCodes;

         
        },
      ].map(sequence => sequence()));
     
    }
  }

  return generateToken;
});
