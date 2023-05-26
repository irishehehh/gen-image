import express from 'express';
import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';


dotenv.config();

const router = express.Router();


const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

// const url = 'https://api.openai.com/v1/images/generations'

const openai = new OpenAIApi(configuration);

router.route('/').get((req, res) => {
  res.status(200).json({ message: 'Hello from DALL-E!' });
});


// router.route('/').post(async (req, res) => {
//   console.log(1)
//   try {
//     const { prompt } = req.body;
//     const data = {
//       prompt,
//       n:1,
//       size:'1024x1024'
//     }
//   const res  = await  fetch(url,{
//       method:'POST',
//       headers:{
//        " Content-Type":"application/json",
//        "Authorization":"Bearer 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"
//       },
//       body:JSON.stringify(data)
//     })

 
   
//     // const aiResponse = await openai.createImage({
//     //   prompt:prompt,
//     //   n: 1,
//     //   size: '1024x1024',
//     //   response_format: 'b64_json',
//     // });
//   //  console.log(res)
//   const response = res.json()
//     // const image = aiResponse.data.data[0].b64_json;
//     const image = response.data[0].url
//     res.status(200).json({ photo: image });
//   } catch (error) {
//     // console.error(error);
//     // res.status(500).send(error?.response?.data.error.message || 'Something went wrong');
//   }
// });

export default router;