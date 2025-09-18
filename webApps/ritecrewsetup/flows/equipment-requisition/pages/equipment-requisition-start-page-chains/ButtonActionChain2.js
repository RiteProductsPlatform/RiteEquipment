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

  class ButtonActionChain2 extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      if ($variables.requestObj.eqpName === null || $variables.requestObj.eqpName === undefined) {
        await Actions.fireNotificationEvent(context, {
          summary: 'Please select an Equipment',
        });

        return;
      }
      let reqNumber = '';
      if (($variables.payloadADP.data.length < 1 )) {
        const response = await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/postEQPRite_ReqHeaderSubmit',
          body: {},
        });
        $variables.reqNumber = response.body.eqp_request_number;

      }

      const callFunction = await this.createPayload(context, { arg1: $application.user.username, arg5: $variables.enteredQuantity, arg6: $variables.SearchObj.EquipmentClass, arg23: $variables.SearchObj.StartDate, arg24: $variables.SearchObj.EndDate, arg3: $variables.city, arg4: $variables.country, arg11: $variables.latitude, arg12: $variables.location, arg13: $variables.longitude, arg18: $variables.addressline1, arg19: $variables.addressline2, arg25: $variables.zipCode, arg8: $variables.requestObj.eqpName, arg14: $variables.requestObj.projectId, arg15: $variables.requestObj.projectNumber, arg16: $variables.requestObj.projectNumber, arg20: $variables.selectedCrewId, arg21: $variables.selectedCrewName, arg22: $variables.effortsPerDay, arg27: $variables.reqNumber, arg28: $variables.nlrResource, arg29: $variables.nlrResourceOrg, arg30: $variables.requestObj.taskId, arg31: $variables.requestObj.taskNumber, arg17: 1000, arg33: $variables.projectName, arg32: $variables.requestObj.taskname, arg2: $variables.utilization });
     let currentData = $page.variables.payloadADP?.data || [];
      currentData.push(callFunction);

      $page.variables.payloadADP = {
        data: currentData
      };

    }

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {string} params.arg1 
     * @param {string} params.arg2 
     */
    async createPayload(context, { arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10,
arg11, arg12, arg13, arg14, arg15, arg16, arg17, arg18, arg19, arg20,
arg21, arg22, arg23, arg24, arg25, arg26,arg27,arg28,arg29,arg30,arg31,arg32,arg33
 }) {
      const { $page, $flow, $application, $constants, $variables } = context;
      let payload = {
    "requestor_name": arg1,
    "request_type": "Project",
    "utilization": arg2??0,
    "city": arg3,
    "country": arg4,
    "equip_req_quantity": arg5,
    "equipment_class": arg6,
    "equipment_id": arg7,
       "eqp_request_number":arg27,
    "equipment_name": arg8,
    "equipment_number": arg9??"",
    "equipment_type": arg10??"",
    "latitude": arg11,
    "location": arg12,
    "longitude": arg13,
    "project_id": arg14,
    // "project_name": arg15,
    "project_number": arg16,
    "schedule_cost_rate": arg17??0,
    "addressline1": arg18,
    "addressline2": arg19,
    "crew_id": arg20,
    "crew_name": arg21,
    "efforts_per_day": arg22,
    "start_date": arg23,
    "end_date": arg24,
    "zipcode": arg25,
    "file_attachment": arg26??"",
        "non_labor_resource": arg28,
    "non_labor_resource_org": arg29,
    "task_id":arg30??"",
    "task_number":arg31??"",
    "task_name":arg32??"",
    "project_name":arg33??""
};
return payload;
    }
  }

  return ButtonActionChain2;
});
