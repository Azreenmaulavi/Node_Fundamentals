const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();

// Set storage engine for multer
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Init upload with multer
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }, // Limit: 1MB
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).single('myFile');

// Check File Type
function checkFileType(file, cb) {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}

// Serve HTML form
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>File Upload Form</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 50px;
                }

                .container {
                    max-width: 400px;
                    margin: 0 auto;
                    padding: 20px;
                    border: 1px solid #ccc;
                    border-radius: 10px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                }

                input[type="file"],
                input[type="submit"] {
                    width: 100%;
                    padding: 10px;
                    margin-top: 10px;
                }

                input[type="submit"] {
                    background-color: #28a745;
                    color: white;
                    border: none;
                    cursor: pointer;
                }

                input[type="submit"]:hover {
                    background-color: #218838;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h2>Upload a File</h2>
                <form action="/upload" method="POST" enctype="multipart/form-data">
                    <input type="file" name="myFile" required><br>
                    <input type="submit" value="Upload File">
                </form>
            </div>
        </body>
        </html>
    `);
});

// Handle file upload
app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            res.send(`Error: ${err}`);
        } else {
            if (req.file == undefined) {
                res.send('Error: No file selected!');
            } else {
                res.send(`File Uploaded Successfully! <br> <a href="/">Go Back</a>`);
            }
        }
    });
});

// Set uploads folder as static to access uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
