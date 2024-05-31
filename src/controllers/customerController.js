//{key: value}
const { uploadSingleFile } = require('../services/fileService');
const { CreateCustomerService, createArrayCustomerService,
    GetAllCustomerService, PutAllCustomerService, DeleteACustomerService, DeleteArrayCustomerService } = require('../services/CustomerService');
const aqp = require('api-query-params');
const Joi = require('joi');


module.exports = {
    postCreateCustomer: async (req, res) => {
        let { name, address, phone, email, description } = req.body;
        const schema = Joi.object({
            name: Joi.string()
                .alphanum()
                .min(3)
                .max(30)
                .required(),
            address: Joi.string(),
            phone: Joi.string()
                .pattern(new RegExp('^[0-9]{8,11}$')),
            email: Joi.string().email(),
            description: Joi.string()
        })
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(200).json({
                msg: error
            })
        } else {
            let imageUrl = "";
            if (!req.files || Object.keys(req.files).length === 0) {
            } else {
                let result = await uploadSingleFile(req.files.image);
                imageUrl = result.path;
            }

            let customerData = {
                name, address, phone,
                email, description, image: imageUrl
            }

            let customer = await CreateCustomerService(customerData);

            return res.status(200).json(
                {
                    EC: 0,
                    data: customer
                })
        }
    },
    postCreateArrayCustomer: async (req, res) => {
        let customers = await createArrayCustomerService(req.body.customers)
        if (customers) {
            return res.status(200).json(
                {
                    EC: 0,
                    data: customers
                })
        } else {
            return res.status(200).json(
                {
                    EC: -1,
                    data: customers
                })
        }
    },
    GetAllCustomer: async (req, res) => {

        let limit = req.query.limit;
        let page = req.query.page;
        let name = req.query.name;
        let email = req.query.email;
        let customers = null;
        if (limit && page) {
            customers = await GetAllCustomerService(limit, page, name, email, req.query);
        } else {
            customers = await GetAllCustomerService();
        }
        return res.status(200).json(
            {
                EC: 0,
                data: customers
            })
    },
    PutAllCustomer: async (req, res) => {
        let { id, name, email, address } = req.body;
        let customers = await PutAllCustomerService(id, name, email, address);
        return res.status(200).json(
            {
                EC: 0,
                data: customers
            })
    },
    DeleteACustomer: async (req, res) => {
        let id = req.body.id;
        let result = await DeleteACustomerService(id);
        return res.status(200).json(
            {
                EC: 0,
                data: result
            })
    },

    DeleteArrayCustomer: async (req, res) => {
        let ids = req.body.customersId;

        let result = await DeleteArrayCustomerService(ids);
        return res.status(200).json(
            {
                EC: 0,
                data: result
            })
    }
}