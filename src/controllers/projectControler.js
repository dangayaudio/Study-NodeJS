const { CreateProject, GetProject, DeleteProject, UpdateProject } = require('../services/produceService');

module.exports = {
    PostCreateProject: async (req, res) => {
        let result = await CreateProject(req.body);
        return res.status(200).json(
            {
                EC: 0,
                data: result
            }
        )
    },
    GetAllProject: async (req, res) => {
        let result = await GetProject(req.query);
        return res.status(200).json(
            {
                EC: 0,
                data: result
            }
        )
    },
    PutUpdateProject: async (req, res) => {
        let result = await UpdateProject(req.body);
        return res.status(200).json(
            {
                EC: 0,
                data: result
            }
        )
    },
    DeleteAllProject: async (req, res) => {
        let result = await DeleteProject(req.body.id);
        return res.status(200).json(
            {
                EC: 0,
                data: result
            }
        )
    }
}