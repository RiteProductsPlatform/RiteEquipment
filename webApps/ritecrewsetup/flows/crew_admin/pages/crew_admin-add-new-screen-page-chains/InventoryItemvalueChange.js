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

  class InventoryItemvalueChange extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.key 
     * @param {any} params.data 
     * @param {any} params.metadata 
     */
    async run(context, { key, data, metadata }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      $variables.AssetsTabObj.inventory_Item_id = data.inventoryItemId;
      $variables.AssetsTabObj.inventory_Item = data.name;

      const response = await Actions.callRest(context, {
        endpoint: 'projectNameList/get11_13_18_05PurchaseOrders',
      });

      $variables.purchaseOrderADP.data = response.body.items;

      $variables.selectedInvItem = data.name;
      $variables.MasterTabObj.equipment_Name = data.description;
      $variables.MasterTabObj.equipment_desc = data.longDescription;
            $variables.MasterTabObj.equipment_Num =  $variables.selectedInvItem + ( $variables.ManufacturerTabObj.serial_Num ? "-" + $variables.ManufacturerTabObj.serial_Num  : '');
    }
  }

  return InventoryItemvalueChange;
});
