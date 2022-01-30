import NewClubForm from "./NewClub"
import { useQuery } from "@apollo/client"
import { QUERY_POPULAR_CLUBS } from '../utils/queries'
import ClubTab from "../components/ClubTab"

const testBook = { title: "Dune", authors: ['Frank Herbert'], description: "Follows the adventures of Paul Atreides, the son of a betrayed duke given up for dead on a treacherous desert planet and adopted by its fierce, nomadic people, who help him unravel his most unexpected destiny.", imgUrl: "http://books.google.com/books/content?id=B1hSG45JCX4C&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api" }


export default function Home() {
    const { data, loading_clubs } = useQuery(QUERY_POPULAR_CLUBS);
    console.log("Popular Books: " + JSON.stringify(data));

    const { data_books, loading_books } = QUERY_POPULAR_CLUBS;

    if (loading_clubs || loading_books) {
        return (
            <div>
                <img src="https://cdnjs.cloudflare.com/ajax/libs/bxslider/4.2.5/images/bx_loader.gif"></img>
            </div>
        )
    }

    return (
        <div>
            <div className="grid grid-cols-2">
                <div>
                    <h2>Popular Clubs</h2>
                    <div className="flex flex-col gap-2">
                        {data && data.popularClubs.map(club => <ClubTab key={club._id} clubData={club} />)}
                    </div>
                </div>
                <div>
                <h2>Popular Books</h2>
                    <div className="flex flex-col gap-2">
                        {data_books && data_books.popularClubs.map(club => <ClubTab key={club._id} clubData={club} />)}
                    </div>
                </div>
            </div>
        </div>
    )
}