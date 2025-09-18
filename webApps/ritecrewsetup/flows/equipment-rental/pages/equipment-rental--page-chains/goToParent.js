/* Copyright (c) 2024, Oracle and/or its affiliates */

define([
  'vb/action/actionChain',
  'vb/action/actions',
], (
  ActionChain,
  Actions
) => {
  'use strict';

  class goToParent extends ActionChain {

    /**
     * goToParent
     * @param {Object} context
     */
    async run(context) {

      await Actions.navigateToPage(context, {
        page: '/',
      });
    }
  }

  return goToParent;
});
