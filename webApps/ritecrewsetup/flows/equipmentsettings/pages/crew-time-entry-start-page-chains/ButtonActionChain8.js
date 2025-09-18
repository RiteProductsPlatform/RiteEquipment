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

  class ButtonActionChain8 extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const callFunction = await this.createPayload(context, { arg1: $variables.selectedBuId, arg2: $variables.selectedBuName, arg3: $variables.costingType, arg4: $variables.selectedDay, arg5: $variables.selectedExpOrgId, arg6: $variables.selectedName, arg7: $variables.selectedTrxSrcId, arg8: $variables.selectedTrxSrcName, arg9: $variables.batchPrefix, arg10: $variables.depCost?"Y":"N", arg11: $variables.adhocTS?"Y":"N" });

      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/postEqpSettings',
        body: callFunction,
      });

      if (!response.ok) {
        await Actions.fireNotificationEvent(context, {
          summary: 'Error exists please contact Administrator.',
        });
      
        return;
      }

      await Actions.fireNotificationEvent(context, {
        summary: 'Settings created Successfully.',
        type: 'confirmation',
      });
    }

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {string} params.arg1 
     */
    async createPayload(context, { arg1,arg2,arg3,arg4,arg5,arg6,arg7,arg8,arg9,arg10,arg11 }) {
      const { $page, $flow, $application, $constants, $variables } = context;
      const today = new Date().toISOString().slice(0, 10);
      let payload = {    
  "org_id": arg1,
  "business_unit": arg2,
  "costing": arg3,
  "week_end_day": arg4,
  "eqp_exp_org_id": arg5,
  "equipment_owning_organization": arg6,
  "trx_source_id": arg7,
  "project_transaction_source": arg8,
  "expenditure_batch_prefix": arg9,
  "include_depreciation_cost": arg10,
  "enable_adhoc_timesheet": arg11,
  "attribute1": "Value1",
  "attribute2": "Value2",
  "attribute3": "Value3",
  "attribute4": "Value4",
  "attribute5": "Value5",
  "attribute6": "Value6",
  "attribute7": "Value7",
  "attribute8": "Value8",
  "attribute9": "Value9",
  "attribute10": "Value10",
  "attribute11": "Value11",
  "attribute12": "Value12",
  "attribute13": "Value13",
  "attribute14": "Value14",
  "attribute15": "Value15",
  "created_by": "",
  "created_date": today,
  "last_updated_by": "",
  "last_update_date": today


      };
      return payload;
    }
  }

  return ButtonActionChain8;
});
