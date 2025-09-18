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

  class fetchEquipments extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/getGetEquipmentNames',
        headers: {
          'p_equipment_resource_class': $variables.searchVar ? $variables.searchVar : "",
          'p_end_date': $variables.enddate ? $functions.formatDate($variables.enddate) : "",
          'p_start_date': $variables.startdate ? $functions.formatDate($variables.startdate) : "",
        },
        uriParams: {
          'p_equipment_resource_class': $variables.searchVar,
          'p_end_date': $variables.enddate ? $functions.formatDate($variables.enddate) : "",
          'p_start_date': $variables.startdate ? $functions.formatDate($variables.startdate) : "",
        },
      });

      if (response.ok) {
        const uniqRecords = await $functions.getUniqueEquipments(response.body.items);

        $variables.equipmentADP.data = uniqRecords;
      } else {
        await Actions.fireNotificationEvent(context, {
          summary: 'Failed to Fetch Equipment master',
          displayMode: 'transient',
        });
      }
    }
  }

  return fetchEquipments;
});
