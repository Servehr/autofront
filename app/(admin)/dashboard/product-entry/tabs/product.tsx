import React, {useState } from 'react'
import Manufacturer from '../sections/product/manufacturer'
import Model from '../sections/product/model'
import Trim from '../sections/product/trim'
import Engine from '../sections/product/engine'

export default function Product() 
{ 
    const [activeTabIndex, setActiveTabIndex] = useState<number>(0);

    const tabsData = [   
      {
        label: "Manufacturer",
        content: <Manufacturer />
      },
      {
        label: "Model",
        content: <Model />
      },
      {
        label: "Trim",
        content: <Trim />
      },
      {
        label: "Engine",
        content: <Engine />
      }
    ]
    
    return (
        <div 
              className="w-full"
        >  
           <div 
                    className="py-5 mb-3 -mt-5 mx-auto md:mx-5 pb-8 rounded-none overflow-hidden"
              >        
                    <div 
                        className="flex space-x-20 w-12/12 h-16 -mt-2 overflow-x-scroll scrollbar-track-white scrollbar-thin overflow-y-hidden px-1 mx-1 md:px-5 md:mx-5 border-2 bg-white border-bg-[#d1dbea]" 
                    >
                        <div 
                                className="flex w-full mr-5 mt-1 mb-2" 
                        >
                            {
                                tabsData.map((tab, index) => {
                                    return (
                                            <button
                                                    key={index}
                                                    className={` rounded-none py-2 rounded-2xl flex justify-between items-center border-b-4 px-5 m-auto font-semibold transition-colors duration-300 text-md border-t-1 ${
                                                    index === activeTabIndex
                                                    ? "border-black bg-green-700 text-white font-bold"
                                                    : "border-transparent hover:border-green-700 text-black"
                                                    }`}
                                                    style={{fontSize:"12px", paddingTop: '15px', fontWeight: 'bolder'}}
                                                    onClick={() => setActiveTabIndex(index)}>
                                                    {tab.label.toUpperCase()}
                                            </button>
                                            );
                                    })
                            }
                        </div>
                    </div>
                    
                    {/* Show active tab content. */}
                    <div 
                        className="px-1 md:px-5 mt-3"
                    >
                        <div>{tabsData[activeTabIndex].content}</div>
                    </div>                   
           </div>
        </div>
  )
}