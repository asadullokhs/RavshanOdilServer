const Company = require("../models/Companies");
const { uploadFile, deleteFile } = require("../services/cloudinary");

const companyCtrl = {
  // Add a new company with Cloudinary image
  addCompany: async (req, res) => {
    try {
      const { name, country, description, website } = req.body;

      if (!req.files.logo) {
        return res.status(400).json({ message: "Logo image is required" });
      }

      const logoFile = req.files.logo;
      const uploaded = await uploadFile(logoFile); // returns { url, public_id }

      const newCompany = new Company({
        name,
        logo: uploaded, // store { url, public_id }
        country,
        description,
        website,
      });

      await newCompany.save();

      res.status(201).json({ message: "Company added", company: newCompany });
    } catch (err) {
      console.error("Error adding company:", err);
      res.status(500).json({ message: "Failed to add company", error: err.message });
    }
  },

  // Delete company and its image from Cloudinary
  deleteCompany: async (req, res) => {
    try {
      const { id } = req.params;
      const company = await Company.findById(id);
      if (!company) return res.status(404).json({ message: "Company not found" });

      // Delete logo from Cloudinary if exists
      if (company.logo && company.logo.public_id) {
        await deleteFile(company.logo.public_id);
      }

      await company.deleteOne();
      res.status(200).json({ message: "Company and logo deleted successfully" });
    } catch (err) {
      console.error("Error deleting company:", err);
      res.status(500).json({ message: "Failed to delete company", error: err.message });
    }
  },

  getAllCompanies: async (req, res) => {
    try {
      const companies = await Company.find();
      res.status(200).json({message:"All companies", companies});
    } catch (err) {
      res.status(500).json({ message: "Failed to get companies", error: err.message });
    }
  },

  // Get single company by ID
  getCompanyById: async (req, res) => {
    try {
      const { id } = req.params;
      const company = await Company.findById(id);
      if (!company) return res.status(404).json({ message: "Company not found" });
      res.status(200).json({message:"One company", company});
    } catch (err) {
      res.status(500).json({ message: "Failed to get company", error: err.message });
    }
  },

  // Update company
  updateCompany: async (req, res) => {
    try {
      const { id } = req.params;
      const updated = await Company.findByIdAndUpdate(id, req.body, { new: true });
      res.status(200).json({ message: "Company updated", company: updated });
    } catch (err) {
      res.status(500).json({ message: "Failed to update company", error: err.message });
    }
  },
};

module.exports = companyCtrl;