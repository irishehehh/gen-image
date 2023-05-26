import mongoose from "mongoose";

const connectDB  = (url) => {
  // 空的查询，=> 所有 =>避免问题 so 严格查询
  mongoose.set('strictQuery',true)

  mongoose.connect(url)
  .then(() => console.log('mongodb connect'))
  .catch((err)=> console.log(err))

}

export default connectDB