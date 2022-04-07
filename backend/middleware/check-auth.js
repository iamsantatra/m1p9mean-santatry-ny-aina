const jwt = require("jsonwebtoken")

// module.exports = (req, res, next) => {
//   try {
//     const token = req.headers.authorization.split(" ")[1]
//     jwt.verify(token, "secret_this_should_be_longer")
//     next()
//   } catch (error) {
//     res.status(401).json({message: "Acces non autorisé"})
//   }
// }

module.exports =  (types = []) => {

  if (typeof types === 'string') {
    types = [types];
  }
  return (req, res, next) => {
      try {
        const token =  req.headers.authorization.split(" ")[1]
        const decodedToken =  jwt.verify(token, "secret_this_should_be_longer")
        req.userData = { userId: decodedToken.userId, type: decodedToken.type, restaurant_id: decodedToken.restaurant_id };
        // console.log(decodedToken)
        if (types.length && !types.includes(req.userData.type)) {
          res.status(401).json({message: "Acces non autorisé"})
        } else {
          next()
        }
      } catch (error) {
        res.status(401).json({message: "Acces non autorisé"})
      }
    }
}
