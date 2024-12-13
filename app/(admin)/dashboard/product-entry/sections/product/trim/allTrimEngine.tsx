import { useMemo } from "react"
import student from '../../../../../../../components/shared/data/student.json'
import { Modal } from "../../../../../../../components/modal/Modal";
import { Table } from "../../../../../../../components/shared/Table";
import { ColumnDef } from "@tanstack/react-table";
// import { USAGE_PATH } from "../../../../../constant/Path"


type AllTrimEngineProps = 
{
    onClick: () => void 
    openTrimEngine: boolean 
    message: string
    userType: string
    token: string
}    

export const AllTrimEngine = ({onClick, openTrimEngine, message, userType, token}: AllTrimEngineProps)  =>
{
    //  const [loading] = useState<boolean>(false)
    console.log(message, userType, token)

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
          header: 'States',
          cell: () => (<a href="#"></a>),
          accessorKey: 'Name',
      }
    ],[])
     
     return (
                <Modal 
                   onClick={onClick} isOpen={openTrimEngine} wrapperWidth={850} margin={'100px auto 0px auto'}
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
                          All Engine
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
                      /> 
                    </div>
                </div>
                </Modal>  
        );
}