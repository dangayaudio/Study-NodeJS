const Customer = require("../model/customer");
const aqp = require('api-query-params');

const CreateCustomerService = async (customerData) => {
    try {
        let result = await Customer.create({
            name: customerData.name,
            address: customerData.address,
            phone: customerData.phone,
            email: customerData.email,
            description: customerData.description,
            image: customerData.image
        })
        return result;

    } catch (error) {
        console.log('ERR:', error);
        return null;
    }
}
const createArrayCustomerService = async (arr) => {
    try {
        let result = await Customer.insertMany(arr)
        return result
    } catch (error) {
        console.log(error);
        return null;
    }
}

const GetAllCustomerService = async (limit, page, name, email, queryString) => {
    try {
        let result = null;
        if (limit && page) {
            let offset = (page - 1) * limit;
            const { filter, skip } = aqp(queryString);
            delete filter.page;
            console.log('check:', filter);
            result = await Customer.find({ filter })
                .skip(offset)
                .limit(limit)
                .exec();

        } else {
            result = await Customer.find({});
        }

        return result;
    } catch (error) {
        console.log(error)
        return null;
    }
}

const PutAllCustomerService = async (id, name, email, address) => {
    try {
        let customers = await Customer.updateOne(
            { _id: id },
            {
                name,
                email,
                address
            }
        );
        return customers;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const DeleteACustomerService = async (id) => {
    try {
        let customers = await Customer.deleteById(id);
        return customers;

    } catch (error) {
        console.log(error);
        return null;
    }
}

const DeleteArrayCustomerService = async (arrIds) => {
    try {
        let result = await Customer.delete({ _id: { $in: arrIds } })
        return result
    } catch (error) {
        console.log("error: ", error);
        return null;
    }
}
module.exports = {
    CreateCustomerService, createArrayCustomerService,
    GetAllCustomerService, PutAllCustomerService, DeleteACustomerService,
    DeleteArrayCustomerService
};