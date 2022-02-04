import NewClubForm from "./NewClub"
import { useQuery } from "@apollo/client"
import { QUERY_POPULAR_CLUBS } from '../utils/queries'
import ClubTab from "../components/ClubTab"
import PopularBook from "../components/PopularBook"

const testBook = { title: "Dune", authors: ['Frank Herbert'], description: "Follows the adventures of Paul Atreides, the son of a betrayed duke given up for dead on a treacherous desert planet and adopted by its fierce, nomadic people, who help him unravel his most unexpected destiny.", imgUrl: "http://books.google.com/books/content?id=B1hSG45JCX4C&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api" }


export default function Home() {
    const { data, loading } = useQuery(QUERY_POPULAR_CLUBS);
    // const { data_books, loading_books } = QUERY_POPULAR_CLUBS;

    if (loading) {
        return (
            <div>
                <img src="https://cdnjs.cloudflare.com/ajax/libs/bxslider/4.2.5/images/bx_loader.gif"></img>
            </div>
        )
    }

    return (
        <div>
            <div className="p-4 grid grid-cols-2 gap-5">
                <div>
                    <p className="p-2 flex flex-col text-2xl text-purple-900 bg-gray-300 border-4 text-center">Popular Clubs</p>
                    <div className="flex flex-col gap-2 bg-white">
                        {data && data.popularClubs.map(club => <ClubTab key={club._id} clubData={club} />)}
                    </div>
                </div>
                <div>
                    <p className="p-2 flex flex-col text-2xl text-purple-900 bg-gray-300 border-4 text-center">Popular Books</p>
                    <div className="flex flex-col gap-2 bg-white">
                        {data && data.popularClubs.map(club => <PopularBook key={club._id} clubData={club} />)}
                    </div>
                </div>
            </div>
        </div>
    )
}