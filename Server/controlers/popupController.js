const Popup = require("../models/PopupModel");


// Create a new popup
const createPopup = async (req, res) => {
    console.log(req.body)
  try {
    const { name, email, phone, message, lookingfor } = req.body;

    if (!name || !email || !phone || !message || !lookingfor) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const newPopup = new Popup({ name, email, phone, message, lookingfor });
    await newPopup.save();

    res.status(201).json({ message: "Popup created successfully", data: newPopup });
  } catch (error) {
    res.status(500).json({ error: "Error creating popup", details: error.message });
  }
};

// Get all popups
const getAllPopups = async (req, res) => {
  try {
    const popups = await Popup.find();
    res.status(200).json({ data: popups });
  } catch (error) {
    res.status(500).json({ error: "Error fetching popups", details: error.message });
  }
};

// Get a single popup by ID
const getPopupById = async (req, res) => {
  try {
    const { id } = req.params;
    const popup = await Popup.findById(id);

    if (!popup) {
      return res.status(404).json({ error: "Popup not found" });
    }

    res.status(200).json({ data: popup });
  } catch (error) {
    res.status(500).json({ error: "Error fetching popup", details: error.message });
  }
};

// Update a popup by ID
const updatePopup = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, message, lookingfor } = req.body;

    const updatedPopup = await Popup.findByIdAndUpdate(
      id,
      { name, email, phone, message, lookingfor },
      { new: true, runValidators: true }
    );

    if (!updatedPopup) {
      return res.status(404).json({ error: "Popup not found" });
    }

    res.status(200).json({ message: "Popup updated successfully", data: updatedPopup });
  } catch (error) {
    res.status(500).json({ error: "Error updating popup", details: error.message });
  }
};

// Delete a popup by ID
const deletePopup = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPopup = await Popup.findByIdAndDelete(id);

    if (!deletedPopup) {
      return res.status(404).json({ error: "Popup not found" });
    }

    res.status(200).json({ message: "Popup deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting popup", details: error.message });
  }
};

module.exports = {
  createPopup,
  getAllPopups,
  getPopupById,
  updatePopup,
  deletePopup,
};
