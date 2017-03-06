import db from '../models/index';
import Helper from '../Helper/Helper';

const Document = {

  /**
    * Create a new document
    * Route: POST: /documents/
    * @param {Object} req request object
    * @param {Object} res response object
    * @returns {void|Object} response object or void
    */
  create(req, res) {
    db.Document
      .create(req.docInput)
       .then((document) => {
         res.status(201)
          .send({
            success: true,
            message: 'Your document has been successfully created',
            document
          });
       })
       .catch(error => res.status(500).send(error.errors));
  },

  /**
    * Get all document
    * Route: GET: /documents/
    * @param {Object} req request object
    * @param {Object} res response object
    * @returns {void} response object or void
    */
  getAll(req, res) {
    db.Document
      .findAndCountAll(req.dmsFilter)
      .then((documents) => {
        const condition = {
          count: documents.count,
          limit: req.dmsFilter.limit,
          offset: req.dmsFilter.offset
        };
        const pagination = Helper.pagination(condition);
        res.status(200)
          .send({
            success: true,
            message: 'You have successfully retrieved all documents',
            documents,
            pagination
          });
      })
      .catch(error => res.status(500).send(error.errors));
  },

  /**
    * Get document by ID
    * Route: GET: /documents/:id
    * @param {Object} req request object
    * @param {Object} res response object
    * @returns {void|Response} response object or void
    */
  getDocument(req, res) {
    return res.status(200)
      .send({
        success: true,
        message: 'You have successfully retrived this document',
        document: req.singleDocument
      });
  },

  /**
    * Update document by id
    * Route: PUT: /documents/:id
    * @param {Object} req request object
    * @param {Object} res response object
    * @returns {void} no returns
    */
  update(req, res) {
    req.docInstance.update(req.body)
      .then(updatedDocument => res.status(200)
        .send({
          success: true,
          message: 'This document has been updated successfully',
          updatedDocument
        }))
      .catch(error => res.status(500).send(error.errors));
  },

  /**
    * Delete document by id
    * Route: DELETE: /documents/:id
    * @param {Object} req request object
    * @param {Object} res response object
    * @returns {void} no returns
    */
  detele(req, res) {
    req.docInstance.destroy()
      .then(() => res.status(200)
         .send({
           success: true,
           message: 'This document has been deleted successfully'
         })
      )
      .catch(error => res.status(500).send(error.errors));
  },

  /**
    * Search document
    * Route: GET: /searchs?query={}
    * @param {Object} req request object
    * @param {Object} res response object
    * @returns {void|Response} response object or void
    */
  search(req, res) {
    db.Document
      .findAndCountAll(req.dmsFilter)
      .then((documents) => {
        const condition = {
          count: documents.count,
          limit: req.dmsFilter.limit,
          offset: req.dmsFilter.offset
        };
        const pagination = Helper.pagination(condition);
        res.status(200)
          .send({
            success: true,
            message: 'This search was successfull',
            documents,
            pagination
          });
      })
      .catch(error => res.status(500).send(error.errors));
  }

};

export default Document;
