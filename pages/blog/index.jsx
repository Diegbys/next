
import Layout from "../../components/Layout";
import Link from 'next/link';

export default function index({ data }) {
    return (
        <Layout title="About" description='tu sabe que es la descripcio'>
            <h1>listado de posts</h1>
            {
                data.map(({ id, title, body }) => (
                    <div key={id}>
                        <h3>
                            <Link href={`/blog/${id}`}>
                                <a> {id} - {title}</a>
                            </Link>
                        </h3>
                        <p>{body}</p>
                    </div>
                ))
            }
        </Layout>
    )
}

export async function getStaticProps() {
    try {
        const res = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await res.json();
        return {
            props: {
                data
            }
        }
    } catch (error) {
        console.log(error);
    }
}