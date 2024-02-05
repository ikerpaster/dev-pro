import mongoose from "mongoose";

const SubCategorySchema = new mongoose.Schema({
  selectAll: Boolean,
  permissions: {
    Add: Boolean,
    Edit: Boolean,
    Delete: Boolean,
    View: Boolean,
  },
});

const CategorySchema = new mongoose.Schema({
  selectAll: Boolean,
  permissions: {
    Add: Boolean,
    Edit: Boolean,
    Delete: Boolean,
    View: Boolean,
  },
  subCategories: {
    type: Map,
    of: SubCategorySchema,
  },
});

const PermissionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique:true
  },
  description: {
    type: String,
    required: true,
  },
    
status: {
  type: Boolean,
  required: true,
},
  permissions: {
    type: Map,
    of: CategorySchema,
  },
}, {
  timestamps: true,
});

const Permission = mongoose.model("Permission", PermissionSchema);

export default Permission;

