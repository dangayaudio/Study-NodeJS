const { CreateTasks, GetTasks, UpdateTasks, DeleteTasks } = require('../services/taskService');
const Joi = require('joi').extend(require('@joi/date'));

module.exports = {
    PostCreateTasks: async (req, res) => {
        const schema = Joi.object({
            type: Joi.string()
                .required(),
            name: Joi.string()
                .required(),
            description: Joi.string(),
            status: Joi.string(),
            startDate: Joi.date().format(["DD/MM/YYYY", "DD-MM-YYYY"]),
            endDate: Joi.date().format(["DD/MM/YYYY", "DD-MM-YYYY"])
        })
        const { error } = schema.validate(req.body, { abortEarly: false })
        if (error) {
            return res.status(200).json({
                msg: error
            })
        } else {
            let result = await CreateTasks(req.body);
            return res.status(200).json(
                {
                    EC: 0,
                    data: result
                }
            )
        }

    },

    GetAllTasks: async (req, res) => {
        let result = await GetTasks(req.query);
        return res.status(200).json(
            {
                EC: 0,
                data: result
            }
        )
    },

    PutUpdateTasks: async (req, res) => {
        let result = await UpdateTasks(req.body);
        return res.status(200).json(
            {
                EC: 0,
                data: result
            }
        )
    },

    DeleteAllTasks: async (req, res) => {
        let result = await DeleteTasks(req.body.id);
        return res.status(200).json(
            {
                EC: 0,
                data: result
            }
        )
    }
}

