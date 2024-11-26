
"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { UseStore } from '../state/store'
import ProfilePicture from '../app/(user)/user/adverts/control/profile-picture'
import { useRouter } from 'next/navigation'
import { Logout } from './Logout'


type MemberDealerNavigation = 
{
   marketPlace: { url: string, name: string }[]   
}

export default function MemberDealerNavigation({ marketPlace }: MemberDealerNavigation) 
{
  const Session = UseStore((state) => state)
  const router = useRouter()
  const token = Session.getUserToken()
  const [openLoggedOut, setOpenLoggedOut] = useState<boolean>(false)
  
  return (
            <>
                <div 
                    className='w-3/12 d-flex border-shadow drop-shadow-lg md:block hidden rounded-2xl'
                >
                        <div 
                                className='d-flex justify-center items-center mx-auto h-[fit] px-10 pb-5 pt-2 mt-0 bg-green-50'
                        >
                            {/* <img src='' className='h-[200px] w-[200px] mx-auto rounded-full bg-blue-200 mb-3' /> */}
                            <ProfilePicture />
                            <div className='w-full flex justify-center mx-auto font-bold text-lg'>{Session.getFName()} {Session.getSName()}</div>
                            <div className='w-full flex justify-center mx-auto font-bold text-md uppercase'>{Session.getUType()}</div>
                        </div>
                        <div 
                                className='d-flex justify-center items-center mx-auto'
                        >
                            <ul 
                                className='w-full mt-2'
                            >
                                {                              
                                    marketPlace.map((user, index: number) => {
                                    return (
                                        <Link href={`${user?.url}`} key={index}
                                              onClick={() => {
                                                Session.setMarketPlaceLink(user?.name)
                                                router.push(`${user?.url}`)                                                
                                              }}
                                        >
                                            <li 
                                                key={index} 
                                                className={`px-5 py-3 ${(Session.getMarketPlaceLink() === user?.name) ? 'bg-green-800' : 'bg-green-600'} hover:bg-green-900 text-whiterounded-md mb-1 cursor-pointer rounded-lg text-center uppercase text-white font-bold hover:text-white`}
                                            >
                                                {user?.name}
                                            </li>
                                        </Link>
                                    )
                                    })
                                }   
                                {/* {                              
                                classRoom.map((user, index) => {
                                    return (
                                        <Link href={`${user?.url}`} key={index}
                                        >
                                            <li 
                                                    key={index} 
                                                    className='px-5 py-3 bg-blue-600 hover:bg-blue-800 text-whiterounded-md mb-1 cursor-pointer rounded-lg text-center uppercase text-white font-bold hover:text-white'
                                            >
                                                {user?.name}
                                            </li>
                                        </Link>
                                    )
                                })
                                } */}
                                <Link href={'profile'}
                                      onClick={() => {
                                          Session.setMarketPlaceLink(`/user/profile`)
                                          router.push(`user/profile`)
                                      }}
                                >
                                    <li 
                                        key={Math.random()} 
                                        className={`px-5 py-3 ${(Session.getMarketPlaceLink() === `/user/profile`) ? 'bg-green-800' : 'bg-green-600'} hover:bg-green-900 text-whiterounded-md mb-1 cursor-pointer rounded-lg text-center uppercase text-white font-bold hover:text-white`}
                                    >
                                        {`Profile`}
                                    </li>
                                </Link> 
                                { (Session.getUType() === `member`) &&
                                    <Link href={`become-a-dealer`}
                                      onClick={() => {
                                          Session.setMarketPlaceLink(`/user/become-a-dealer`)
                                          router.push(`user/become-a-dealer`)
                                      }}
                                    >
                                        <li 
                                            key={Math.random()} 
                                            className={`px-5 py-3 ${(Session.getMarketPlaceLink() === `/user/become-a-dealer`) ? 'bg-green-800' : 'bg-green-600'} hover:bg-green-900 text-whiterounded-md mb-1 cursor-pointer rounded-lg text-center uppercase text-white font-bold hover:text-white`}
                                        >
                                            {`Become a Dealer`}
                                        </li>
                                    </Link> 
                                }
                                <Link href={`change-password`}
                                      onClick={() => {
                                          Session.setMarketPlaceLink(`/user/change-password`)
                                          router.push(`user/change-password`)
                                      }}
                                >
                                    <li 
                                        key={Math.random()} 
                                        className={`px-5 py-3 ${(Session.getMarketPlaceLink() === `/user/change-password`) ? 'bg-green-800' : 'bg-green-600'} hover:bg-green-900 text-whiterounded-md mb-1 cursor-pointer rounded-lg text-center uppercase text-white font-bold hover:text-white`}
                                    >
                                        {`Change Password`}
                                    </li>
                                </Link>               
                                <li 
                                    key={Math.random()} 
                                    onClick={() => {
                                        setOpenLoggedOut(true)                             
                                    }}
                                    className='px-5 py-3 border-2 mt-2 border-red-300 hover:bg-red-700 text-whiterounded-md mb-5 cursor-pointer rounded-lg text-center uppercase text-red font-bold hover:text-white'
                                >
                                Logout
                                </li>
                            </ul>                    
                        </div>
                    </div>

                    {
                        openLoggedOut && <Logout onClick={
                                                    () => {

                                                    }
                                                } 
                                                deleteModal={openLoggedOut} 
                                                token={token} 
                                        />
                    }
        </>
  )
}