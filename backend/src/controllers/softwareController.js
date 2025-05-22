const Software = require('../entities/Software'); 

module.exports = (AppDataSource) => {
    const softwareRepo = AppDataSource.getRepository('Software');

    const createSoftware = async (req, res) => {
        try {
            const { name, version } = req.body;

            const software = softwareRepo.create({ name, version });
            await softwareRepo.save(software);

            res.status(201).json({ message: 'Software created', software });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Failed to create software' });
        }
    };

    const getAllSoftware = async (req, res) => {
        try {
            const softwareList = await softwareRepo.find();

            res.status(200).json(softwareList);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Failed to fetch software' });
        }
    };

    return { createSoftware, getAllSoftware };
};
