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

  class SearchBtnAction extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      const validateGroup = await $application.functions.validateGroup('searchgroup');

      if (validateGroup === 'valid') {

        await Actions.resetVariables(context, {
          variables: [
    '$page.variables.EquipmentTblADP.data',
  ],
        });

        const response = await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/EqpUtilizationReport',
          uriParams: {
            'p_equipment_resource_class': $variables.searchObj.class ? $variables.searchObj.class : "",
            'p_from_date': $functions.formatDate($variables.searchObj.from_date),
            'p_to_date': $functions.formatDate($variables.searchObj.to_date),
            'p_report_name': $variables.searchObj.report,
            'p_equipment_name': $variables.searchObj.name ? $variables.searchObj.name : "",
          },
        });

     
           if (response.ok) {
             if (response.body.items.length > 0) {
               const columnsheaderGenerator = await $functions.columnsheaderGenerator(JSON.stringify(response.body.items));
               const pieChartData = await $functions.pieChartData(JSON.stringify(response.body.items));
               $variables.columns = columnsheaderGenerator;
               $variables.EquipmentTblADP.data = response.body.items;
               $variables.chartArray = pieChartData;
             }else{
               await Actions.resetVariables(context, {
                 variables: [
            '$page.variables.EquipmentTblADP.data',
          ],
               });
               await Actions.fireNotificationEvent(context, {
                 summary: 'No Data found for selected report',
                 displayMode: 'transient',
                 type: 'info',
               });
               
             }
           } else {
             await Actions.fireNotificationEvent(context, {
               summary: 'Failed to fetch Report',
               displayMode: 'transient',
             });
           }
        
      }

    }
  }

  return SearchBtnAction;
});
