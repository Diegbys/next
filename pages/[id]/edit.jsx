import Layout from '../../components/Layout';
import Form from '../../components/form';

import useSWR from 'swr';
import { useRouter } from 'next/dist/client/router';


const fetcher = async url => {
    const res = await fetch(url);

    if (!res.ok) {
        const error = new Error('An error ocurred while fetching the data.');

        error.info = await res.json();
        error.status = res.status;
        throw error;
    }

    const { data } = await res.json();

    return data;
}

const EditMovie = () => {
    const router = useRouter();
    const { id } = router.query;

    const { data: movie, error } = useSWR(id ? `/api/movie/${id}` : null, fetcher);


    if (error) {
        return (
            <div className="container">
                error
            </div>
        )
    }

    if (!movie) {
        return (
            <div className="container my-5">
                <h1>loading...</h1>
            </div>
        )
    }

    const formData = {
        title: movie.title,
        plot: movie.plot
    }

    return (
        <Layout>
            <h1>Editar Movie</h1>
            <Form formData={formData} forNewMovie={false} />
        </Layout>

    )
}
export default EditMovie
