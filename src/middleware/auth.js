const adminAuth=(req,res,next)=>{
    const token="xyz";
    const isAuthorizedAdmin=token==="xyz";
    if(!isAuthorizedAdmin){
        res.status(401).send("unAuthorized response!");
    }else{
        next();
    }
}
const userAuth=(req,res,next)=>{
    const token="uvxyz";
    const isAuthorizedAdmin=token==="xyz";
    if(!isAuthorizedAdmin){
        res.status(401).send("unAuthorized response!");
    }else{
        next();
    }
}
module.exports={
    adminAuth,userAuth
};