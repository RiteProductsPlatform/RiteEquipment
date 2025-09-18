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

  class removeFromcart extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.current 
     */
    async run(context, { current }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      const removefromCart = await $functions.removefromCart(current, JSON.stringify($variables.CartArray));

      $variables.CartArray = removefromCart;
    }
  }

  return removeFromcart;
});
