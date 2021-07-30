import Link from 'next/link';
import Image from 'next/image';

export default function primerPost() {
    return (
        <div>

            <h1>Primer post</h1>
            <Image
                src="/img/geremiputo.jpg"
                width={600}
                height={600}
                alt="No entienfdo, explicame."
            />

            <Link href="/"><a>Volver al inicio</a></Link>
        </div>
    );
}
