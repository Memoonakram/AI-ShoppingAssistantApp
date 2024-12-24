import React from 'react'
import { avatars2 } from '../../../static/images/avater/avatar';

export const UserTable = ({ users,  showModal, setShowModal, setModalData  }) => {
  return (
    <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead>
                    <tr>
                        <th className="whitespace-nowrap rounded-tl-lg bg-slate-200 px-4 py-3 font-semibold uppercase text-slate-800 dark:bg-navy-800 dark:text-navy-100 lg:px-5">
                            #
                        </th>
                        <th className="whitespace-nowrap bg-slate-200 px-4 py-3 font-semibold uppercase text-slate-800 dark:bg-navy-800 dark:text-navy-100 lg:px-5">
                            Avatar
                        </th>
                        <th className="whitespace-nowrap bg-slate-200 px-4 py-3 font-semibold uppercase text-slate-800 dark:bg-navy-800 dark:text-navy-100 lg:px-5">
                            Name
                        </th>
                        <th className="whitespace-nowrap bg-slate-200 px-4 py-3 font-semibold uppercase text-slate-800 dark:bg-navy-800 dark:text-navy-100 lg:px-5">
                            Usename
                        </th>
                        <th className="whitespace-nowrap bg-slate-200 px-4 py-3 font-semibold uppercase text-slate-800 dark:bg-navy-800 dark:text-navy-100 lg:px-5">
                            Country
                        </th>
                        {/* <th className="whitespace-nowrap bg-slate-200 px-4 py-3 font-semibold uppercase text-slate-800 dark:bg-navy-800 dark:text-navy-100 lg:px-5">
                            Preferred Brands
                        </th> */}
                        <th className="whitespace-nowrap bg-slate-200 px-4 py-3 font-semibold uppercase text-slate-800 dark:bg-navy-800 dark:text-navy-100 lg:px-5">
                            Plan Type
                        </th>
                        <th className="whitespace-nowrap bg-slate-200 px-4 py-3 font-semibold uppercase text-slate-800 dark:bg-navy-800 dark:text-navy-100 lg:px-5">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.length === 0 ? <tr><td colSpan="8"><div className="text-center flex flex-col justify-center text-4xl font-semibold h-50">
                        No Users Found
                    </div></td></tr> :
                    users.map(user => <UserRow user={user} key={user.id} index={users.indexOf(user)} showModal={showModal} setShowModal={setShowModal} setModalData={setModalData}/>)
                    }
                </tbody>
            </table>
        </div>
  )
}

function UserRow ({user, index, setShowModal, setModalData }) {
    // const {deleteUser} = useContext(AdminContext);

    // const handleDelete = async (id) => {
    //     Swal.fire({
    //         title: 'Are you sure?',
    //         text: "You won't be able to revert this!",
    //         icon: 'warning',
    //         showCancelButton: true,
    //         confirmButtonColor: '#3085d6',
    //         cancelButtonColor: '#d33',
    //         confirmButtonText: 'Yes, delete it!',
    //         customClass: {
    //             popup: "bg-lightmode dark:bg-darkmode dark:text-navy-100", // Custom class for the first alert
    //         },
    //     }).then(async (result) => {
    //         if (result.isConfirmed) {
    //             await deleteUser(id);
    //             Swal.fire({
    //                 title: 'Deleted!',
    //                 text: 'User has been deleted.',
    //                 icon: 'success',
    //                 customClass: {
    //                     popup: "bg-lightmode dark:bg-darkmode dark:text-navy-100", // Custom class for the second alert
    //                 }
    //             });
    //         }
    //     });
    // };
    
    return (
        <>
        <tr className="border-y border-transparent border-b-slate-200 dark:border-b-navy-500">
            <td className="whitespace-nowrap px-4 py-3 sm:px-5">
                {/* user index */}
                {index+1}
            </td>
            <td className="whitespace-nowrap px-4 py-3 sm:px-5">
                <div className="avatar flex">
                    <img className="rounded-full"
                     src={user.profile?.profile_pic? avatars2[user.profile.profile_pic] : avatars2['B'] }
                      alt="avatar" />
                </div>
            </td>
            <td className="whitespace-nowrap px-4 py-3 font-medium text-slate-700 dark:text-navy-100 sm:px-5">
                {user.first_name} {user.last_name}
            </td>
            <td className="whitespace-nowrap px-4 py-3 font-medium text-slate-700 dark:text-navy-100 sm:px-5">
                {user.username}
            </td>
            <td className="whitespace-nowrap px-4 py-3 sm:px-5">
                {/* <div className="flex space-x-2 "> */}
                {/* <span>{user.profile.country}</span> */}
                { user.profile?.country &&
                <img src={`https://flagcdn.com/${user.profile.country.toLowerCase()}.svg`} alt={user.profile.country} className='h-5 mr-2' />
}
                {/* </div> */}
            </td>
            {/* <td className="whitespace-nowrap px-4 py-3 sm:px-5">
                <div className="flex space-x-2">
                    <div className="badge rounded-full border border-info text-info">
                        Tailwind
                    </div>
                    <div className="badge rounded-full border border-success text-success">
                        Alpine
                    </div>
                </div>
            </td> */}
            <td className="whitespace-nowrap px-4 py-3 sm:px-5">
                <div
                className={"badge rounded-full" + (user.profile?.plan_type === 'Premium' ? 'bg-secondary/10 text-secondary dark:bg-secondary-light/15 dark:text-secondary-light' : 'bg-info/10 text-info dark:bg-info/15')}
                // className="bg-secondary/10 text-secondary dark:bg-secondary-light/15 dark:text-secondary-light"
                >
                    {user.profile?.plan_type}
                </div>
            </td>
            <td className="whitespace-nowrap px-4 py-3 sm:px-5">
                <div className="flex space-x-1">
                    <button onClick={() => {
                        setShowModal(true);
                        setModalData(user);
                        }}
                     className="btn h-8 w-8 p-0 text-info hover:bg-info/20 focus:bg-info/20 active:bg-info/25">
                        <i className="fa fa-edit"></i>
                    </button>
                    <button 
                    // onClick={() => handleDelete(user.id)}
                     className="btn h-8 w-8 p-0 text-error hover:bg-error/20 focus:bg-error/20 active:bg-error/25">
                        <i className="fa fa-trash-alt"></i>
                    </button>
                </div>
            </td>
        </tr>
        </>
    )
}
