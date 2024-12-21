import { useMemo, useState } from "react"
import student from '../../../../../../../components/shared/data/student.json'
import { Modal } from "../../../../../../../components/modal/Modal";
import { Table } from "../../../../../../../components/shared/Table";
import { ColumnDef } from "@tanstack/react-table";


type AllManufacturerModelProps = 
{
    onClick: () => void 
    openManufacturerModel: boolean 
    message: string
    userType: string
    token: string
}    

export const AllManufacturerModel = ({onClick, openManufacturerModel, message, userType, token}: AllManufacturerModelProps)  =>
{
    //  const [loading] = useState<boolean>(false)

     const Employee = () => 
     {
        return student.students;
     }
  
     type AllStudent = 
     {
        id: string
        firstName: string
        surName: string
        middleName: string
        studentId: string
        phone: string
        email: string
        enrolled: string
     }
    
     const employees = useMemo<ColumnDef<AllStudent>[]>(
     () => [
     {
        header: 'Name',
        cell: () => (<a href="#"></a>),
        accessorKey: 'firstName',
     }
     ],[])
     
     return (
                <Modal 
                   onClick={onClick} isOpen={openManufacturerModel} wrapperWidth={850} margin={'100px auto 0px auto'}
                >
                   <div 
                       className="w-full"
                   > 
                      <div 
                        className='font-bold text-2xl text-green-600 ml-5 mb-7 flex gap-10'
                      >
                        <span 
                           className="text-lg text-black"
                        >
                          Models
                        </span>
                   </div> 

                   <div 
                       className=''
                   >                          
                      <Table data={Employee()} 
                             columns={employees} 
                             showNavigation={false} 
                             searchPlaceHolder='search for transactions ...' 
                             path='transactions' 
                             from='transactions' 
                             headerTextColor="white"
                             onClick={() => {
                                 console.log('')
                             }}
                             searchTerm={() => {
                                 console.log('')
                             }}
                      /> 
                    </div>
                </div>
                </Modal>  
        );
}
