import React from 'react'

function CategoryCard({name, image}) {
  return (
  <div className='w-[120px] h-[120px] md:w-[180px] rounded-2xl
  border-2 border-[#c55f50] shrink-0 overflow-hidden bg-white shadow-xl shadow-gray-200 hover:shadow-lg transition-shadow relative'>
   <img src={image} alt=""  className='w-full h-full object-cover transform hover:scale-110 transition-transform duration-300'/>
    
    <div className='absolute bottom-0 left-0 w-full bg-[#ffffff96] bg-opacity-95 py-1 px-3 
    rounded-t-xl text-center shadow text-sm font-medium text-gray-800 backdrop-blur'>
{name}
    </div>
  </div>
  )
}

export default CategoryCard