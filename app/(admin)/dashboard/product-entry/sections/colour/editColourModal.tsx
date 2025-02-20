import { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import { Modal } from "../../../../../../components/modal/Modal";
import toast from "react-hot-toast";
import Message from "../../../../../../components/shared/Message";
import { UpdateColour } from "../../../../../api/admin/market/colour";

type EditColourProductProps = 
{
    onClick: () => void,
    openColourProduct: boolean,
    token: string,
    data: { id: number, name: string, rate: number }
} 

export const EditColourModal = ({onClick, openColourProduct, data, token}: EditColourProductProps)  =>
{
        const [loading, setIsLoading] = useState(false)
        const [id] = useState<number>(data?.id)
        const [name, setName] = useState<string>(data?.name)
        const [colourRate, setColourRate] = useState<number>(data?.rate)
        const [errMsgStyle, setErrMsgStyle] = useState<string>('')
        const [errorMessage, setErrorMessage] = useState<string>("")


        useEffect(() => 
        {
           setErrMsgStyle('text-md text-white font-bold bg-red-600 rounded-lg py-3 px-5')
           setErrorMessage("")
        }, []) 
        
        const UpdateColor = () => 
        {
            setIsLoading(true)
            const updateCondition = UpdateColour(id, name, colourRate, token)
            updateCondition.then((response) => 
            {
                if(response?.status === 200)
                {
                   setIsLoading(false)
                   toast.success('Updated', {
                      position: "top-center",
                   });
                   onClick()  
                } else {
                   setIsLoading(false)
                   setErrorMessage(response?.message)
                   setTimeout(() => 
                   {
                      setErrorMessage("")
                   }, 5000)
                }
            }).then(() => {

            })
        }
        return (
                <Modal 
                        onClick={onClick} isOpen={openColourProduct} wrapperWidth={800} margin={'120px auto 0px auto'}
                >
                        <div 
                                className='col-span-12 pt-1 pb-1 overflow-y-auto xm:overflow-y-scroll justify-center item-center'
                        >
                                { errorMessage && <Message msg={errorMessage} status={errMsgStyle} />  }
                                <div 
                                                className='col-span-12 pt-1 pb-1 overflow-y-auto xm:overflow-y-scroll justify-center item-center'
                                >
                                        <h1 
                                                className="text-black font-bold w-full flex justify-left text-center mb-5"
                                        >
                                                Edit Colour
                                        </h1>
                                        <div 
                                                className="mb-4 md:w-full"
                                        >
                                                <input  
                                                        defaultValue={name}
                                                        onChange={(e) => {
                                                                setName(e.target.value) 
                                                        }}
                                                        className="w-full border rounded-md p-3 bg-gray-100 bg-opacity-75 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out" 
                                                        type="text" name="colour" id="colour" placeholder="Enter Colour Name" 
                                                />
                                        </div>                                
                                        <div 
                                                className="mb-4 md:w-full"
                                        >
                                                <input  
                                                        defaultValue={colourRate}
                                                        className="w-full border rounded-md p-3 bg-gray-100 bg-opacity-75 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out" 
                                                        type="text" name="categoryRate" id="categoryRate" placeholder="Enter Category Rate" 
                                                        onChange={(e) => {
                                                              setColourRate(Number(e.target.value)) 
                                                        }}
                                                />
                                        </div>      
                                        <div 
                                                className="items-center gap-5 mt-2 sm:flex flex justify-between mx-1 mt-5"
                                        >                                       
                                                {
                                                        <button 
                                                                className="py-3 px-4 bg-red-700 hover:bg-red-800 text-white font-semibold text-sm rounded-xl w-max"
                                                                onClick={() => onClick() }
                                                        >
                                                                        Close
                                                        </button>
                                                }
                                                {
                                                <button 
                                                                className="py-3 px-4 bg-green-800 hover:bg-green-700 text-white font-semibold text-sm rounded-xl w-max"
                                                                onClick={() => UpdateColor()}
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