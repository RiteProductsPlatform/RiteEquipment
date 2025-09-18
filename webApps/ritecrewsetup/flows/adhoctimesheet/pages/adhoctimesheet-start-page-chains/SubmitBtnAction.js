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

  class SubmitBtnAction extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $variables } = context;
      let allSuccess = true;

      for (let i = 0; i < $variables.selectedRows.length; i++) {
        const row = $variables.selectedRows[i];

        // First API call
        const response = await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/EqpManualTimeInsertPrc',
          body: {
            "p_crewsetup_id": row.crewsetup_id,
            "p_crewsetup_eqp_header_id": row.crewsetup_eqp_header_id,
            "p_time_keeper_id": row.time_keeper_id,
            "p_secondary_timekeeper_id": row.secondary_timekeeper_id,
            "p_supervisor_id": row.supervisor_id,
            "p_business_unit": row.business_unit,
            "p_eqp_request_number": row.eqp_request_number,
            "p_equipment_resource_class": row.equipment_resource_class,
            "p_equipment_id": row.equipment_id,
            "p_equipment_number": row.equipment_number,
            "p_equipment_name": row.equipment_name,
            "p_nonlabor_resource": row.nonlabor_resource,
            "p_nonlabor_resource_organization": row.nonlabor_resource_organization,
            "p_project_id": row.project_id,
            "p_project_number": row.project_number,
            "p_project_name": row.project_name,
            "p_task_id_1": row.task_id_1,
            "p_task_number_1": row.task_number_1,
            "p_task_name_1": row.task_name_1, 
            "p_task_hours_1": row.task_hours_1,
            "p_task_id_2": row.task_id_2,
            "p_task_number_2": row.task_number_2,
            "p_task_name_2": row.task_name_2,
            "p_task_hours_2": row.task_hours_2,
            "p_task_id_3": row.task_id_3,
            "p_task_number_3": row.task_number_3,
            "p_task_name_3": row.task_name_3,
            "p_task_hours_3": row.task_hours_3,
            "p_task_id_4": row.task_id_4,
            "p_task_number_4": row.task_number_4,
            "p_task_name_4": row.task_name_4,
            "p_task_hours_4": row.task_hours_4,
            "p_entry_date": row.entry_date,
            "p_quantity": row.quantity
          }
        });

        if (!response.ok) {
          allSuccess = false;
          break;
        }

        // Second API call
        const response1 = await Actions.callRest(context, {
          endpoint: 'getContractSummary/postEQUIPMENT_RITEEXT_ADHOC_PPM_IMP_NONL_ATP_ERP1_0Impnonlbrcost',
          uriParams: {
            'batch_id': response.body.p_batch_id,
          }
        });

        if (!response1.ok) {
          allSuccess = false;
          break;
        }
      }

      // Fire notification once based on overall result
      await Actions.fireNotificationEvent(context, {
        summary: allSuccess
          ? 'Timesheet Submitted Successfully'
          : 'Failed to Submit Timesheet',
        type: allSuccess ? 'confirmation' : 'error',
        displayMode: 'transient',
      });
    }
  }

  return SubmitBtnAction;
});
