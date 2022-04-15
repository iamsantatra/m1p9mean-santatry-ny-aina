const cloudinary = require("cloudinary")
const dotenv = require("dotenv")

dotenv.config()

cloudinary.config({
  cloud_name: "dyptj60q1",
  api_key: "273769975774792",
  api_secret: "T0XaSBVLr3iG5IqdlBGZMzgiTVQ"
})

exports.uploads = (file, folder) => {
  return new Promise(resolve => {
    cloudinary.uploader.upload(file, (result) => {
      resolve({
        url: result.url,
        id: result.public_id
      })
    }, {
      resource_type: "auto",
      folder: folder
    })
  })
}
