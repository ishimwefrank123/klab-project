import mongoose , {Schema, Document} from 'mongoose';

export interface ICategory extends Document{
    name: string,
    description?: string,
}

const categorySchema: Schema = new Schema<ICategory> (
    {
        name: {
            type: String,
            required: [true, "Category name is required"],
            unique: true,
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
)

export default mongoose.model<ICategory>('Category', categorySchema);