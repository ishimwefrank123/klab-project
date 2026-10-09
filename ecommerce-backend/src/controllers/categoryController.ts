import { Request, Response } from 'express';
import Category from '../models/Category';


//Create a new category
export const createCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, description } = req.body;

        const categoryExist = await Category.findOne({ name });

        if(categoryExist){
            res.status(400).json({
                message: "Category already exists"
            })
            return;
        }

        const category = await Category.create({name,description});
        res.status(200).json(category)
    }catch(error){
        res.status(500).json({
            message: "Server error",
            error: error.message
        })
    }
}

// Get all categories 
export const getCategories = async (req: Request, res: Response) => {
    try{
        const categories = await Category.find({});
        res.status(200).json(categories) 
       }catch(error){
        res.status(500).json({
            message: "Server error",
            error: error.message,
        })
       }
};

// Get a category by Id

export const getCategoryById = async (req: Request, res: Response): Promise<void> => {
    try{
        const category = await Category.findById(req.params.id);

        if(!category){
            res.status(404).json({
                message: "Category not found"
            });
            return;
        }
        res.status(200).json(category);
    }catch(error: any){
        res.status(500).json({
            message: "Server error",
            error: error.message,
        })
    }
}

//Update category
export const updateCategory = async (req: Request, res: Response): Promise<void> => {
    try{
        const {name, description} = req.body;

        const category = await Category.findById(req.params.id )

        if(!category){
            res.status(404).json({
                message: "category not found"
            })
            return;
        }
        category.name = name || category.name;
        category.description = description || category.description

        const updatedCategory = await category.save();
        res.status(200).json(updateCategory);

    }catch(error){
        res.status(500).json({
            message: "Server error",
            error: error.message
        })
    }
}


// Delete a category

export const deleteCategory = async (req: Request, res: Response): Promise<void> => {
    try{
        const category = await Category.findById(req.params.id);

        if(!category){
            res.status(404).json({
                message: "Category not found",
            })
            return;
        }
        await category.deleteOne();
        res.status(200).json({
            message: "Category removed"
        })

    }catch(error){
        res.status(500).json({
            message: "Server error",
            error: error.message
        })
    }
}

