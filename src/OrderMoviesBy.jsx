import React from 'react'
import {ChevronDownIcon, ChevronUpIcon} from "@heroicons/react/16/solid/index.js";

const OrderMoviesBy = ({type, sortMoviesBy, sortOrder}) => {
  return (
    <div className = "orderBy" onClick={()=>sortMoviesBy(type)}>
      {type}
      <div className="arrows">
        <ChevronUpIcon className={sortOrder === '' ? ('inactiveIcons') : (sortOrder==='asc'?('orderIcons'):('inactiveIcons') )}/>
        <ChevronDownIcon className={sortOrder === '' ? ('inactiveIcons') : (sortOrder==='asc'?('inactiveIcons'):('orderIcons')) }/> 
      </div>
    </div>
  )
}

export default OrderMoviesBy