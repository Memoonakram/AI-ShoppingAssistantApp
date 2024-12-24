import React, { useEffect, useState } from 'react'
import { avatars, avatars2 } from '../../../static/images/avater/avatar'
import { InputElement, SelectElement, ButtonElement } from '../elements/FormElements'
import { countries } from './sorted_countries'
import { use } from 'react'
import { AvatarModal } from '../elements/AvatarModal'

export const ProfileView = ({ user, onSave, isadmin }) => {

    const [editMode, setEditMode] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [profile, setProfile] = useState({
        "id": 0,
        "gender": '',
        "country": '',
        "age": 0,
        "plan_type": "Free",
        "dob": '',
        "last_modified": '',
        "profile_pic": "",
        "user": 0,
        "username": "",
        "first_name": "",
        "last_name": "",
        "email": "",
    });
    const [profileAvatar, setProfileAvatar] = useState(avatars['B']);

    const handleeditMode = () => {
        setEditMode(!editMode);
        setIsModalOpen(false);
    }

    const handleModal = () => {
        setIsModalOpen(!isModalOpen);
    }

    const handleSaveAvatar = (newAvatar) => {
        setProfileAvatar(newAvatar.src);
        setProfile(prevProfile => ({
            ...prevProfile,
            profile_pic: newAvatar.alt
        }));
    };

    useEffect(() => {
        if (user) {
            setProfile(user);
            setProfileAvatar(avatars2[user.profile_pic]);
        }
    }, [user]);

    const handleCancel = (e) => {
        e.preventDefault();
        setEditMode(false);
        setProfile(user);
    }

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setProfile(prevProfile => ({
            ...prevProfile,
            [name]: value
        }));
    };

    const handleSave = (e) => {
        e.preventDefault();
        onSave(profile);
        setEditMode(false);
    }

    return (

        <div className="card shadow-sm">
            <div className="card-header">
                <div className="relative z-10 flex w-full shrink-0 items-center justify-between border-b border-slate-150 bg-white p-6 shadow-sm transition-[padding,width] duration-[.25s] dark:border-navy-700 dark:bg-navy-800 rounded-t-2xl">
                    <div className="flex items-center space-x-4 font-inter">
                        <div className="h-32 w-32 realtive avatar-container relative">
                            <img
                                className="rounded-full"
                                src={profileAvatar}
                                alt="avatar"
                                style={{ cursor: editMode ? "pointer" : "default" }}
                            />
                            <div
                                style={{ display: editMode ? "flex" : "none" }}
                                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 rounded-full transition-opacity duration-300 cursor-pointer overlay"
                                onClick={handleModal}
                            >
                                <i className="fa fa-edit text-white text-2xl"></i>
                            </div>

                            <AvatarModal
                                isOpen={isModalOpen}
                                onClose={handleModal}
                                onSave={handleSaveAvatar}
                                gender={profile.gender || 'O'}
                            />

                        </div>
                        <div>
                            <h1 className="font-medium text-slate-700 line-clamp-1 dark:text-navy-100 text-4xl relative">
                                {profile.first_name} {profile.last_name}
                                <span className={"badge text-xs align-super ml-2 " + (profile.plan_type === 'Premium' ? 'bg-secondary/10 text-secondary dark:bg-secondary-light/15 dark:text-secondary-light' : 'bg-info/10 text-info dark:bg-info/15')}>
                                    {profile.plan_type || 'Free'}
                                </span>
                            </h1>
                            <h1 className="mt-0.5 text-xl">{profile.username}</h1>
                        </div>
                    </div>
                    <div style={{ display: editMode ? 'none' : 'block' }} className="self-baseline">
                        <ButtonElement
                                onClick={handleeditMode}
                                label="Edit"
                                iconclassName="fa fa-edit text-white"
                                primary
                            />
                    </div>
                </div>
            </div>
            <div className="card-body">
                <form className="p-6">
                    <div className="grid grid-cols-3 gap-6">

                        <InputElement
                            label="Username"
                            placeholder="Enter Username"
                            name="username"
                            value={profile.username}
                            handleChange={handleFormChange}
                            iconclassName={"fas fa-user"}
                            disabled
                            required
                        />

                        <InputElement
                            label="First Name"
                            placeholder="Enter First Name"
                            name="first_name"
                            value={profile.first_name}
                            handleChange={handleFormChange}
                            iconclassName={"fas fa-user"}
                            disabled={!editMode}
                            required
                        />

                        <InputElement
                            label="Last Name"
                            placeholder="Enter Last Name"
                            name="last_name"
                            value={profile.last_name}
                            handleChange={handleFormChange}
                            iconclassName={"fas fa-user"}
                            disabled={!editMode}
                            required
                        />

                        <InputElement
                            label="Email"
                            placeholder="Enter Email"
                            name="email"
                            value={profile.email}
                            handleChange={handleFormChange}
                            iconclassName={"fas fa-envelope"}
                            disabled={!editMode}
                            required
                        />

                        <SelectElement
                            label="Gender"
                            name="gender"
                            options={[
                                { value: "M", label: "Male" },
                                { value: "F", label: "Female" },
                                { value: "O", label: "Other" }
                            ]}
                            value={profile.gender}
                            handleChange={handleFormChange}
                            iconclassName={"fas fa-venus-mars"}
                            disabled={!editMode}
                        />


                        <SelectElement
                            label="Country"
                            name="country"
                            options={countries}
                            handleChange={handleFormChange}
                            iconclassName={"fas fa-flag"}
                            disabled={!editMode}
                        />

                        <InputElement
                            label="Date of Birth"
                            placeholder="Enter Date of Birth"
                            name="dob"
                            value={profile.dob}
                            type='date'
                            handleChange={handleFormChange}
                            iconclassName={"fas fa-calendar"}
                            disabled={!editMode}
                        />

                        <InputElement
                            label="Age"
                            placeholder="Enter Age"
                            name="age"
                            value={profile.age}
                            handleChange={handleFormChange}
                            iconclassName={"fas fa-calendar"}
                            disabled
                        />

                        {
                            isadmin && 
                            <SelectElement
                             label='Plan Type'
                             placeholder='Select Plan Type'
                                name='plan_type'
                                options={[
                                    { value: 'Free', label: 'Free' },
                                    { value: 'Premium', label: 'Premium' }
                                ]}
                                value={profile.plan_type}
                                handleChange={handleFormChange}
                                iconclassName={"fas fa-calendar"}
                                disabled={!editMode}
                            />
                        }
                    </div>

                    <div className="flex justify-end space-x-2 mt-4">
                        <div style={{ display: editMode ? 'block' : 'none' }} className="flex justify-end space-x-2">

                            <ButtonElement
                                onClick={handleCancel}
                                label="Cancel"
                            />

                            <ButtonElement
                                onClick={handleSave}
                                label="Save"
                                primary
                            />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
