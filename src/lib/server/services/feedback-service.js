import { feedbackDataAccess } from "../data-access/feedback-data-access"

export const feedbackService = {
    async addFeedback( userId, rating, review )
        { await feedbackDataAccess.addFeedback( userId, rating, review ) },
    async getTopFeedback()
        { return await feedbackDataAccess.getTopFeedback() },
    async getAllFeedback()
        { return await feedbackDataAccess.getAllFeedback() },

}