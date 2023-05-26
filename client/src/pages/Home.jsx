import axios from 'axios'
import React,{useState,useEffect} from 'react'
import { Loader,Card,FormField } from '../component'




const RenderCards = ({data,title}) => {
  if (data?.length > 0) {
    return data.map((post)=><Card key={post._id} {...post}/>)
  }

  return (

    <h2 className='mt-5 font-bold text-[#6449ff] uppercase text-xl'>
        {title}

    </h2>
  )



}



const Home = () => {

const [loading, setloading] = useState(false)
const [allPosts, setAllPosts] = useState(null)
const [searchText, setsearchText] = useState('')
const [searchResults, setSearchResults] = useState(null)
const [searchTimeout, setsearchTimeout] = useState(null)


  useEffect(() => {
    const fetchPosts = async () => {
      setloading(true)
      try {
        const resopnse = await axios('http://localhost:8080/api/v1/post',{
          method:'get',
          headers:{
            'Content-Type':'application/json'
          }
        })
        if (resopnse) {
          const result = resopnse.data.data
          setAllPosts(result.reverse())
        }


      }catch (error){
        alert(error)

      }finally {
        setloading(false)
      }

    }

    fetchPosts()

},[])

// 搜索

const handleSearchChange = (e) => {
  setsearchText(e.target.value)
  clearTimeout(searchTimeout)
    setsearchTimeout(
      setTimeout(() => {
        const searchResults = allPosts.filter((item)=>item.name.toLowerCase().includes(searchText.toLowerCase()) || 
         item.prompt.toLowerCase().includes(searchText.toLowerCase())
        )
        setSearchResults(searchResults)
        
      }, 500)
    )
}

  return (
    <section className='max-w-7xl mx-auto'>
      <div>
        <h1 className='font-extrabold text-[#222328] text-[32px]' >图片生成器</h1>
        <p className='mt-2 text-[#666e75 ] text-[14px] max-w-[500px]'>借用 openAI 的DALL - E 工具，通过文字描述自动生成优美的图片</p>
      </div>

      <div className='mt-16'>
        <FormField 
        labelName="Serach Posts"
        type="text"
        name="text"
        placeholder='输入一些关键字'
        value={searchText}
        handleChange={handleSearchChange}
        />

      </div>
      <div className='mt-10'>
        {loading ? (
          <div className='flex justify-center items-center'>
            <Loader/>

          </div>
        ):<>
        {searchText && (
          <h2 className='font-medium text-[#666e75] text-xl mb-3'>
            展示结果<span>{searchText}</span>
          </h2>

        )}

        <div className ='grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3'>
            {searchText ? (
              <RenderCards data={searchResults}
              title="没有搜索到结果"
              />
            ) : (
              <RenderCards 
              data={allPosts}
              title="无发布内容"
              />
            )}
        </div>
        
        </>}
      </div>
    </section>
  )
}

export default Home