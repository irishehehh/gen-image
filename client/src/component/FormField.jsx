import React from 'react'

const FormField = ({labelName,name,type,value,handleChange,
  placeholder, isSurpriseMe,handleSurpriseme

}) => {
  return (
   <div>
      <div className='flex items-center gap-2 mg-2'>
      <label htmlFor={name} className="block text-sm 
      font-medium text-gray-900 mb-2

      ">{labelName}</label>
        {isSurpriseMe && (
          <button type='button' 
          onClick={handleSurpriseme}
          className="font-semibold text-xs bg-[#ececf1]
          py-1 px-2 rounded-[5px] text-black
          cursor-pointer mb-2 mt-1
          "
          >surprise me</button>
        )}
      </div>
      <input type={type} name={name} 
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      required
      className='bg-gray-50 border border-gray-300 text-gray-900
      text-sm rounded-lg focus:ring-[#4649ff] focus:border-[#4649ff]
      outline-none block w-full p-3
      '
      
      
      />
   </div>
  )
}

export default FormField