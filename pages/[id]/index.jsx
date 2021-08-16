import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';

import Layout from '../../components/Layout';
import connectDB from '../../lib/dbConnect';
import Movie from '../../models/Movie';

const MoviePage = ({ succes, error, movie }) => {

    const router = useRouter();

    if (!succes) {
        return (
            <div className="container text-center my-5">
                <h1> {error}  </h1>
                <Link href="/"><a className="btn btn-succes">Volver...</a></Link>
            </div>
        )
    }

    const deleteData = async (id) => {
        try {
            await fetch(`/api/movie/${id}`, {
                method: 'DELETE'
            });
            router.push('/');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Layout title="Detalle de pelicula">
            <h1>Detalle de Movie</h1>
            <div className="card">
                <div className="card-body">
                    <div className="card-title">
                        <h5 className="text-uppercase">{movie.title}</h5>
                    </div>
                    <p className="fw-light">{movie.plot}</p>
                    <Link href="/"><a className="btn btn-success btn-sm">Volver...</a></Link>
                    <Link href={`/${movie._id}/edit`}><a className="btn btn-warning btn-sm">Editar</a></Link>
                    <button className="btn btn-danger btn-sm" onClick={() => deleteData(movie._id)}>
                        Eliminar
                    </button>

                </div>
            </div>
        </Layout>
    )
}

export default MoviePage;

// SSR
export async function getServerSideProps({ params }) {
    try {
        await connectDB();

        const movie = await Movie.findById(params.id).lean();

        if (!movie) {
            console.log('no se encontro nada mi king')
            return { props: { succes: false, error: 'Pelicula no encontrada' } }
        }

        movie._id = `${movie._id}`;
        console.log(movie);


        return { props: { succes: true, movie } }
    } catch (error) {
        console.log(error);
        return { props: { succes: false, error: 'Id no valido' } }

    }
}
