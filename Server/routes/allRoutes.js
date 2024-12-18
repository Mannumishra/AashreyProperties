const express = require('express');
const router = express.Router();

// Controllers
const { createProperty, getPropertyById, updateProperty, deleteProperty, getProperties, updatePropertyStatus, getAllProperty, getPropertiesByVendor, getApprovedProperties, getPropertyCategory, getPropertiesByCategory, getPropertyTypes, getPropertiesByType, getApprovedPropertiesByCategory, getPropertyByName } = require('../controlers/property.controler');
// const userController = require('../controlers/user.controler');
const { register, PasswordChangeRequest, ResendOtp, ResendSignOtp, verifyOtpForSignIn, VerifyOtp, LoginUser, getAllUsers, LoginAdmin } = require('../controlers/user.controler');

const locationController = require('../controlers/location.contoler');


// Middleware
const authenticate = require('../middlewares/auth');
const authorizeRoles = require('../middlewares/roleauth');
// const { multipleImages } = require('../middlewares/Multer');
const upload = require('../middlewares/multer');
const { createRecord, getBlog, getSingleBlog, updateBlog, deleteBlog } = require('../controlers/BlogController');
const { createPopup, getAllPopups, getPopupById, updatePopup, deletePopup } = require('../controlers/popupController');

// Property Routes
router.post('/create-property', upload.array("images", 10), createProperty);

router.get('/get-property-by-id/:id', getPropertyById);
router.get('/property-by-name/:name', getPropertyByName);
router.get('/get-all-properties', getAllProperty);
router.put('/update-property/:id', updateProperty);
router.delete('/delete-property/:_id', deleteProperty);
router.get('/get-properties-by-query', getProperties);
router.patch('/properties/:id/status', updatePropertyStatus);
router.get('/get-properties-by-vendor/:vendorId', getPropertiesByVendor);
router.get('/approved-properties', getApprovedProperties)
router.get('/get-property-category', getPropertyCategory)
router.get('/properties/category/:category', getPropertiesByCategory);
router.get('/approved-properties/:category', getApprovedPropertiesByCategory);
router.get('/properties/types', getPropertyTypes);
router.get('/properties/type/:type', getPropertiesByType);



// User Routes
// router.post('/register', userController.registerUser);
// router.post('/login', userController.loginUser);
// router.get('/users/:id', authenticate, authorizeRoles('Admin'), userController.getUserById);
// router.get('/vendors', authenticate, authorizeRoles('Admin'), userController.getVendors);
// router.delete('/users/:id', authenticate, authorizeRoles('Admin'), userController.deleteUser);

// Location Routes
router.post('/create-location', locationController.createLocation);
// router.get('/locations/:id', locationController.getLocationById);
router.get('/get-all-location', locationController.getAllLocation);
router.get('/get-locations-by-query', locationController.getLocations);
router.put('/update-location/:id', locationController.updateLocation);
router.delete('/delete-location/:id', locationController.deleteLocation);

// // -- Authentication ---- 
router.post("/register", register) // create Account

router.post('/Password-change-request', PasswordChangeRequest);
router.post('/Resend-Otp', ResendOtp);
router.post('/Verify-sign-Otp', verifyOtpForSignIn);
router.post('/resend-sign-Otp', ResendSignOtp);
router.post('/Verify-Otp/:email', VerifyOtp)

router.post("/login", LoginUser);
router.post("/admin-login", LoginAdmin);
router.get("/all-users", getAllUsers);

router.post("/add-blog", upload.single("image"), createRecord)
router.get("/get-blogs", getBlog)
router.get("/get-blog/:id", getSingleBlog)
router.put("/update-blog/:id",upload.single("image"), updateBlog)
router.delete("/delete-blog/:id", deleteBlog)


router.post("/popup", createPopup);
router.get("/get-popup", getAllPopups);
router.get("/getpopup/:id", getPopupById);
router.put("/update/popup/:id", updatePopup);
router.delete("/deletepopup/:id", deletePopup);




module.exports = router;
