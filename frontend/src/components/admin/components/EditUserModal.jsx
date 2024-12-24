import React, { useContext, useState } from 'react'
import { Modal } from '../../components/elements/Modal'
import { ProfileView } from '../../components/common/ProfileView'
import { MeasurementView } from '../../components/common/MeasurementView'
import { AdminContext } from '../AdminContext'
import { ButtonElement } from '../../components/elements/FormElements'

export const EditUserModal = ({isOpen, onClose, modalData }) => {

    const {updateProfile, updateMeasurement} = useContext(AdminContext);
    const [view, setView] = useState('profile');

    const handleUpdateProfile = async (data) => {
        await updateProfile(data);
    }

    const handleUpdateMeasurement = async (data) => {
        await updateMeasurement(data);
    }


  return (
    <>
    <Modal isOpen={isOpen}
      title={
        <>
        <div className='flex justify-between items-center'>
        <div className='flex space-x-2'>
        <ButtonElement
          label='Profile'
          customClass={'text-sm'}
          {...view === 'profile' && {primary: true}}
         onClick={()=>setView('profile')}/>
        <ButtonElement 
          label='Measurement'
          customClass={'text-sm'}
          {...view === 'measurement' && {primary: true}}
         onClick={()=>setView('measurement')}/>
        </div>
        <ButtonElement
          onClick={onClose}
          iconclassName={'fas fa-times'}
          customClass={'w-8 h-8 '}
          />
        </div>
        </>
      }
    >
      {view === 'profile' &&
          <ProfileView user={modalData?.profile}
           isadmin={true} onSave={handleUpdateProfile} />
      }
      {view === 'measurement' &&
           <MeasurementView measurementData={modalData?.measurement}
            isadmin={true}
            profileData={modalData?.profile}
            onSave={handleUpdateMeasurement} />
      }
          </Modal>
    </>
  )
}
