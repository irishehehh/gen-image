import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import {preview} from '../assets'
import {getRandomPrompt} from '../utils'
import axios from 'axios'

import { FormField,Loader } from '../component'
const CreatePost = () => {
    const naviagte = useNavigate()

    const [form, setform] = useState({
      name:'',
      prompt:'',
      photo:''
    })
    const [generatingImg, setgeneratingImg] = useState(false)
    const [loading, setloading] = useState(false)

    const handleSubmit = async (e) => {
      e.preventDefault()
      if (form.prompt && form.photo) {
        setloading(true)

        try {
          const response = await axios('http://localhost:8080/api/v1/post',{
            method:'post',
            headers:{
              'Content-Type':'application/json'
            },
            data:JSON.stringify(form)
          })

        naviagte('/')

        }catch (error) {
          alert(error)

        }finally {
          setloading(false)
        }
      }


    }

    const handleChange = (e) => {
      setform({
        ...form,
      [e.target.name]:e.target.value

      })

    }

    const handleSurpriseme = () => {
      const randomPrompt = getRandomPrompt(form.prompt)
      setform({
        ...form,
        prompt:randomPrompt
      })

    }
    const generateImage  = async () => {
      if (form.prompt) {
        try {
          setgeneratingImg(true)
          const res = await axios({
            method:'post',
            url:"https://api.openai.com/v1/images/generations",
            headers:{
              "Authorization":"Bearer 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"
            },
            data:{
              prompt:form.prompt,
              n:1,
              size:'1024x1024'
            }
          })
  

          const Photo_url = res.data.data[0].url
          setform({...form,photo:`${Photo_url}`})

        }catch (err) {
          console.log(err + '111')
          alert(err)

        }finally {
          setgeneratingImg(false)
        }
      }else {
        alert('请 输入一个prompt')
      }

    }
      
  return (
    <section className='max-w-7xl mx-auto'>
       <div>
        <h1 className='font-extrabold text-[#222328] text-[32px]' >Create</h1>
        <p className='mt-2 text-[#666e75 ] text-[14px] max-w-[500px]'>借用 openAI 的DALL - E 工具，通过文字描述自动生成优美的图片</p>
      </div>
      <form  className='mt-16 max-w-3xl ' onSubmit={handleSubmit}>
        <div className='flex flex-col '>
          <FormField 
          labelName="你的名字"
          type="text"
          name="name"
          placehodler="sjs"
          value={form.name}
          handleChange={handleChange}
          />
             <FormField 
          labelName="prompt"
          type="text"
          name="prompt"
          placehodler="a bowl of soup that looks like a monster, knitted out of wool"
          value={form.prompt}
          handleChange={handleChange}
          isSurpriseMe
          handleSurpriseme = {handleSurpriseme}
          />

     {/* preview image */}
          <div className='relative bg-gray-50 border border-gray-300
          text-gray-900 text-sm rounded-lg focus:ring-blue-500
          focus:border-blue-500 
          w-64 p-3 h-64 flex justify-center
          items-center mt-3
          '>
            {form.photo ? (
              <img src={form.photo} alt={form.prompt} className="
              w-full h-full object-contain
              " />
            ) : (
              <img src={preview} alt="preview" className='w-9/12 h-9/12 object-contain
              opacity-40
              '/>
            )}
            {generatingImg && (
              <div className='absolute inset-0 z-0 flex justify-center items-center
              bg-[rgba(0,0,0,.5)]
              '>
                <Loader/>
              </div>
            )}

          </div>

        </div>

        <div className='mt-5 flex gap-5'>
          <button type='button'
          onClick={generateImage}
          className="text-white bg-green-700 rounded-md 
          w-full text-sm sm:w-auto px-5 py-2.5
          "
          >
          {generatingImg ? '生成中...' : '生成'}
          </button>
          


        </div>

        <div className='mt-10 '>
         <p className='
         mt-2 text-[14px] text-[#666e75]
         '>如果创造了你想要的图片，可以分享到社区里</p>  
          <button
          type='submit'
          className='
          mt-3 text-white bg-[#6469ff]
          font-medium rounded-md
          text-sm w-full sm:w-auto
          px-5 py-2.5 text-center
          '
          >

            {loading ? '分享中...' : '分享到社区里'}
          </button>

        </div>


      </form>


    </section>
  )
}

export default CreatePost