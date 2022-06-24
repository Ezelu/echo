import jwt from 'jsonwebtoken';



const authMiddleWare = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500 // < 500 = Ours, > 500 = GOOGLE;
  

    let decodedData;
    // If we have a token and the token belongs to us...
    if ( token && isCustomAuth ) {
      decodedData = jwt.verify( token, 'test');
      req.userId = decodedData?.id;
    } 
    else {
      decodedData = jwt.decode(token);
      req.userId = decodedData?.sub;
    }

    next() //Allow user to perfom other acions
  } 


  catch (error) {
    console.log(error)
  }
}


export default authMiddleWare;