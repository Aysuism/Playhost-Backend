// const fs = require('fs');
// const path = require('path');

// function deleteManyOldImage(imagePath) {
//     imagePath.map(item => {
//         const fullImagePath = path.join(item);
//         fs.unlink(fullImagePath, (error) => {
//             if (error) {
//                 console.log("Wrong process!");
//             } else {
//                 console.log("The old image was deleted successfully!");

//             }
//         })
//     })

// }

// function deleteSingleOldImage(imagePath) {
//     const fullImagePath = path.join(imagePath);
//     fs.unlink(fullImagePath, (error) => {
//         if (error) {
//             console.log("Wrong process!");
//         } else {
//             console.log("The old image was deleted successfully!");

//         }
//     })
// }

// module.exports = { deleteManyOldImage, deleteSingleOldImage }

const fs = require("fs");
const path = require("path");

function deleteManyOldImage(imagePaths) {
    if (!Array.isArray(imagePaths)) {
        console.log("Invalid input: Expected an array of image paths.");
        return;
    }

    imagePaths.forEach((item) => {
        const fullImagePath = path.resolve(item);

        if (fs.existsSync(fullImagePath)) {
            fs.unlink(fullImagePath, (error) => {
                if (error) {
                    console.log(`Error deleting file ${fullImagePath}:`, error.message);
                } else {
                    console.log(`The old image ${fullImagePath} was deleted successfully!`);
                }
            });
        } else {
            console.log(`File not found: ${fullImagePath}`);
        }
    });
}

function deleteSingleOldImage(imagePath) {
    if (!imagePath) {
        console.log("Invalid input: Image path is required.");
        return;
    }

    const fullImagePath = path.resolve(imagePath);

    if (fs.existsSync(fullImagePath)) {
        fs.unlink(fullImagePath, (error) => {
            if (error) {
                console.log(`Error deleting file ${fullImagePath}:`, error.message);
            } else {
                console.log(`The old image ${fullImagePath} was deleted successfully!`);
            }
        });
    } else {
        console.log(`File not found: ${fullImagePath}`);
    }
}

module.exports = { deleteManyOldImage, deleteSingleOldImage };
