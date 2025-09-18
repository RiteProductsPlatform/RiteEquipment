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

  class maintenanceAssetValueChangeAction extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.key 
     * @param {any} params.data 
     * @param {any} params.metadata 
     */
    async run(context, { key, data, metadata }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      $variables.assetobj.assetName = data.NAME;
      $variables.assetobj.asset_id = data.asset_id;
      $variables.assetobj.item_id = data.item_id;
      $variables.assetobj.item_organization_id = data.item_organization_id;
      $variables.assetobj.serial_number = data.serial_number;
      $variables.assetobj.location_organization_id = data.location_organization_id;
      $variables.assetobj.location_type = data.location_type;
      $variables.assetobj.work_center_id = data.work_center_id;
      $variables.assetobj.work_center_code = data.work_center_code;
      $variables.assetobj.work_area_id = data.work_area_id;
      $variables.assetobj.work_area_code = data.work_area_code;
      $variables.assetobj.inventory_item_id = data.inventory_item_id;
      $variables.assetobj.item_description = data.item_description;
      $variables.assetobj.item_organization = data.item_organization;
      $variables.assetobj.location_organization = data.location_organization;


      //       "asset_number": "SC-01",
      // "name": "Scale",
      // "inventory_item_id": "300000157155301",
      // "item_description": "Scale for Production",
      // "serial_number": "Scale-0001",
      // "maintenance_asset_number": "SC-01",
      // "asset_id": "300000157155332",
      // "operating_org_id": "300000152243516",
      // "organization_name": "",
      // "maintenance_organization": "Seattle Maintenance",
      // "maintenance_organization_id": "300000152243516",
      // "location_type": "ORA_WORK_CENTER",
      // "location_organization": "Seattle Maintenance",
      // "work_center_id": "300000152320841",
      // "work_center_code": "PrdMnt",
      // "work_area": "FL-YPS"
    }
  }

  return maintenanceAssetValueChangeAction;
});
