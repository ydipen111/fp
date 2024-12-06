import React from 'react'
import { useSelector } from 'react-redux'
// import { UserOrder } from '../order/UserORder';
import ProfileCard from './ProfileCard';
import { useUserProfileQuery } from '../auth/authApi';

export const UserProfie = () => {
  const { user } = useSelector((state) => state.userSlice);
  const { data, isLoading, isError } = useUserProfileQuery(user.token);
  // console.log(data);



  return (
    <div className='grid grid-cols-3 p-10 '>
      <div className='bg-black-900'>

        {data && <ProfileCard userData={data} />}
      </div>
      <div className='col-span-2'>

        {/* {user.isAdmin ? <AdminOrder user={user} /> : <UserOrder user={user} />} */}

      </div>
    </div>
  )
}
