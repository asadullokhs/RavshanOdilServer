const { uploadFile, deleteFile } = require("../services/cloudinary");
const Package = require("../models/Package");

const packageCtrl = {
  // CREATE a new package
  createPackage: async (req, res) => {
    try {
      if (!req.userIsAdmin) {
        return res.status(405).json({ message: "Not allowed" });
      }

      const {
        name,
        price,
        duration,
        departureDate,
        returnDate,
        visaType,
        departureCity,
        stopoverCities,
        seatsLeft,
        type,
        arrivalCity,
        hotelName,
        hotelDistance,
        hotelStars,
        hotelDescription,
        mealPlan,
        medicalService,
        transportService,
        gifts,
        company,
        details,
      } = req.body;

      // ---------------------
      // Upload MAIN photo
      // ---------------------
      if (!req.files?.photo) {
        return res.status(400).json({ message: "Photo is required" });
      }
      const photoUpload = await uploadFile(req.files.photo);

      // ---------------------
      // Upload hotelImages
      // ---------------------
      let hotelImages = [];
      if (req.files?.hotelImages) {
        const files = Array.isArray(req.files.hotelImages)
          ? req.files.hotelImages
          : [req.files.hotelImages];

        for (const file of files) {
          const result = await uploadFile(file);
          hotelImages.push(result.url);
        }
      }

      const newPackage = new Package({
        name,
        photo: photoUpload, // full object (url, public_id, etc)
        price,
        duration,
        departureDate,
        returnDate,
        visaType,
        departureCity,
        stopoverCities: JSON.parse(stopoverCities),
        arrivalCity,
        hotelName,
        hotelDistance,
        hotelStars,
        hotelDescription,
        hotelImages,
        mealPlan,
        medicalService,
        transportService,
        gifts: JSON.parse(gifts),
        company,
        seatsLeft,
        type,
        details,
      });

      await newPackage.save();
      res.status(201).json(newPackage);
    } catch (err) {
      console.error("Create Package Error:", err);
      res.status(500).json({ error: "Failed to create package" });
    }
  },
  // GET all packages
  getAllPackages: async (req, res) => {
    try {
      const packages = await Package.find()
        .populate("company")
        .sort({ createdAt: -1 });
      res.status(200).json({message: "All packages", packages});
    } catch (err) {
      console.error("Get Packages Error:", err);
      res.status(500).json({ error: "Failed to get packages" });
    }
  },

  // GET a single package by ID
  getPackageById: async (req, res) => {
    try {
      const pkg = await Package.findById(req.params.id).populate("company");
      if (!pkg) return res.status(404).json({ error: "Package not found" });
      res.status(200).json({message: "Package found", package: pkg});
    } catch (err) {
      console.error("Get Package Error:", err);
      res.status(500).json({ error: "Failed to get package" });
    }
  },

  // UPDATE a package
  updatePackage: async (req, res) => {
    try {
      const updated = req.body;
      if (updated.name) updated.name = JSON.parse(updated.name);
      if (updated.duration) updated.duration = JSON.parse(updated.duration);
      if (updated.visaType) updated.visaType = JSON.parse(updated.visaType);
      if (updated.departureCity)
        updated.departureCity = JSON.parse(updated.departureCity);
      if (updated.arrivalCity)
        updated.arrivalCity = JSON.parse(updated.arrivalCity);
      if (updated.stopoverCities)
        updated.stopoverCities = JSON.parse(updated.stopoverCities);
      if (updated.hotel?.description)
        updated.hotel.description = JSON.parse(updated.hotel.description);
      if (updated.mealPlan) updated.mealPlan = JSON.parse(updated.mealPlan);
      if (updated.medicalService)
        updated.medicalService = JSON.parse(updated.medicalService);
      if (updated.transportService)
        updated.transportService = JSON.parse(updated.transportService);
      if (updated.gifts) updated.gifts = JSON.parse(updated.gifts);
      if (updated.details) updated.details = JSON.parse(updated.details);

      const pkg = await Package.findByIdAndUpdate(req.params.id, updated, {
        new: true,
      });
      if (!pkg) return res.status(404).json({ error: "Package not found" });

      res.status(200).json(pkg);
    } catch (err) {
      console.error("Update Package Error:", err);
      res.status(500).json({ error: "Failed to update package" });
    }
  },

  // DELETE a package
  deletePackage: async (req, res) => {
    try {
      const pkg = await Package.findById(req.params.id);
      if (!pkg) return res.status(404).json({ error: "Package not found" });

      // Delete hotel images from Cloudinary if they exist
      if (pkg.hotel && Array.isArray(pkg.hotel.images)) {
        for (const img of pkg.hotel.images) {
          if (img.public_id) {
            await deleteFile(img.public_id);
          }
        }
      }

      // Delete the package itself
      await Package.findByIdAndDelete(req.params.id);

      res.status(200).json({ message: "Package deleted successfully" });
    } catch (err) {
      console.error("Delete Package Error:", err);
      res.status(500).json({ error: "Failed to delete package" });
    }
  },
};

module.exports = packageCtrl;
