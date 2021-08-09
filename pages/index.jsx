import Layout from "../components/Layout";
import utilStyles from '../styles/utils.module.css'
import connectDB from '../lib/dbConnect';
import Movie from '../models/Movie';

export default function Home({ movies }) {
    console.log(movies);
    return (
        <Layout title="Home" description="this is the home" home>
            <br />
            {movies.map(item => (
                <div className="card mb-2" key={item._id}>
                    <div className="card-body">
                        <div className="h5 text-uppercase">{item.title}</div>
                        <p className="fw-light">{item.plot}</p>
                    </div>
                </div>
            ))}

        </Layout>
    )
}

export async function getServerSideProps() {
    try {
        await connectDB();

        const res = await Movie.find({});
        const movies = res.map(doc => {
            let movie = doc.toObject();
            movie._id = `${movie._id}`;
            return movie;
        });

        return { props: { movies } }
    } catch (error) {
        console.log(error);
    }
}