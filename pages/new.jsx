import React from 'react';
import Link from 'next/link';

const New = () => {
    const [form, setForm] = React.useState({
        title: '',
        plot: ''
    });

    const [message, setMessage] = React.useState([]);

    const handlerChange = e => {
        const { value, name } = e.target;
        setForm({ ...form, [name]: value })
    }

    const handlerSubmit = e => {
        e.preventDefault();
        postData(form)
    }

    const postData = async (form) => {
        try {
            console.log(form);
            const res = await fetch('/api/movie', {
                method: 'POST',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(form)
            });

            const data = await res.json();
            console.log(data);

            if (!data.success) {
                data.error.erros.forEach(key => {
                    let error = data.error.errors[key];
                    setMessage(oldMessage => [
                        ...oldMessage,
                        ...{ message: error.message }
                    ]);
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="container">
            <h1 className="my-3">Agregar Movie</h1>
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
                <button className="btn-primary w-100 my-2" type="submit">Agregar</button>
                <Link href="/">
                    <a className="btn btn-warning w-100">Volver</a>
                </Link>
            </form>
        </div>
    )
}

export default New
