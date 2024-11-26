"use client"

import { UserWishList } from "../app/api/home/market/advert/Comments"

type WishProp = 
{
    user_id: number, 
    product_id: number 
}

type WishListProps = 
{
    productId: number
    data: WishProp[]
    onClick: (res: string) => void
    token: string
    type: string
}

export default function WishList({ productId, data, onClick, token, type }: WishListProps) 
{
  let result = data?.filter((product) => product?.product_id === productId)
  let isWishList = (result?.length > 0) ? true : false

  const AddToWishList = () => 
  {
      const AddToWishList = UserWishList(productId, token, type)
      AddToWishList.then((response) => 
      {
          onClick(response)
      }).then(() => {

      })
  }


  return (
        <>
            {
                ((data?.length === 0) || (data?.length === undefined) || (data?.length === null)) && <div 
                      className={`bg-blue-300 text-pink-500 z-5 hover:text-pink-600 p-2 rounded-full absolute top-5 right-5 hover:bg-green-600`}
                      onClick={() => {
                        AddToWishList()
                      }}
                      style={{ zIndex: 999 }}
                  >
                    <svg className="w-7 h-7" viewBox="0 0 24 24">
                        <path fill="white" d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" />
                    </svg>
                  </div>
            }
            {
               data && (data?.length > 0) && <div 
                      className={`${(isWishList ? 'bg-green-600 border-2 border-green-100' : ' bg-blue-300 border-2 border-blue-100')} text-pink-500 z-5 hover:text-pink-600 p-2 rounded-full absolute top-5 right-5 hover:bg-green-800`}
                      onClick={() => {
                        AddToWishList()
                      }}
                  >
                    <svg className="w-7 h-7" viewBox="0 0 24 24">
                        <path fill="white" d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" />
                    </svg>
                  </div>
            }
        </>
    )
}