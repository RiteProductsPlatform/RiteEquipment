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

  class ButtonActionChain7 extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      if (($variables.payloadADP.data.length < 1)) {
        await Actions.fireNotificationEvent(context, {
          summary: 'Please Add Equipments',
        });

        return;
      }

      // ---- TODO: Add your code here ---- //
      console.log('$$$$$$$$$$', $variables.payloadADP.data);

 

        const results = await ActionUtils.forEach($variables.payloadADP.data, async (item, index) => {

          const response = await Actions.callRest(context, {
            endpoint: 'TimeRite_Ords_Service/postEQPRite_RequestCartSubmit',
            body: item,
          });
        }, { mode: 'serial' });

        await Actions.fireNotificationEvent(context, {
          type: 'confirmation',
          summary: $variables.reqNumber + " Submitted Successfully",
        });
    
    }
  }

  return ButtonActionChain7;
});
