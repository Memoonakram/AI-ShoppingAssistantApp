import React from 'react'
import { avatars2 } from '../../../static/images/avater/avatar';

export const UserCards = ({ users,  showModal, setShowModal, setModalData }) => {
    return (
        <>
        {users.length === 0 &&
                <div className="text-center flex flex-col justify-center text-4xl font-semibold h-50">
                    No Users Found
                </div>
            }
        <div className="grid grid-cols-4 gap-4">
            {users.map(user => <UserCard user={user} key={user.id} showModal={showModal} setShowModal={setShowModal} setModalData={setModalData}/>)}
        </div>
        </>
    )
}

function UserCard ({ user, showModal, setShowModal, setModalData }) {
    // const {deleteUser} = useContext(AdminContext);
  
//     const handleDelete = async (id) => {
//       Swal.fire({
//           title: 'Are you sure?',
//           text: "You won't be able to revert this!",
//           icon: 'warning',
//           showCancelButton: true,
//           confirmButtonColor: '#3085d6',
//           cancelButtonColor: '#d33',
//           confirmButtonText: 'Yes, delete it!',
//           customClass: {
//               popup: "bg-lightmode dark:bg-darkmode dark:text-navy-100", // Custom class for the first alert
//           },
//       }).then(async (result) => {
//           if (result.isConfirmed) {
//               await deleteUser(id);
//               Swal.fire({
//                   title: 'Deleted!',
//                   text: 'User has been deleted.',
//                   icon: 'success',
//                   customClass: {
//                       popup: "bg-lightmode dark:bg-darkmode dark:text-navy-100", // Custom class for the second alert
//                   },
//                   // success button color 
//                   confirmButtonColor: '#3085d6',
//               });
//           }
//       });
//   };

    return (
      <>
      <div className="card shadow drop-shadow-sm">
        <div className="h-16 rounded-t-lg bg-primary dark:bg-accent bg-indigo-500 relative">
          <div className="flex flex-col justify-center h-full right-0 absolute mr-3">
            <button className="btn h-7 w-7 rounded-full bg-primary/10 p-0 text-primary hover:bg-primary/20 focus:bg-primary/20 active:bg-primary/25 dark:bg-accent-light/10 dark:text-accent-light dark:hover:bg-accent-light/20 dark:focus:bg-accent-light/20 dark:active:bg-accent-light/25">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g>
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22ZM8 13.25C7.58579 13.25 7.25 13.5858 7.25 14C7.25 14.4142 7.58579 14.75 8 14.75H13.5C13.9142 14.75 14.25 14.4142 14.25 14C14.25 13.5858 13.9142 13.25 13.5 13.25H8ZM7.25 10.5C7.25 10.0858 7.58579 9.75 8 9.75H16C16.4142 9.75 16.75 10.0858 16.75 10.5C16.75 10.9142 16.4142 11.25 16 11.25H8C7.58579 11.25 7.25 10.9142 7.25 10.5Z"
                    fill="white"
                  ></path>
                </g>
              </svg>
            </button>
          </div>
        </div>
        <div className="px-4 py-2 sm:px-5">
          <div className="flex justify-between space-x-4">
            <div className="avatar -mt-12 h-20 w-20">
              <img
                className="rounded-full border-2 border-white dark:border-navy-700"
                src={user.profile.profile_pic ? avatars2[user.profile.profile_pic] : avatars2['B'] }
                alt="avatar"
              />
              <div className="whitespace-nowrap leading-normal flex flex-col justify-center pb-2 ml-3 text-lg font-medium text-slate-700 dark:text-navy-100">
                <p className="text-white">{user.first_name} {user.last_name}</p>
                <p className="text-xs">{user.username}</p>
              </div>
            </div>
          </div>
          <div className="flex space-x-4 pt-2">
            <div className="w-7/12">
              {/* <img src={ratingImages[user.rating]}
               className="h-auto w-full my-2" 
               alt="rating" /> */}
              {/* <p className="text-xs">{(user.last_rated) ? `Last Rated: ${user.last_rated}` : 'Not Rated Yet'}</p> */}
            </div>
            <div className="w-5/12 h-full text-xs">
            <p>
                <span className="font-medium">Plan :</span> <span
                  className={"badge rounded-full" + (user.profile.plan_type === 'Premium' ? 'bg-secondary/10 text-secondary dark:bg-secondary-light/15 dark:text-secondary-light' : 'bg-info/10 text-info dark:bg-info/15')}
                  // className="bg-secondary/10 text-secondary dark:bg-secondary-light/15 dark:text-secondary-light"
                  >
                      {user.profile.plan_type}
                  </span>
              </p>
              <p>
                <span className="font-medium">Gender :</span> {user.profile.gender}
              </p>
              <p>
                <div className="flex justify-end space-x-1">
                  <button onClick={() => {
                    setShowModal(true);
                    setModalData(user);
                  }}
                   className="btn h-8 w-8 p-0 text-info hover:bg-info/20 focus:bg-info/20 active:bg-info/25">
                    <i className="fa fa-edit"></i>
                  </button>
                  <button 
                //   onClick={() => handleDelete(user.id)}
                   className="btn h-8 w-8 p-0 text-error hover:bg-error/20 focus:bg-error/20 active:bg-error/25">
                    <i className="fa fa-trash-alt"></i>
                  </button>
                </div>
              </p>
            </div>
          </div>
        </div>
      </div>
      </>
    );
  };
  
