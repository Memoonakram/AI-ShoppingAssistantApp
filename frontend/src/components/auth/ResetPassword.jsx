import React, { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../services/AuthService';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { APP_NAME } from '../../data/Variables';
import { LoadingScreen } from "../components/elements/LoadingScreen";
import { ButtonElement, InputElement } from '../components/elements/FormElements';
import { Logo } from '../../data/logo';
import { PageTitle } from '../components/elements/PageTitle';

function RequestPasswordReset({isLoggedIn}) {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const { isLoading, requestPasswordReset, user} = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let data = { email };
        await requestPasswordReset(data);
    };

    const navigate = useNavigate();
    
    useEffect(() => {
        if (isLoggedIn) {
          navigate("/user/profile");
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
                                Request Password Reset
                            </h2>
                        </div>
                    </div>
                    <div className="rounded-lg p-3 lg:p-5">
                        <form onSubmit={handleSubmit} className='space-y-4'>
                            <InputElement
                                label='Email'
                                type='email'
                                name='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder='Enter your email address'
                                iconclassName={'fa-solid fa-envelope'}
                            />
                            {/* { message && <p className="text-red-500 text-xs mt-2 text-red-600">{message}</p>} */}
                            <ButtonElement
                                type='submit'
                                label='Request Reset Email'
                                primary={true}
                                customClass={'w-full'}
                            />
                        </form>
                    </div>
                </div>
            </main>
        </>
    );
}

function ResetPassword({isLoggedIn}) {
    const { uidb64, token } = useParams();
    const [message, setMessage] = useState('');
    const [tokenValid, setTokenValid] = useState(null); // Use null initially to show loading state
    const [form, setForm] = useState({
        newPassword: "",
        confirmNewPassword: "",
    });
    const { isLoading, checkPassResetToken, resetPassword, user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const checkToken = async () => {
            let data = { uidb64, token };
            let response = await checkPassResetToken(data);
            setTokenValid(response);
        };
        checkToken();
    }, [uidb64, token]);


    const handleFormChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        if (e.target.name === 'newPassword') {
            validatePassword(e.target.value);
        }
        if (message && e.target.name === 'newPassword') {
            setMessage('');
        }
    };

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
        let data = { uidb64, token, new_password: form.newPassword, re_new_password: form.confirmNewPassword };
        let res = await resetPassword(data);
        if (res) {
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        }
    };

    useEffect(() => {
        if (isLoggedIn) {
          navigate("/user/profile");
        }
      }, [isLoggedIn, user]);

    return (
        <>
            <PageTitle title="Boopy | Reset Password" />
            {isLoading && <LoadingScreen />}
            <main className="grid w-full grow grid-cols-1 place-items-center h-100vh">
                <div className="w-full max-w-[26rem] p-4 sm:px-5">
                    <div className="text-center">
                        <Link to="/" exact="true">
                            <Logo />
                        </Link>
                        <div className="mt-4">
                            <h2 className="text-2xl font-semibold text-slate-600 dark:text-navy-100">
                                Reset Password
                            </h2>
                        </div>
                    </div>
                    <div className="card mt-3 rounded-lg p-5 lg:p-7">
                        {(tokenValid) ? (
                            <form onSubmit={handlePasswordChange}>

                                <InputElement
                                    label='New Password'
                                    type='password'
                                    name='newPassword'
                                    value={form.newPassword}
                                    onChange={handleFormChange}
                                    placeholder='Enter New Password'
                                />

                                <InputElement
                                    label='Confirm Password'
                                    type='password'
                                    name='confirmNewPassword'
                                    value={form.confirmNewPassword}
                                    onChange={handleFormChange}
                                    placeholder='Confirm Password'
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
                                    label='Reset Password'
                                    primary={true}
                                />
                                
                            </form>) : (
                            <p>{message}</p>
                        )}
                    </div>
                </div>
            </main>
        </>
    );
};


export { RequestPasswordReset, ResetPassword };
