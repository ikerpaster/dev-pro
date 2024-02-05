
import Permission from "../models/permissions.model.js";
import createError from "../utils/createError.js";

 
export const createPermission = async (req, res, next) => {
  const { formData, permissions } = req.body;

  try {
    const newPermission = new Permission({
      formData,
      permissions,
    });

    console.log("all datas:: ",newPermission);

    const savedPermission = await newPermission.save();

    return res.status(201).json(savedPermission);
  } catch (error) {
    next(createError(500, "Something went wrong"));
  }
};



export const getAllPermissions = async (req, res, next) => {
    try {
   
      const permissions = await Permission.find();
  
      res.status(200).json(permissions);
    } catch (error) {
      console.error("Error fetching permissions:", error);
      next(createError(500, "Something went wrong"));
    }
  };

 
 
export const editPermission = async (req, res, next) => {
  const permissionId = req.params.id;

  const { formData, permissions } = req.body;

  try {
    const updatedPermission = await Permission.findByIdAndUpdate(
      permissionId,
      {
        formData,
        permissions,
      },
      { new: true }
    );

    if (!updatedPermission) {
      return res.status(404).json({ error: "Permission not found" });
    }

    return res.status(200).json(updatedPermission);
  } catch (error) {
    next(createError(500, "Something went wrong"));
  }
};
