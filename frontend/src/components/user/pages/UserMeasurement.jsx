import React, { useContext } from 'react'
import { MeasurementView } from '../../components/common/MeasurementView'
import { UserContext } from '../UserContext'



export const UserMeasurement = () => {
  const {measurement, profile, updateMeasurement} = useContext(UserContext);

  const handleSave = async (data) => {
    await updateMeasurement(data);
  }

  return (
    < div className="container-fluid mt-5" >
            <MeasurementView measurementData={measurement} onSave={handleSave} profileData={profile}/>
      </div>
  )
}


