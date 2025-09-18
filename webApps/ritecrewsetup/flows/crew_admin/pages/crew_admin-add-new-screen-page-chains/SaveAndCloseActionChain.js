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

  class SaveAndCloseActionChain extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $variables, $functions } = context;

      const callFunctionResult = await $page.functions.createPayloadMasterTab($page.variables.MasterTabObj, $page.variables.AssetsTabObj, $page.variables.ManufacturerTabObj, $page.variables.LocationTabObj, $page.variables.LeasingTabObj, $page.variables.CostingTabObj, $page.variables.fileObj);
      if (callFunctionResult !== undefined || callFunctionResult !== "") {

        const response = await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/postGetEquipmentMasterDetail',
          body: callFunctionResult,
          contentType: 'application/json',
        });

        if (response.ok) {

          await Actions.fireNotificationEvent(context, {
            summary: 'Equipment saved successfully',
            type: 'confirmation'        });

          if ($page.variables.AssetsTabObj.assetNumber) {

            const response2 = await Actions.callRest(context, {
              endpoint: 'projectNameList/MaintenanceForecasts',
              uriParams: {
                q: "AssetNumber='"+$variables.AssetsTabObj.assetNumber+"'",
              },
            });

            if (response2.body.items.length > 0) {
              const results = await ActionUtils.forEach(response2.body.items, async (item, index) => {

                const maintenancePaylodGenerator = await $functions.maintenancePaylodGenerator(response2.body.items[index], undefined, $variables.MasterTabObj.equipment_Name, $variables.MasterTabObj.equipment_Class, $variables.MasterTabObj.status, $application.user.email);

                const response3 = await Actions.callRest(context, {
                  endpoint: 'TimeRite_Ords_Service/EqpMasterWorkOrder',
                  body: maintenancePaylodGenerator,
                });
              }, { mode: 'serial' });
              
            }
            
          }

          await Actions.navigateBack(context, {
          });


        }
        else {

          await Actions.fireNotificationEvent(context, {
            summary: 'Error occurred while saving Equipment',
            type: 'error',
          });

        }
      }

    }
  }

  return SaveAndCloseActionChain;
});
