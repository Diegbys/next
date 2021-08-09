import mongoose from 'mongoose';

const MovieSchema = new mongoose.Schema({
    title: {
        type: String,
        require: [true, 'Por favor, ingrese el título.']
    },
    plot: {
        type: String,
        require: [true, 'Por favor, ingrese el plot.']
    }
})

export default mongoose.models.Movie || mongoose.model('Movie', MovieSchema);