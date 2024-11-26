"use client"

import { useEffect, useState } from "react"
import { UseStore } from "../../../../state/store"
import SelectCountry from "../../../../components/advert/SelectCountry"
import SelectState from "../../../../components/advert/SelectState"
import SelectManufacturer from "../../../../components/advert/SelectManufacturer"
import SelectModel from "../../../../components/advert/SelectModel"
import SelectTrim from "../../../../components/advert/SelectTrim"
import SelectEngine from "../../../../components/advert/SelectEngine"
import Message from "../../../../components/shared/Message"
import { useCreateAd } from "../../../hook/queries/useCreateAd"
import { BeatLoader, PuffLoader } from "react-spinners"
import SelectCategory from "../../../../components/SelectCategory"
import SelectFuel from "../../../../components/advert/SelectFuel"
import SelectYear from "../../../../components/advert/SelectYear"
import { Years } from "../../../../components/util/years"
import SelectColour from "../../../../components/advert/SelectColour"
import SelectTransmission from "../../../../components/advert/SelectTransmission"
import SelectCondition from "../../../../components/advert/SelectCondition"
import TextArea from "./Editor/TextArea"
import axios from "axios"
import { BASE_URL } from "../../../../constant/Path"
import { useRouter } from "next/navigation"


export default function EditAdvert() 
{
    const router = useRouter()
    const advertState = UseStore((state) => state)
    const years = Years()
    const { data,  isLoading, completed } = useCreateAd()

    const STATE_MESSAGE = 'Select State'
    // const CATEGORY_MESSAGE = 'Select Category'
    // const MANUFACTURER_MESSAGE = 'Select Manufacturer'
    // const RESET_MANUFACTURER_MESSAGE = 'Reset Manufacture'
    const MODEL_MESSAGE = 'Select Model'
    // const RESET_MODEL_MESSAGE = 'Reset Model'
    const TRIM_MESSAGE = 'Select Trim'
    // const TRIM_MODEL_MESSAGE = 'Reset Trim'
    const ENGINE_MESSAGE = 'Select Engine'
    // const ENGIEN_MODEL_MESSAGE = 'Reset Trim'
    const LOCATION_MESSAGE = 'Select Location'
    const CHAISIS_NO_MESSAGE = 'Select Chasis Number'
    const PRICE_MESSAGE = 'Select price'
    // const DESCRIPTION_MESSAGE = 'Enter Prdoduct Description'
    // const ERROR_MESSAGE = 'Ensure all compulsory fields are attended to'
    

    const [countryId, setCountryId] = useState<number>(advertState.getCountry())
    const [stateId, setTheStateId] = useState<number>(advertState.getStates())
    const [stateMessage, setStateMessage] = useState<string>("")
    const [theState, setTheState] = useState<any[]>(advertState.getStateModel())
    const [category, setCategory] = useState<number>(advertState.getCategory())    
    const [theManufacturer, setTheManufacturer] = useState<number>(advertState.getManufacturer())
    const [theModelId, setTheModelId] = useState<number>(advertState.getModel())
    const [theModel, setTheModel] = useState<any[]>(advertState.getTheMakerModels())
    const [modelMessage, setModelMessage] = useState<string>("")
    const [theModelOption, setTheModelOption] = useState<string>('invalid')
    const [theTrimId, setTheTrimId] = useState<number>(advertState.getTrim())    
    const [theEngine, setTheEngine] = useState<any[]>(advertState.getTrimEngine())
    const [theTrimOption, setTheTrimOption] = useState<string>('invalid')
    const [theTrim, setTheTrim] = useState<any[]>(advertState.getTheModelTrim())
    const [trimMessage, setTrimMessage] = useState<string>("")
    const [theEngineId, setTheEngineId] = useState<number>(-1)    
    const [theEngineOption, setTheEngineOption] = useState<string>('invalid')
    const [fuelId] = useState<string>("")
    const [year] = useState<string>("")
    const [colourId] = useState<string>("")
    const [transmissionId] = useState<string>("")
    const [engineId, setEngineMessage] = useState<string>("")
    const [conditionId] = useState<string>("")
    const [mileage] = useState<string>("")
    const [locationMessage, setLocationMessage] = useState<string>("")
    const [chasisNoMessage, setChasisNoMessage] = useState<string>("")
    const [priceMessage, setPriceMessage] = useState<string>("")    
    const [description] = useState<string>("")  

    const [loading, setLoading] = useState<boolean>(false)

  
    const [value, setValue] = useState(advertState.getDescription())

    const [errorMessage, setErrorMessage] = useState<string>("")
    const [errMsgStyle, setErrMsgStyle] = useState<string>('')
    
    useEffect(() => 
    {
    //    if(advertState.getUser().token)
    //    {
    //       navigate('/dashboard')
    //    }
          setErrMsgStyle('bg-red-600 p-3 text-white font-bold rounded-md') 
        console.log({ stateId, stateMessage, category, theManufacturer, theModelId, theTrimId, theTrimOption, theEngineId, fuelId, year, colourId, transmissionId, engineId, conditionId, mileage })
    }, []) 

    const UpdateAdvert = async () => 
    {
        setLoading(true)
        const data = {
                country: Number(advertState.getCountry()), state: Number(advertState.getStates()), category: Number(advertState.getCategory()),
                others: advertState.getOthers(), manufacturer: Number(advertState.getManufacturer()), model: Number(advertState.getModel()), trim: Number(advertState.getTrim()), engine: Number(advertState.getEngine()),
                theManufacturer:  advertState.getTheManufacturerName(), theModel: advertState.getTheModelName(), theTrim: advertState.getTheTrimName(), theEngine: advertState.getTheEngineName(),
                fuel: Number(advertState.getFuel()), year: advertState.getYear(), colour: Number(advertState.getColour()), transmission: Number(advertState.getTransmission()), 
                condition: Number(advertState.getCondition()), milage: advertState.getMileage(), location: advertState.getLocation(), imagePosition: Number(advertState.getImagePosition()),
                chasisno: advertState.getChasisNo(), price: advertState.getPrice(), description: advertState.getDescription(), mileage: advertState.getMileage(), address: advertState.getLocation(),
        }
        let endPoint = 'advert/update'
        let ApiUrl = `${BASE_URL}${endPoint}`
        await axios.put(`${ApiUrl}`, data, 
            { 
                headers: {
                            'Content-Type': 'multipart/form-data',
                            'Authorization': advertState.getUser().token ? `Bearer ${advertState.getUser().token}` : "",
                }
        }).then((response) => 
                {
                    if(response.status === 200)
                    {
                        clearFields()
                        clearFields()
                        router.push('/user/adverts')
                    } else {
                        setLoading(false)
                        setErrorMessage("Update failed")
                        setTimeout(() => 
                        {
                            setErrorMessage("")
                        }, 5000)
                    }
            }).catch(() => {           
                return false
        })
    }

    const clearFields = () => 
    {    
        advertState.productId(-1)
        advertState.setOnEdit("no")
        advertState.setCountry(-1)
        advertState.setCountryName("")
        advertState.setStates(-1)
        advertState.setStateName("")
        advertState.setCategory(-1)
        advertState.setCategoryName("")
        advertState.setManufacturer(-1)
        advertState.setManufacturerName("")
        advertState.setModel(-1)
        advertState.setModelName("")
        advertState.setTrim(-1)
        advertState.setTrimName("")
        advertState.setEngine(-1)
        advertState.setEngineName("")
        advertState.setColour(-1)
        advertState.setColourName("")
        advertState.setYear("x")
        advertState.setYearName("")
        advertState.setTransmission(-1)
        advertState.setTransmissionName("")
        advertState.setCondition(-1)
        advertState.setConditionName("")
        advertState.setFuel(-1)
        advertState.setFuelName("")
        advertState.setMileage("")
        advertState.setLocation("")
        advertState.setChasisNo("")
        advertState.setDescription("")
        advertState.setPrice("")
        advertState.setOthers("no")
        advertState.setTheManufacturerName("")
        advertState.setTheModelName("")
        advertState.setTheTrimName("")
        advertState.setTheEngineName("")
        advertState.setTheMakerModels([])
        advertState.setTheModelTrim([])
        advertState.setTrimEngine([])
        advertState.setStateModel([])
        advertState.setImagePosition(-1)
        advertState.setSaveOption("")
    }


    return (
        <>
            {
                ((isLoading === false) && ((completed === "no") || (completed === ""))) &&  <div 
                                className="flex md:d-flex xl:flex-row w-full h-[500px] justify-center items-center"
                    >
                        { isLoading && <PuffLoader className='w-12 h-12' color="white" /> }
                    </div>
            }
            {
                ((isLoading === true) && ((completed === "no") || (completed === ""))) &&  <div 
                                className="flex md:d-flex xl:flex-row w-full h-[500px] justify-center items-center"
                            >
                                { isLoading && <PuffLoader className='w-12 h-12' color="white" /> }
                            </div>
            }
            {   ((isLoading === false) && (completed === "yes")) && 
                <div 
                    className='md:col-span-9 col-span-12 bg-green-400 d-flex bg-green-50 border-shadow drop-shadow-lg md:block h-[fit] px-5 md:px-10 py-5 mt-3 rounded-2xl -mb-24 md:mb-0'
                > 
                        <h1 
                            className='font-bold uppercase mb-5'
                        >
                            Update {'Year'}
                        </h1>
                        { (errorMessage) && <Message msg={errorMessage} status={errMsgStyle} /> }

                        <div 
                            className="w-full d-flex md:flex gap-0 md:gap-10 mb-3"
                        >
                            <div 
                                className="w-2/2 md:w-1/2 mb-5 md:mb-0"
                            >
                                <label className="font-semibold text-xs">Country</label>
                                <SelectCountry countries={data?.['country']} states={data?.['state']} selectedCountry={advertState.getCountryName()} edit={false}  placeholder={"- Select Country -"} onClick={
                                    (selectedX, cId) => 
                                    {
                                        setTheState(selectedX)
                                        setCountryId(cId)
                                    }
                                } />
                            </div>
                            <div 
                                className="w-2/2 md:w-1/2 mb-5 md:mb-0"
                            >
                                <label className="font-semibold text-xs">State</label>
                                <SelectState countryId={countryId} stateOption={''} selectedState={advertState.getStateName()} incomingData={theState} edit={false}  placeholder={"- Select State -"} onClick={
                                    (cId) => 
                                    {
                                        if(cId === -1)
                                        {                                            
                                            setTheStateId(cId)
                                            setStateMessage(STATE_MESSAGE)
                                        } else {
                                            setStateMessage("")                                            
                                        }
                                    }
                                } />
                            </div>
                        </div>

                        <div 
                            className="w-full d-flex md:flex gap-0 md:gap-10 mb-3"
                        >
                            <div 
                                className="w-2/2 md:w-1/2 mb-5 md:mb-0"
                            >
                                <label className="font-semibold text-xs">Category</label>
                                <SelectCategory incomingData={data?.['category']} selectedCategory={advertState.getCategoryName()}  placeholder={"Select Category"} edit={false} onClick={
                                                    (cId) => 
                                                    {
                                                        setCategory(cId)
                                                    }
                                                } 
                                />
                            </div>
                            <div 
                                className="w-2/2 md:w-1/2 mb-5 md:mb-0"
                            >
                                <label className="font-semibold text-xs">Manufacturer</label>
                                <SelectManufacturer manufacturers={data?.['manufacturer']} models={data?.['model']} selectedManufacturer={advertState.getManufacturerName()} edit={false} placeholder={"- Select Manufacturer -"} onClick={
                                    (selectedX, cId) => 
                                    {
                                        setTheModel(selectedX)
                                        setTheManufacturer(cId)
                                        setTheModelOption('reset-model')
                                    }
                                    } 
                                />
                            </div>
                        </div>
                        
                        <div 
                            className="w-full d-flex md:flex gap-0 md:gap-10 mb-3"
                        >
                            <div 
                                className="w-2/2 md:w-1/2 mb-5 md:mb-0"
                            >
                                <label className="font-semibold text-xs">Model</label>
                                <SelectModel manufacturerId={advertState.getManufacturer()} modelOption={theModelOption} models={theModel} selectedModel={advertState.getModelName()} trims={data?.['trim']} edit={false} placeholder={"- Select Model -"} 
                                             onClick={
                                                (selectedX, cId) => 
                                                {
                                                    if(cId === -1)
                                                    {
                                                        setTheTrimId(-1)
                                                        setTheEngineId(-1)
                                                        setTheTrimOption('')
                                                    } else {
                                                        setTheTrim(selectedX)
                                                        setTheModelId(cId)
                                                        setTheTrimOption('reset-trim')
                                                        setModelMessage("")
                                                    }
                                                }
                                            }
                                        />
                                    { modelMessage && <Message msg={MODEL_MESSAGE} status={errMsgStyle} /> }
                            </div>
                            <div 
                                className="w-2/2 md:w-1/2 mb-5 md:mb-0"
                            >
                                <label className="font-semibold text-xs">Trim</label>
                                <SelectTrim manufacturerId={advertState.getManufacturer()} modelId={advertState.getModel()} trimOption={''} trims={theTrim} edit={false} selectedTrim={advertState.getTrimName()} engine={data?.['engine']} placeholder={"Select Trim"} 
                                                    onClick={
                                                        (selectedX, cId) => 
                                                        {
                                                            if(cId === -1)
                                                            {
                                                                setTheEngineId(-1)
                                                                setTheEngineOption('')
                                                                setTrimMessage(TRIM_MESSAGE)
                                                                // setEngineMessage(ENGINE_MESSAGE)
                                                            } else {                                                                
                                                                setTheEngine(selectedX)
                                                                setTheEngineId(cId)
                                                                setTheTrimId(cId)
                                                                setTheEngineOption('reset-engine')
                                                                setTrimMessage("")
                                                            }
                                                        }
                                                    }
                                        />
                                    { trimMessage && <Message msg={TRIM_MESSAGE} status={errMsgStyle} /> }
                                    </div>
                                </div>

                                <div 
                                    className="w-full d-flex md:flex gap-0 md:gap-10 mb-3"
                                >
                                    <div 
                                        className="w-full mb-5 md:mb-0"
                                    >
                                        <label className="font-semibold text-xs">Engine</label>
                                        <SelectEngine manufacturerId={advertState.getManufacturer()} modelId={advertState.getModel()} trimId={advertState.getTrim()} engineOption={theEngineOption} selectedEngine={advertState.getEngineName()} engine={theEngine} placeholder={"Select Engine Type"} 
                                                    onClick={
                                                        (cId) => 
                                                        {
                                                            if(cId === -1)
                                                            {
                                                                setEngineMessage(ENGINE_MESSAGE)
                                                            } else {
                                                                setEngineMessage("")
                                                            }
                                                        }
                                                    }
                                        />
                                    </div>
                                </div>

                        <div 
                            className="w-full d-flex md:flex gap-0 md:gap-10 mb-3"
                        >
                            <div 
                                className="w-2/2 md:w-1/2 mb-5 md:mb-0"
                            >
                                <label className="font-semibold text-xs">Fuel</label>
                                <SelectFuel incomingData={data?.['fuel']} 
                                            placeholder={"Select Fuel"} 
                                            selectedFuel={advertState.getFuelName()} 
                                            onClick={
                                                () => {

                                                }
                                            } 
                                            edit={false}
                                />
                            </div>
                            <div 
                                className="w-2/2 md:w-1/2 mb-5 md:mb-0"
                            >
                                <label className="font-semibold text-xs">Year</label>
                                <SelectYear 
                                            incomingData={years} 
                                            placeholder={"Select Year"} 
                                            selectedYear={advertState.getYearName()} 
                                            onClick={(yr) => 
                                            {

                                            }}
                                            edit={false}
                                />
                            </div>
                        </div>

                        <div 
                            className="w-full d-flex md:flex gap-0 md:gap-10 mb-3"
                        >
                            <div 
                                className="w-2/2 md:w-1/2 mb-5 md:mb-0"
                            >
                                <label className="font-semibold text-xs">Colour</label>
                                <SelectColour 
                                                incomingData={data?.['colour']} 
                                                selectedColour={advertState.getColourName()}  
                                                placeholder={"Select Colour"}
                                                onClick={(clr) => 
                                                {
                                                }}
                                                edit={false}
                                />
                            </div>
                            <div 
                                className="w-2/2 md:w-1/2 mb-5 md:mb-0"
                            >
                                <label className="font-semibold text-xs">Transmission</label>
                                <SelectTransmission 
                                                incomingData={data?.['transmission']} 
                                                selectedTransmission={advertState.getTransmissionName()}  
                                                placeholder={"Select Transmission"}
                                                onClick={(trans) => 
                                                {
                                                }}
                                                edit={false}
                                />
                            </div>
                        </div>
                        

                        <div 
                            className="w-full d-flex md:flex gap-0 md:gap-10 mb-3"
                        >
                            <div 
                                className="w-2/2 md:w-1/2 mb-5 md:mb-0"
                            >
                                <label className="font-semibold text-xs">Condition</label>
                                <SelectCondition 
                                        incomingData={data?.['condition']}  
                                        selectedCondition={advertState.getConditionName()} 
                                        placeholder={"Select Condition"} 
                                        onClick={(cndt) => 
                                        {
                                        }}
                                        edit={false}
                                />
                            </div>
                            <div 
                                className="w-2/2 md:w-1/2 mb-5 md:mb-0"
                            >
                                <div 
                                    className="mb-4 md:w-full"
                                >
                                    <label className="font-semibold text-xs">Mileage</label>
                                    <input 
                                        defaultValue={advertState.getMileage()}
                                        className="w-full border border border-3 shadow-md rounded-md py-2 px-3 bg-opacity-75 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out" 
                                        type="text" name="milage" id="milage" placeholder="Enter Milage" 
                                        onChange={(e: any) => 
                                        {
                                            let selected: string = e.target.value
                                            advertState.setMileage(selected)
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        

                        <div 
                            className="w-full d-flex md:flex gap-0 md:gap-10 mb-3"
                        >
                            <div 
                                className="mb-4 md:w-full"
                            >
                                <label className="font-semibold text-xs">City/Location</label>
                                <input 
                                    defaultValue={advertState.getLocation()}
                                    className="w-full border border border-3 shadow-md rounded-md py-2 px-3 bg-opacity-75 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out" 
                                    type="text" name="location" id="location" placeholder="Enter City/Location" 
                                    onChange={(e: any) => 
                                    {
                                        let selected: string = e.target.value
                                        advertState.setLocation(selected)
                                    }}
                                    onBlur={(e: any) => 
                                    {
                                        let selected: string = e.target.value
                                        if(selected === "" || selected === undefined || selected === null)
                                        {
                                            setLocationMessage(LOCATION_MESSAGE)
                                        }
                                    }}
                                />
                                { locationMessage && <Message msg={LOCATION_MESSAGE} status={errMsgStyle} /> }
                            </div>
                        </div>
                        

                        <div 
                            className="w-full d-flex md:flex gap-0 md:gap-10 mb-3"
                        >
                            <div 
                                className="w-2/2 md:w-1/2 mb-5 md:mb-0"
                            >
                                <div 
                                    className="mb-4 md:w-full"
                                >
                                    <label className="font-semibold text-xs">Chasis Number</label>
                                    <input 
                                        defaultValue={advertState.getChasisNo()}
                                        className="w-full border border border-3 shadow-md rounded-md py-2 px-3 bg-opacity-75 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out" 
                                        type="text" name="location" id="location" placeholder="Enter Chasis_no" 
                                        onChange={(e: any) => 
                                        {
                                            let selected: string = e.target.value
                                            advertState.setChasisNo(selected)
                                        }}
                                        onBlur={(e: any) => 
                                        {
                                            let selected: string = e.target.value
                                            if(selected === "" || selected === undefined || selected === null)
                                            {
                                                setChasisNoMessage(CHAISIS_NO_MESSAGE)
                                            }
                                        }}
                                    />
                                { chasisNoMessage && <Message msg={CHAISIS_NO_MESSAGE} status={errMsgStyle} /> }
                                </div>
                            </div>
                            <div 
                                className="w-2/2 md:w-1/2 mb-5 md:mb-0"
                            >
                                <div 
                                    className="mb-4 md:w-full"
                                >
                                    <label className="font-semibold text-xs">Price</label>
                                    <input 
                                        defaultValue={advertState.getPrice()}
                                        className="w-full border border border-3 shadow-md rounded-md py-2 px-3 bg-opacity-75 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out" 
                                        type="text" name="location" id="location" placeholder="Enter Price" 
                                        onChange={(e: any) => 
                                        {
                                            let selected: string = e.target.value
                                            advertState.setPrice(selected)
                                        }}
                                        onBlur={(e: any) => 
                                        {
                                            let selected: string = e.target.value
                                            if(selected === "" || selected === undefined || selected === null)
                                            {
                                                setPriceMessage(PRICE_MESSAGE)
                                            }
                                        }}
                                    />
                                { priceMessage && <Message msg={PRICE_MESSAGE} status={errMsgStyle} /> }
                                </div>
                            </div>
                        </div>                        

                        <div 
                            className="w-full flex flex-wrap mt-5 md:mb-10 mb-20 py-2"
                        >
                            <span className="w-full font-bold text-sm mb-3">Description</span>
                            <TextArea />
                        </div>
                        <div className="text-red-500 font-bold text-sm">{ (value === "") ?  description : "" }</div>


                        { (errorMessage) && <Message msg={errorMessage} status={errMsgStyle} /> }              

                        <div 
                            className="w-full d-flex md:flex mb-3 mt-14"
                        >
                            <div 
                                className="w-2/2 mb-5 md:mb-0"
                            >
                            <div className="dropdown inline-block relative">
                                <button 
                                        className="bg-blue-600 text-white font-semibold py-3 px-5 rounded inline-flex items-center"
                                        onClick={() => {
                                            UpdateAdvert
                                        }}
                                >
                                    { loading ? <BeatLoader size={10} color="white" className="py-2" /> : "Update"}
                                </button>
                            </div>
                            </div>
                        </div>

                </div>
            }
        </>
    )
}
