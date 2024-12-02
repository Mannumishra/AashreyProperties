const { uploadImages } = require("../middlewares/Cloudinary")
const fs = require("fs")
const Blog = require("../models/BlogModel")

const createRecord = async (req, res) => {
    try {
        console.log(req.body)
        const { blogName, blogDescription } = req.body
        if (!blogName || !blogDescription) {
            return res.status(402).json({
                success: false,
                message: "Please fill required field"
            })
        }
        else {
            if (req.file) {
                const imageurl = await uploadImages(req.file.path)
                const image = imageurl
                fs.unlinkSync(req.file.path)
                const data = new Blog({ blogName, blogDescription, image })
                await data.save()
                res.status(200).json({
                    success: true,
                    message: "New Cinema Addedd successfully!!!!",
                    data: data
                })
            }
            else {
                return res.status(402).json({
                    success: false,
                    message: "Blog Image is must required"
                })
            }
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

const getBlog = async (req, res) => {
    try {
        const data = await Blog.find()
        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Blog Not Found"
            })
        }
        else {
            res.status(200).json({
                success: true,
                message: "All Cinema found successfully",
                data: data
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

const getSingleBlog = async (req, res) => {
    try {
        const data = await Blog.findOne({ _id: req.params.id })
        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Blog Not Found"
            })
        }
        else {
            res.status(200).json({
                success: true,
                message: "All Cinema found successfully",
                data: data
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

const updateBlog = async (req, res) => {
    try {
        // Log request details for debugging
        console.log("Request Params:", req.params.id);
        console.log("Request Body:", req.body);
        if (req.file) console.log("File Path:", req.file.path);

        // Find the blog by ID
        const data = await Blog.findById(req.params.id);
        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Blog Not Found",
            });
        }

        // Update fields if provided in the request
        data.blogName = req.body.blogName ?? data.blogName;
        data.blogDescription = req.body.blogDescription ?? data.blogDescription;

        // Handle image upload
        if (req.file) {
            try {
                const updateImageUrl = await uploadImages(req.file.path);
                data.image = updateImageUrl;
                fs.unlinkSync(req.file.path); // Delete local file after upload
            } catch (imageError) {
                console.error("Image Upload Error:", imageError);
                return res.status(500).json({
                    success: false,
                    message: "Image upload failed",
                });
            }
        }

        // Save the updated blog
        await data.save();

        // Respond with success
        res.status(200).json({
            success: true,
            message: "Blog updated successfully",
            data: data,
        });
    } catch (error) {
        console.error("Error updating blog:", error); // Log the error for debugging
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};


const deleteBlog = async (req, res) => {
    try {
        const data = await Blog.findOne({ _id: req.params.id })
        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Blog Not Found"
            })
        }
        else {
            await data.deleteOne()
            res.status(200).json({
                success: true,
                message: " Cinema delete successfully",
                data: data
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}


module.exports = {
    createRecord, getBlog, getSingleBlog, deleteBlog, updateBlog
}