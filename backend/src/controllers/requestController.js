const Request = require('../entities/Request'); 
const Software = require('../entities/Software'); 
const User = require('../entities/User');       

module.exports = (AppDataSource) => {
    const RequestRepo = AppDataSource.getRepository('Request');
    const SoftwareRepo = AppDataSource.getRepository('Software');
    const UserRepo = AppDataSource.getRepository('User');

    const submitRequest = async (req, res) => {
        const { softwareId, accessType, reason } = req.body;
        const user = await UserRepo.findOneBy({ id: req.user.id }); 

        const software = await SoftwareRepo.findOneBy({ id: softwareId });
        if (!software) {
            return res.status(404).json({ message: 'Software not found' });
        }
        if (!user) { 
             return res.status(404).json({ message: 'User not found or not authenticated' });
        }

        try {
            const request = RequestRepo.create({ software, user, accessType, reason, status: 'Pending' }); 
            await RequestRepo.save(request);
            res.status(201).json(request);
        } catch (error) {
            console.error("Error submitting request:", error);
            res.status(500).json({ message: 'Failed to submit request' });
        }
    };

    const updateRequest = async (req, res) => {
        const { id } = req.params;
        const { status } = req.body;

        try {
            const request = await RequestRepo.findOneBy({ id });
            if (!request) {
                return res.status(404).json({ message: 'Request not found' });
            }

            request.status = status; 

            await RequestRepo.save(request);
            res.json(request);
        } catch (error) {
            console.error("Error updating request:", error);
            res.status(500).json({ message: 'Failed to update request' });
        }
    };

    return { submitRequest, updateRequest };
};
