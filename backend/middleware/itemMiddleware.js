const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    console.log(file)
    // Accept a file
    if(file.mimetype === "image/jpeg" || file.mimetype === "image/png") cb(null, true);
    // Reject file
    else cb(new Error("Filetype is wrong"), false);
}

const upload = multer({storage, limits: {
    // Max size = 5MB
    fileSize: 1024 * 1024 * 5
    },
    fileFilter
})

module.exports = {upload}