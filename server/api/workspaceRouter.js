const express = require('express');
const workspaceController = require('./../controllers/workspace/workspaceController');
const workspaceRouter = express.Router();

workspaceRouter.route('/new')
  .post(
    workspaceController.create
  );

workspaceRouter.route('/getList')
  .get(
    workspaceController.getList,
    workspaceController.returnMessages
  );

workspaceRouter.route('/sendEmail')
  .post(
    workspaceController.sendEmail,
    workspaceController.returnMessages
  );

module.exports = workspaceRouter;