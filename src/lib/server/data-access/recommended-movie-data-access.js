const recMovies = [
    {ID : 0, active : true, poster : "SpiderMan.jpeg", name : "Spider Man", description : "Peter parker gets biten by a spider and becomes spider man, a hero"},
    {ID : 1, active : false, poster : "Lorax", name : "The lorax", description : "The lorax is a movie about saving the enviorment. A young boy wonders from the city to an old run down house where he hears stories about how trees were everywhere, the mysterious man has more then just stories for the boy..."},
    {ID : 2, active : false, poster : "NONE", name : "NONE", description : "NONE"},
    {ID : 3, active : false, poster : "SpiderMan.jpeg", name : "Some filler information", description : "Need to make a proper DB or data."}
]

export const recommendedMovieDataAccess = {
    async getRecommendedMovies() {
        return recMovies
    }
}