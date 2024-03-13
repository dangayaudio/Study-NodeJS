//{key: value}
const { uploadSingleFile } = require('../services/fileService');
const { CreateCustomerService } = require('../services/CustomerService');

module.exports = {
    postCreateCustomer: async (req, res) => {
        let { name, address, phone, email, description } = req.body;

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
}