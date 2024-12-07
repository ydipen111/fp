import React from 'react'
import { useSelector } from 'react-redux'
// import { UserOrder } from '../order/UserORder';
import ProfileCard from './ProfileCard';
import { useUserProfileQuery } from '../auth/authApi';
import { AdminOrder } from '../order/AdminOrder';
import { UserOrder } from '../order/UserOrder';

export const UserProfie = () => {
  const { user } = useSelector((state) => state.userSlice);
  const { data, isLoading, isError } = useUserProfileQuery(user.token);
  console.log(data);



  return (
    <div className='grid grid-cols-3 p-10 '>
      <div className='bg-black-900'>

        {data && <ProfileCard userData={data} />}
      </div>
      <div className='col-span-2'>

        {user.isAdmin ? <AdminOrder userProfile={user} /> : <UserOrder userProfile={user} />}

      </div>
    </div>
  )
}
