const { fileLoader } = require('ejs');
const Project = require('../model/project');
const aqp = require('api-query-params');
const Task = require('../model/task');

module.exports = {
    CreateProject: async (data) => {
        if (data.type === "EMPTY-PROJECT") {
            let result = await Project.create(data);
            return result;
        }
        if (data.type === "ADD-USERS") {
            console.log("check data: ", data);
            //find project by id
            let myProject = await Project.findById(data.projectID).exec();
            for (let i = 0; i < data.userArr.length; i++) {
                myProject.usersInfor.push(data.userArr[i]);
            }
            // myProject.usersInfor.push(data.userArr);
            let newresult = await myProject.save();
            return newresult;
        }
        if (data.type === "REMOVE-USERS") {
            let myProject = await Project.findById(data.projectID).exec();

            for (let i = 0; i < data.userArr.length; i++) {
                myProject.usersInfor.pull(data.userArr[i]);
            }
            let newresult = await myProject.save();
            return newresult;
        }
        if (data.type === "ADD-TASKS") {
            console.log("check data:", data);
            let myProject = await Project.findById(data.projectID).exec();
            for (let i = 0; i < data.taskArr.length; i++) {//định mệnh. đừng như vậy mà =>>> lenght
                console.log(data.taskArr[i])
                myProject.tasks.push(data.taskArr[i]);
            }
            // myProject.tasks = data.taskArr;


            let newresult = await myProject.save();
            return newresult;
        }
        return null;
    },
    GetProject: async (queryString) => {
        const page = queryString.page;

        const { filter, limit, population } = aqp(queryString);
        delete filter.page;

        let offset = (page - 1) * limit;
        result = await Project.find(filter)
            .populate(population)
            .skip(offset)
            .limit(limit)
            .exec();

        return result;
    },
    UpdateProject: async (data) => {
        let result = await Project.updateOne({ _id: data.id }, { ...data })
        return result;
    },
    DeleteProject: async (id) => {
        let result = await Project.deleteById(id)
        return result;
    }
}