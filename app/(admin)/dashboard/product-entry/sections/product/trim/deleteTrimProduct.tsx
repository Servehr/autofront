import { useEffect, useState } from "react"
import { BeatLoader } from "react-spinners"
import Message from "../../../../../../../components/shared/Message"
import { Modal } from "../../../../../../../components/modal/Modal"
import { RemoveTrim } from "../../../../../../api/admin/market/product-entry/trim"
import toast from "react-hot-toast"
import { productsDB } from "../../../../../../model/Product"


type DeleteTrimModalProps = 
{
    onClick: () => void 
    openDeleteTrim: boolean 
    token: string
    data: { id: number, tb_id: number, manufacturer_id: number,  model_id: number, model_name: string, manufacturer_name: string, name: string, rate: number }
}    

export const DeleteTrimProduct = ({onClick, openDeleteTrim, data, token}: DeleteTrimModalProps)  =>
{
        const [loading, setIsLoading] = useState<boolean>(false)
        const [id] = useState<number>(data?.id)
    
        const [errMsgStyle, setErrMsgStyle] = useState<string>('')
        const [errorMessage, setErrorMessage] = useState<string>("")
   
        useEffect(() => 
        {
           setErrMsgStyle('text-md text-white font-bold bg-red-600 rounded-lg py-3 px-5')
        }, []) 
   
        const deleteProductTrimModal = async () => 
        { 
              setIsLoading(true)
              const deleteManufacturer = RemoveTrim(id, token)
              deleteManufacturer.then((response) => 
              {
                  if(response?.status === 200)
                  {
                      productsDB.clear()
                      productsDB.bulkAdd(response?.data)
                      toast.success('Deleted', {
                          position: "top-center",
                      });
                      onClick()  
                  } else {
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
                        onClick={onClick} isOpen={openDeleteTrim} wrapperWidth={650} margin={'200px auto 0px auto'}
                >
                        { errorMessage && <Message msg={errorMessage} status={errMsgStyle} />  }
                        <div 
                           className='col-span-12 pt-1 pb-5 overflow-y-auto xm:overflow-y-scroll justify-center item-center'
                        >
                                { errorMessage && <Message msg={errorMessage} status={errMsgStyle} />  }
                                <div 
                                className="font-bold text-xl flex justify-center text-center"
                                >
                                        You are about deleting <span className="font-bold text-blue-500 mr-2 ml-2">{`${data?.name}`}</span> model
                                </div>
                                <div 
                                className='w-full pt-5 overflow-y-auto xm:overflow-y-scroll justify-center item-center space-x-2 pl-14 m-auto'
                                >                                       
                                        <button 
                                            className="w-5/12 py-3 px-4 bg-red-600 text-white font-semibold text-sm rounded-xl"
                                            onClick={() => onClick() }
                                        >
                                        Cancel
                                        </button>
                                        
                                        <button 
                                           className="w-5/12 py-3 px-4 bg-green-600 text-white font-semibold text-sm rounded-xl hover:bg-green-800"
                                                onClick={() => deleteProductTrimModal()}
                                        >
                                        {       (loading === true) ? ( <BeatLoader size={9} color="#fff" className="text-white" />) : ( "Delete" ) } 
                                        </button>                                        
                                </div>
                        </div>
                </Modal>  
        );
}
