const recommendedRewards = [
    { id : 4, name : "Coca cola", price : 500, image : 'drinks/coca_cola.png' },
    { id : 5, name : "Fanta", price : 300, image : 'drinks/fanta.png' },
    { id : 63, name : "Small popcorn", price : 200, image : 'foods/popcorn.png' },
]

export const rewardsDataAccess = {

    async getRecommendedRewards()
        { return recommendedRewards; }
}