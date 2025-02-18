import React, { useEffect, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import { UseStore } from "../../state/store";


type CategoryProps = {
    placeholder: string,
    incomingData: any
    selectedFuel: string
    edit: boolean
    onClick: (fuelId: number) => void
}


const SelectFuel = ({ onClick, placeholder, selectedFuel, incomingData, edit }: CategoryProps) => 
{
  const advertState = UseStore((state) => state)

  const [data, setData] = useState<any[]>([])
  const [inputValue, setInputValue] = useState<string>("")
  const [selected, setSelected] = useState<string>("")
  const [open, setOpen] = useState(false)
  const [fuelId, setFuelId] = useState<number>(Number(advertState.getFuel()))

  useEffect(() => 
  {
     setSelected(selectedFuel)
     setData(incomingData)
  }, [])
  
  useEffect(() => 
  {
      onClick(Number(advertState.getFuel()))
  }, [fuelId])

  

  return (
        <div 
                className="border border-3 shadow-md relative w-full md:mb-0 mb-3"
                // onMouseLeave={() => {
                //     setOpen(false)
                // }}
        >
            <div
                onClick={() => setOpen(!open)}
                className={`bg-white w-full h-[50px] pt-2 md:pb-2 h-[40px] pb-3 px-3 flex items-center justify-between rounded ${
                !selected && "text-gray-700"
                }`}
            >
                {selected
                ? selected?.length > 25
                    ? selected?.substring(0, 25) + "..."
                    : selected
                : placeholder}
                <BiChevronDown size={20} className={`${open && "rotate-180"}`} />
            </div>
            <ul
                className={`bg-gray-100 overflow-y-auto -mt-2 absolute w-full ${
                open ? "max-h-80 z-40" : "max-h-0 z-40"
                } `}
                onMouseLeave={() => {
                    setOpen(false)
                }}
            >
                <div className="flex items-center px-2 sticky top-0 bg-white border border-3 shadow-md border-2 border-blue-100"
                >
                    <AiOutlineSearch size={18} className="text-gray-700" />
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value.toLowerCase())}
                        placeholder="Search Fuel"
                        className="placeholder:text-gray-700 p-2 outline-none w-full"
                    />
                </div> 
                {
                    edit &&                
                    <li
                        className={`p-2 text-md hover:bg-sky-600 border-2 border-gray-200 hover:border-2 hover:border-green-200 hover:text-white cursor-pointer py-3`}
                        onClick={() => {                        
                            setSelected("")
                            setOpen(false);
                            setInputValue("")
                            advertState.setFuel(-1)
                            advertState.setFuelName("")
                            setFuelId(-1)
                        }}
                    >
                        - Select Fuel -
                    </li>
                }
                {
                    data?.map((x: any, index: number) => (
                        <li
                            key={index}
                            className={`p-2 text-md hover:bg-sky-600 border-2 border-gray-200 hover:border-2 hover:border-green-200 hover:text-white cursor-pointer py-3
                            ${
                            x?.name?.toLowerCase() === selected?.toLowerCase() &&
                            "bg-sky-600 text-white"
                            }
                            ${
                            x?.name?.toLowerCase().startsWith(inputValue)
                                ? "block"
                                : "hidden"
                            }`}
                            onClick={() => {
                                setSelected(x?.name)
                                setOpen(false)
                                setInputValue("")
                                advertState.setFuel(x?.tb_id)
                                advertState.setFuelName(x?.name) 
                                setFuelId(Number(x?.tb_id))
                                // onClick(Number(advertState.getFuel()))
                            }}
                        >
                            {x?.name}
                        </li>
                    ))
                }
            </ul>
        </div>
  );
};

export default SelectFuel;