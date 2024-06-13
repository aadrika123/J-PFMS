import express from "express";
import PreparedEstimatedController from "./PreparedEstimatedController";
import { APIv1 } from "../APIv1";

/**
 * @swagger
 * tags:
 *   name: Prepared Estimated
 *   description: API endpoints for managing prepared estimated data
 */

class PreparedEstimatedRoute extends APIv1 {
  private controller: PreparedEstimatedController;

  constructor(routeId: string, app: express.Application) {
    super(routeId, app, "prepared-estimated");
    this.controller = new PreparedEstimatedController();
  }

  /**
   * @swagger
   * /api/pfms/v1/prepared-estimated/get:
   *   get:
   *     summary: Get prepared estimated data
   *     description: Retrieve prepared estimated data
   *     tags: [Prepared Estimated]
   *     responses:
   *       '200':
   *         description: Successful retrieval of prepared estimated data
   */


  

  configure(): void {
    this.addGetRoute(`get`, this.controller.get);
    /**
     * @swagger
     * /api/pfms/v1/prepared-estimated/get/{id}:
     *   get:
     *     summary: Get a user by ID
     *     description: Retrieve prepared estimated data
     *     tags: [Prepared Estimated]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         description: ID of the user to get
     *         schema:
     *           type: integer
     *     responses:
     *       '200':
     *         description: A user object
     */
    this.addGetRoute(`get/:id`, this.controller.getById);
    this.addPostRoute(`create`, this.controller.create);
    this.addPutRoute(`update/:id`, this.controller.update);
    this.addDeleteRoute(`delete/:id`, this.controller.delete);
  }
}

export default PreparedEstimatedRoute;
