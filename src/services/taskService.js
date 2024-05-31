const aqp = require('api-query-params');
const Task = require('../model/task');

module.exports = {
    CreateTasks: async (data) => {
        if (data.type === "EMPTY-TASK") {
            let result = await Task.create(data)
            return result;
        }
        return null;
    },

    GetTasks: async (querystring) => {
        const page = querystring.page;
        const { filter, limit } = aqp(querystring);
        delete filter.page;
        let offset = (page - 1) * limit;
        let result = await Task.find(filter)
            .skip(offset)
            .limit(limit)
            .exec();
        return result;
    },

    UpdateTasks: async (data) => {
        let result = await Task.updateOne({ _id: data.id }, { ...data })
        return result;
    },

    DeleteTasks: async (id) => {
        let result = await Task.deleteById(id);
        return result;
    }
}