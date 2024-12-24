import React, { useContext, useEffect } from 'react'
import { UserContext } from '../UserContext'
import { ProfileView } from '../../components/common/ProfileView';


export const UserProfile = () => {
  const { profile, updateProfile } = useContext(UserContext);

  const handleSave = async (data) => {
    await updateProfile(data);
  }


  return (
    <>
      < div className="container-fluid px-4" >
        <div className="row">
          <div className="col-md-8 offset-md-2 col-lg-6 offset-lg-3 mt-5">
            <ProfileView user={profile} onSave={handleSave} />
          </div>
        </div>
      </div>

    </>
  )
}
