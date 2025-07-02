import { HubtelLogModel } from "../models/log.js";

export const getHubtelLogs = async (req, res, next) => {
    try {
        const { filter = "{}", sort = "{}", limit = 10, skip = 0 } = req.query;
        // Get total count of documents (BEFORE applying limit and skip)
        const totalCount = await HubtelLogModel.countDocuments({});
        // Fetch logs from database
        const logs = await HubtelLogModel
            .find(JSON.parse(filter))
            .sort(JSON.parse(sort))
            .limit(limit)
            .skip(skip);
        // Set X-Total-Count header
        res.set('X-Total-Count', totalCount);
        // Return response
        res.status(200).json(logs);
    } catch (error) {
        next(error);
    }
}

export const getHubtelLog = async (req, res, next) => {
    try {
        const { id } = req.params;
        // Get hubtelLog by id from database
        const hubtelLog = await HubtelLogModel.findById(id);
        if (!hubtelLog) {
            return res.status(404).json('HubtelLog not found!');
        }
        // Respond to request
        res.json(hubtelLog);
    } catch (error) {
        next(error);
    }
}