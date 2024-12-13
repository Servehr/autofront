import { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
// import Message from "../../../../../../../components/shared/Message"
import { Modal } from "../../../../../../../components/modal/Modal"

type EditManufacturerProductProps = 
{
    onClick: (isOpen: boolean) => void,
    openManufacturerProduct: boolean,
    userType: string
    token: string
} 

export const EditManufacturerProduct = ({onClick, openManufacturerProduct, userType, token}: EditManufacturerProductProps)  =>
{
        const [loading, setIsLoading] = useState(false)

        useEffect(() => {
                setIsLoading(false)
                console.log({ userType, token })
        }, []) 

        return (
                <Modal 
                        onClick={onClick} isOpen={openManufacturerProduct} wrapperWidth={800} margin={'120px auto 0px auto'}
                >
                        <div 
                                className='col-span-12 pt-1 pb-1 overflow-y-auto xm:overflow-y-scroll justify-center item-center'
                        >
                                <div 
                                                className='col-span-12 pt-1 pb-1 overflow-y-auto xm:overflow-y-scroll justify-center item-center'
                                >
                                        <h1 
                                                className="text-black font-bold w-full flex justify-left text-center mb-5"
                                        >
                                                Edit Manufacturer
                                        </h1>
                                        <div 
                                                className="mb-4 md:w-full"
                                        >
                                                <input  
                                                        className="w-full border rounded-md p-3 bg-gray-100 bg-opacity-75 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out" 
                                                        type="text" name="transmission" id="transmission" placeholder="Enter Transmission Name" 
                                                />
                                        </div>   
                                        <div 
                                        className="items-center gap-5 mt-2 sm:flex flex justify-between mx-1 mt-5"
                                        >                                       
                                                {
                                                        <button 
                                                                className="py-3 px-4 bg-red-700 hover:bg-red-800 text-white font-semibold text-sm rounded-xl w-max"
                                                                onClick={() => onClick(openManufacturerProduct) }
                                                        >
                                                                        Close
                                                        </button>
                                                }
                                                {
                                                <button 
                                                                className="py-3 px-4 bg-green-800 hover:bg-green-700 text-white font-semibold text-sm rounded-xl w-max"
                                                                onClick={() => console.log('')}
                                                                        >
                                                                {       loading ? ( <BeatLoader size={9} color="#fff" />) : ( "Update" )          }
                                                </button>
                                                }
                                        </div>
                                </div>
                        </div>
                </Modal>   
        );
}