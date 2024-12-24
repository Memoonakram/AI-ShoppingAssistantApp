import React, { useContext, useEffect, useState } from 'react'
import { ButtonElement, InputElement } from '../components/elements/FormElements'
import { Logo } from '../../data/logo'
import { APP_NAME } from '../../data/Variables'
import { LoadingScreen } from '../components/elements/LoadingScreen'
import { AuthContext } from '../services/AuthService'
import { Link, useNavigate } from 'react-router-dom'
import { PageTitle } from '../components/elements/PageTitle'

export const ChangePassword = ({isLoggedIn}) => {
    const [form, setForm] = useState({
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    });
    const {isLoading, changePassword, logout, user} = useContext(AuthContext)

    const handleFormChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        if (e.target.name === 'newPassword') {
            validatePassword(e.target.value);
        }
        if (message && e.target.name === 'newPassword') {
            setMessage('');
        }
    };

    const [message, setMessage] = useState('');
  const [passManage, setPassManage] = useState({
    length: false,
    specialChar: false,
    capitalLetter: false,
    number: false,
  });

  const validatePassword = (newPassword) => {
    const minLength = newPassword.length >= 12;
    const hasSpecialChar = /[&@#[\]()*^$?;:'"<>,.!]/.test(newPassword);
    const hasCapitalLetter = /[A-Z]/.test(newPassword);
    const hasNumber = /[0-9]/.test(newPassword);

    setPassManage({
        length: minLength,
        specialChar: hasSpecialChar,
        capitalLetter: hasCapitalLetter,
        number: hasNumber,
    });
};

const navigate = useNavigate();

const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (form.newPassword !== form.confirmNewPassword) {
        setMessage('Passwords do not match');
        return;
    }
    if (!passManage.length || !passManage.specialChar || !passManage.capitalLetter || !passManage.number) {
        setMessage('Password does not meet the requirements');
        return;
    }
    let data = { old_password: form.oldPassword, new_password: form.newPassword, re_new_password: form.confirmNewPassword };
    let res = await changePassword(data);
    if (res) {
        setTimeout(async () => {
            await logout();
            navigate('/login');
        }, 3000);
    }
}

useEffect(() => {
    if (!isLoggedIn && !user) {
      navigate("/login");
    }
  }, [isLoggedIn, user]);

    return (
        <>
            <PageTitle title={`${APP_NAME} | Password Reset`} />
            {isLoading && <LoadingScreen />}
            <main className="grid w-full grow grid-cols-1 place-items-center h-100vh">
                <div className="w-full max-w-[26rem] p-4 sm:px-5 card">
                    <div className="text-center">
                        <Link to="/" exact="true">
                            <Logo />
                        </Link>
                        <div className="mt-4">
                            <h2 className="text-2xl font-semibold text-slate-600 dark:text-navy-100">
                                Change Password
                            </h2>
                        </div>
                    </div>
                    <div className="rounded-lg p-3 lg:p-5">
                        <form onSubmit={handlePasswordChange} className='space-y-4'>

                            <InputElement
                                label='Old Password'
                                type='password'
                                name='oldPassword'
                                value={form.oldPassword}
                                handleChange={handleFormChange}
                                placeholder='Enter Old Password'
                                iconclassName={'fas fa-lock'}
                            />


                            <InputElement
                                label='New Password'
                                type='password'
                                name='newPassword'
                                value={form.newPassword}
                                handleChange={handleFormChange}
                                placeholder='Enter New Password'
                                iconclassName={'fas fa-lock'}
                            />

                            <InputElement
                                label='Confirm Password'
                                type='password'
                                name='confirmNewPassword'
                                value={form.confirmNewPassword}
                                handleChange={handleFormChange}
                                placeholder='Confirm Password'
                                iconclassName={'fas fa-lock'}
                            />


                            {message && <p className="text-xs mt-2 text-red-600">{message}</p>}

                            <p className='text-xs mt-2'>
                                Password must contain:
                                <ul className="list-none">
                                    <li className={`${passManage.length ? 'text-green-600' : 'text-red-600'}`}>
                                        <i className={`fa-solid fa-${passManage.length ? 'check' : 'times'}`}></i>
                                        &#160;&#160;At least 12 characters
                                    </li>
                                    <li className={`${passManage.specialChar ? 'text-green-600' : 'text-red-600'}`}>
                                        <i className={`fa-solid fa-${passManage.specialChar ? 'check' : 'times'}`}></i>
                                        &#160;&#160;At least one special character
                                    </li>
                                    <li className={`${passManage.capitalLetter ? 'text-green-600' : 'text-red-600'}`}>
                                        <i className={`fa-solid fa-${passManage.capitalLetter ? 'check' : 'times'}`}></i>
                                        &#160;&#160;At least one capital letter
                                    </li>
                                    <li className={`${passManage.number ? 'text-green-600' : 'text-red-600'}`}>
                                        <i className={`fa-solid fa-${passManage.number ? 'check' : 'times'}`}></i>
                                        &#160;&#160;At least one number
                                    </li>
                                </ul>
                            </p>

                            <ButtonElement
                                type='submit'
                                label='Change Password'
                                primary
                                customClass='w-full mt-4'
                            />

                        </form>
                    </div>
                </div>
            </main>
        </>
    )
}
