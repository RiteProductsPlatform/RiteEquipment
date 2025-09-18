define([], () => {
  'use strict';

  class PageModule {

    selectedVal(val) {

    }
    convertfileintoKb(file) {
      let sizeInKB;
      const sizeInBytes = file.size;
      return sizeInKB = (sizeInBytes / 1024).toFixed(2);
    }

    formatDate(inputDate) {
      const date = new Date(inputDate);
      const day = String(date.getDate()).padStart(2, '0');
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const month = monthNames[date.getMonth()];
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    }

    scheduleZGenerator(mydata) {
      let data;
      try {
        data = JSON.parse(mydata); // Parse the input data
      } catch (error) {
        console.error("Invalid JSON data:", error);
        return {}; // Return an empty object or handle the error
      }

      let obj = {
        "down_cost": "",
        "down_bill": "",
        "down_currency": "",
        "down_start_date": "",
        "down_end_date": "",

        "mob_cost": "",
        "mob_bill": "",
        "mob_currency": "",
        "mob_start_date": "",
        "mob_end_date": "",

        "transp_cost": "",
        "transp_bill": "",
        "transp_currency": "",
        "transp_start_date": "",
        "transp_end_date": "",

        "usage_cost": "",
        "usage_bill": "",
        "usage_currency": "",
        "usage_start_date": "",
        "usage_end_date": ""
      };

      data.forEach(item => {
        switch (item.rate_types) {
          case "Downtime":
            obj.down_cost = item.cost_rate != null ? item.cost_rate : "";
            obj.down_bill = item.bill_rate != null ? item.bill_rate : "";
            obj.down_currency = item.currency != null ? item.currency : "";
            obj.down_start_date = item.rate_type_start_date != null ? item.rate_type_start_date : "";
            obj.down_end_date = item.rate_type_end_date != null ? item.rate_type_end_date : "";
            break;
          case "Mobilization":
            obj.mob_cost = item.cost_rate != null ? item.cost_rate : "";
            obj.mob_bill = item.bill_rate != null ? item.bill_rate : "";
            obj.mob_currency = item.currency != null ? item.currency : "";
            obj.mob_start_date = item.rate_type_start_date != null ? item.rate_type_start_date : "";
            obj.mob_end_date = item.rate_type_end_date != null ? item.rate_type_end_date : "";
            break;
          case "Transportation":
            obj.transp_cost = item.cost_rate != null ? item.cost_rate : "";
            obj.transp_bill = item.bill_rate != null ? item.bill_rate : "";
            obj.transp_currency = item.currency != null ? item.currency : "";
            obj.transp_start_date = item.rate_type_start_date != null ? item.rate_type_start_date : "";
            obj.transp_end_date = item.rate_type_end_date != null ? item.rate_type_end_date : "";
            break;
          case "Usage":
            obj.usage_cost = item.cost_rate != null ? item.cost_rate : "";
            obj.usage_bill = item.bill_rate != null ? item.bill_rate : "";
            obj.usage_currency = item.currency != null ? item.currency : "";
            obj.usage_start_date = item.rate_type_start_date != null ? item.rate_type_start_date : "";
            obj.usage_end_date = item.rate_type_end_date != null ? item.rate_type_end_date : "";
            break;
          default:
            console.log("Unknown rate type:", item.rate_types);
            break;
        }
      });

      return obj; // Return the modified object
    }

    maintenancePaylodGenerator(data, equipment_id, equipment_name, equipment_resource_class, active_flag, user) {
      let obj = {
        "p_equipment_id": equipment_id,
        "p_equipment_name": equipment_name,
        "p_equipment_resource_class": equipment_resource_class,
        "p_active_flag": active_flag === "1" ? true : false,
        "p_asset_id": data.AssetId,
        "p_asset_number": data.AssetNumber,
        "p_asset_description": data.AssetDescription,
        "p_asset_serial_number": data.AssetSerialNumber,
        "p_asset_operating_orgid": data.AssetOperatingOrgId,
        "p_asset_operating_orgcode": data.AssetOperatingOrgCode,
        "p_asset_location_code": data.AssetLocationCode,
        "p_asset_location": data.AssetLocation,
        "p_item_id": data.ItemId,
        "p_item_number": data.ItemNumber,
        "p_forecast_duedate": this.formatDate(data.ForecastDueDate),
        "p_workorder_id": data.WorkOrderId,
        "p_workorder_number": data.WorkOrderNumber,
        "p_workorder_organization_id": data.ForecastOrganizationId,
        "p_workorder_organization_code": data.ForecastOrganizationCode,
        "p_workorder_startdate": this.formatDate(data.WorkOrderStartDate),
        "p_workorder_statuscode": data.WorkOrderStatusCode,
        "p_workorder_status": data.WorkOrderStatus,
        "p_warranty_repair_flag": data.WarrantyRepairFlag,
        "p_forecast_id": data.ForecastId,
        "p_forecast_status": data.ForecastStatus,
        "p_program_organization_code": data.ProgramOrganizationCode,
        "p_program_id": data.ProgramId,
        "p_program_name": data.ProgramName,
        "p_program_type": data.ProgramType,
        "p_requirement_name": data.RequirementName,
        "p_created_by": user
      };

      return obj;

    }


    createPayloadMasterTab(master, asset, manuf, locat, leasing, cost, fileobj) {
      let resp11 = {
        "p_equipment_number": master.equipment_Num,
        "p_equipment_name": master.equipment_Name,
        "p_equipment_description": master.equipment_desc,
        "p_equipment_type": master.equipment_Type,
        "p_equipment_class": master.equipment_Class,
        "p_equipment_sub_class": master.equipment_Sub_Class,
        "p_status": master.status,
        "p_non_labor_resource": master.nonLaborResource,


        "serial_number": master.serial_number,
        "location_type": master.location_type,
        "location_organization": master.location_organization,
        "work_center": master.work_center,
        "work_area": master.work_area,
        "maintenance_asset_number": master.maintenance_asset_number,
        "maintenance_asset_id": master.maintenance_asset_id,
        "maintenance_asset_name": master.maintenance_asset_name,
        "operating_org_id": master.operating_org_id,
        "maintenance_organization_id": master.maintenance_organization_id,
        "work_center_id": master.work_center_id,
        "maintenance_organization": master.maintenance_organization,
        "operating_organization": master.operating_organization,



        "p_asset_number": asset.assetNumber,
        "p_asset_id": asset.asset_id,
        "p_inventory_item": asset.inventory_Item,
        "p_inventory_item_id": asset.inventory_Item_id,
        "p_purchase_order": asset.purchase_order,
        "p_person_number": asset.person,
        "p_project_id": asset.project_id,
        "p_record_mode": "Equipment Rite",
        "p_project_name": asset.project_name,
        "p_project_number": asset.project_number,
        "p_task_id": asset.task_id,
        "p_task_name": asset.task_name,
        "p_task_number": asset.task_number,
        "p_ast_date_in_service": asset.dateInService ? asset.dateInService + "T00:00:00Z" : null,
        "p_ast_retired_date": asset.retriredDate ? asset.retriredDate + "T00:00:00Z" : null,
        "p_ast_insured_by": asset.insured_by,
        "p_ast_insured_policy": asset.insured_policy,
        "p_ast_asset_organization": asset.asset_organization,
        "p_manufacturer": manuf.manufacturer,
        "p_mf_model_year": manuf.modelYear,
        "p_mf_model_number": manuf.modelNumber,
        "p_mf_color": manuf.color,
        "p_mf_license_state": manuf.licenceState,
        "p_mf_license_number": manuf.licence_Number,
        "p_mf_license_expiry": manuf.licence_expiry ? manuf.licence_expiry + "T00:00:00Z" : null,
        "p_mf_fuel_type": manuf.fuel_Type,
        "p_mf_serial_number": manuf.serial_Num,
        "p_mf_weight": manuf.weight,
        "p_mf_warranty_code": manuf.warranty_code,
        "p_default_location": locat.p_default_location,
        "p_address_line1": locat.p_address_line1,
        "p_address_line2": locat.p_address_line2,
        "p_longitude": locat.p_longitude,
        "p_latitude": locat.p_latitude,
        "p_city": locat.p_city,
        "p_state": locat.licenceState,
        "p_zip": locat.p_zip,
        "p_county": "",
        "p_country": locat.p_country,
        "p_vendor_name": leasing.vendor,
        "p_vendor_id": leasing.vendor_id,
        "p_lease_start": leasing.lease_start_date ? leasing.lease_start_date + "T00:00:00Z" : null,
        "p_lease_end": leasing.lease_end_date ? leasing.lease_end_date + "T00:00:00Z" : null,
        "p_lease_rate": leasing.lease_rate,
        "p_include_in_pm": "",
        "p_pm_basis": "",
        "p_auto_costing_flag": cost.auto_Costing_flag,
        "p_expenditure_org_name": cost.expenditure_org,
        "p_billing_category": cost.billing_category,
        "p_capacity_per_day": "",
        "p_file_name": fileobj.filename ? fileobj.filename : null,
        "p_file_type": fileobj.filename ? fileobj.filetype : null,
        "p_file_content": fileobj.filename ? fileobj.filecontent : null,
        "p_equip_req_quantity": master.p_equip_req_quantity,
        "p_life_of_equipment": master.p_life_of_equipment

      };
      return resp11;
    }

    createAssetsReq(arg1, arg2) {
      let assetReq = {
        "asset_number": arg1.assetNumber,
        "inventory_item": arg1.inventory_Item,
        "purchase_order": arg1.purchase_order,
        "person_number": arg1.person,
        "project_id": arg1.project_id,
        "task_id": arg1.task_id,
        "project_name": arg1.project_name,
        "task_name": arg1.task_name,
        "ast_date_in_service": arg1.dateInService + "T00:00:00Z",
        "ast_retired_date": arg1.retriredDate + "T00:00:00Z",
        "ast_insured_by": arg1.insured_by,
        "ast_insured_policy": arg1.insured_policy,
        "equipment_id": arg2
      };
      return assetReq;
    }

    /**
     *
     * @param {String} arg1
     * @return {String}
     */
    createCostingReq(arg1, arg2) {
      let costReq = {
        "auto_costing_flag": arg1.auto_Costing_flag,
        "expenditure_org_name": arg1.expenditure_org,
        "billing_category": arg1.billing_category,
        "equipment_id": arg2
      };
      return costReq;
    }

    /**
     *
     * @param {String} arg1
     * @return {String}
     */
    createLeasingReq(arg1, arg2) {
      let leaseReq = {
        "vendor_name": arg1.vendor,
        "lease_start": arg1.lease_start_date + "T00:00:00Z",
        "lease_end": arg1.lease_end_date + "T00:00:00Z",
        "lease_rate": arg1.lease_rate,
        "equipment_id": arg2
      };
      return leaseReq;
    }

    /**
     *
     * @param {String} arg1
     * @return {String}
     */
    createManufReq(arg1, arg2) {
      let manuReq = {
        "manufacturer": arg1.manufacturer,
        "mf_model_year": arg1.modelYear,
        "mf_model_number": arg1.modelNumber,
        "mf_color": arg1.color,
        "mf_license_state": arg1.licenceState,
        "mf_license_number": arg1.mf_license_number,
        "mf_license_expiry": arg1.licence_expiry + "T00:00:00Z",
        "mf_fuel_type": arg1.fuel_Type,
        "mf_serial_number": arg1.serial_Num,
        "mf_weight": arg1.weight,
        "mf_warranty_code": arg1.warranty_code,
        "equipment_id": arg2
      };
      return manuReq;
    }

    /**
     *
     * @param {String} arg1
     * @return {String}
     */
    createLocationReq(arg1, arg2) {
      let locationReq = {
        "default_location": arg1.default_location,
        "address_line1": arg1.address_line1,
        "address_line2": arg1.adrees_line2,
        "city": arg1.city,
        "state": arg1.state,
        "zip": arg1.zip,
        "country": arg1.country,
        "equipment_id": arg2
      };
      return locationReq;
    }


    processFile(file) {
      console.log('File:', file);
      console.log('File type:', typeof file);
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
          const fileContent = e.target.result;
          const fileName = file.name;
          const fileType = file.type;

          resolve({
            fileName: fileName,
            fileType: fileType,
            fileContent: fileContent
          });
        };

        reader.onerror = function (error) {
          console.log('isnode error');
          reject(error);
        };

        // reader.readAsDataURL(file); // Or use readAsArrayBuffer, readAsBinaryString, etc.
        // if (file && file instanceof Blob) {
        //   reader.readAsDataURL(file);
        // } else {
        //   console.error('File is null, undefined, or not a Blob or File object');
        // }
      });
    }

  }

  return PageModule;
});
