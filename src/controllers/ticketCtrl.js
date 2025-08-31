const { uploadFile, deleteFile } = require("../services/cloudinary");
const Ticket = require("../models/Ticket");

const ticketCtrl = {
  // CREATE a new ticket
  createTicket: async (req, res) => {
    try {
      if (!req.userIsAdmin) {
        return res.status(405).json({ message: "Not allowed" });
      }

      const {
        name,
        price,
        departureDate,
        returnDate,
        visaType,
        departureCity,
        stopoverCities,
        arrivalCity,
        seatsLeft,
        type,
        mealPlan,
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

      const newTicket = new Ticket({
        name,
        photo: photoUpload, // full object (url, public_id, etc)
        price,
        departureDate,
        returnDate,
        visaType,
        departureCity,
        stopoverCities: stopoverCities ? JSON.parse(stopoverCities) : [],
        arrivalCity,
        seatsLeft,
        type,
        mealPlan,
        company,
        details,
      });

      await newTicket.save();
      res.status(201).json({ message: "Success", newTicket });
    } catch (err) {
      console.error("Create Ticket Error:", err);
      res.status(500).json({ error: "Failed to create ticket" });
    }
  },

  // GET all tickets
  getAllTickets: async (req, res) => {
    try {
      const tickets = await Ticket.find()
        .populate("company")
        .sort({ createdAt: -1 });
      res.status(200).json({ message: "All tickets", tickets });
    } catch (err) {
      console.error("Get Tickets Error:", err);
      res.status(500).json({ error: "Failed to get tickets" });
    }
  },

  // GET a single ticket by ID
  getTicketById: async (req, res) => {
    try {
      const ticket = await Ticket.findById(req.params.id).populate("company");
      if (!ticket) return res.status(404).json({ error: "Ticket not found" });
      res.status(200).json({ message: "Ticket found", ticket });
    } catch (err) {
      console.error("Get Ticket Error:", err);
      res.status(500).json({ error: "Failed to get ticket" });
    }
  },

  // UPDATE a ticket
  updateTicket: async (req, res) => {
    try {
      const updatedData = req.body;

      // if new photo is uploaded, replace it
      if (req.files?.photo) {
        const photoUpload = await uploadFile(req.files.photo);
        updatedData.photo = photoUpload;
      }

      const ticket = await Ticket.findByIdAndUpdate(
        req.params.id,
        updatedData,
        { new: true }
      );

      if (!ticket) return res.status(404).json({ error: "Ticket not found" });

      res.status(200).json({message: "Success",ticket});
    } catch (err) {
      console.error("Update Ticket Error:", err);
      res.status(500).json({ error: "Failed to update ticket" });
    }
  },

  // DELETE a ticket
  deleteTicket: async (req, res) => {
    try {
      if (req.userIsAdmin) {
        const ticket = await Ticket.findById(req.params.id);
        if (!ticket) return res.status(404).json({ error: "Ticket not found" });

        // Delete photo from Cloudinary if exists
        if (ticket.photo?.public_id) {
          await deleteFile(ticket.photo.public_id);
        }

        // Delete ticket
        await Ticket.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: "Ticket deleted successfully" });
      } else {
        res.status(405).json({ message: "Not allowed" });
      }
    } catch (err) {
      console.error("Delete Ticket Error:", err);
      res.status(500).json({ error: "Failed to delete ticket" });
    }
  },
};

module.exports = ticketCtrl;
