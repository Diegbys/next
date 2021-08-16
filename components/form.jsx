import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/dist/client/router';

const Form = ({ formData, forNewMovie = true }) => {

    const router = useRouter();
    const [form, setForm] = React.useState({
        title: formData.title,
        plot: formData.plot
    });
    const [message, setMessage] = React.useState([]);

    const handlerChange = e => {
        const { value, name } = e.target;
        setForm({ ...form, [name]: value })
    }

    const handlerSubmit = e => {
        e.preventDefault();
        if (forNewMovie) {
            postData(form);
        } else {
            putData(form);
        }

    }

    const postData = async (form) => {
        try {
            setMessage([]);
            const res = await fetch('/api/movie', {
                method: 'POST',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(form)
            });

            const data = await res.json();

            if (!data.success) {
                for (const key in data.error.errors) {
                    let error = data.error.errors[key];
                    setMessage(oldMessage => [...oldMessage, { message: error.message }]);
                }
            } else {
                router.push("/");
            }

        } catch (error) {
            console.log(error);
        }
    };

    const putData = async (form) => {
        const { id } = router.query;
        try {
            const res = await fetch(`/api/movie/${id}`, {
                method: 'PUT',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(form)
            });
            console.log(res);

            const data = await res.json();
            console.log(data);


            if (!data.success) {
                for (const key in data.error.errors) {
                    let error = data.error.errors[key];
                    setMessage(oldMessage => [...oldMessage, { message: error.message }]);
                }
            } else {
                router.push("/");
            }

        } catch (error) {
            console.log(error);
        }
    }


    return (
        <form onSubmit={handlerSubmit}>
            <input
                type="text"
                className="form-control my-2"
                placeholder="Title"
                name="title"
                autoComplete="off"
                value={form.title}
                onChange={handlerChange}
            />
            <input
                type="text"
                className="form-control my-2"
                placeholder="Plot"
                name="plot"
                autoComplete="off"
                value={form.plot}
                onChange={handlerChange}
            />
            <button className="btn-primary w-100 my-2" type="submit">
                {forNewMovie ? 'Agregar' : 'editar'}
            </button>
            <Link href="/">
                <a className="btn btn-warning w-100">Volver</a>
            </Link>

            {message.map(({ message }) => (
                <p key={message}>{message}</p>
            ))}
        </form>
    )
}

export default Form
