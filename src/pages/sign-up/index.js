import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { memo, useCallback, useContext, useEffect, useLayoutEffect, useState } from 'react';
import { CreateApiContext } from '../../ContextApi/CreateApiContext';

const eyeIcons = {
    open: '/images/eye-open.svg',
    closed: '/images/eye-closed.svg',
};

const roles = [
    {
        key: 'Tenant',
        icon: (
            <img src="/images/tenant-icon.svg" alt="Tenant Icon" />
        ),
        description: 'Find trusted homes designed for your new beginning',
    },
    {
        key: 'Landlord',
        icon: (
            <img src="/images/landlord-icon.svg" alt="Landlord Icon" />
        ),
        description: 'Find trusted tenants and reduce vacancy risk',
    },
];

const SignUp = memo(() => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState({});
    const router = useRouter();
    const [loader, setLoader] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
    const { locale } = useContext(CreateApiContext);
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(0);
    const [selected, setSelected] = useState('Tenant');

    const togglePasswordVisibility = useCallback(() => {
        setIsPasswordVisible(!isPasswordVisible);
    }, [isPasswordVisible]);

    const toggleConfirmPasswordVisibility = useCallback(() => {
        setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
    }, [isConfirmPasswordVisible]);

    useEffect(() => {
        window.localStorage.setItem("email", '');
        window.localStorage.setItem("user_id", '');
    }, []);


    // useEffect(() => {
    //     setTimeout(() => {
    //         setLoader(false)
    //     }, 5000);
    // }, [loader]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoader(true);
        try {
            if (!firstName || !lastName || !email || !dateOfBirth || !password || !confirmPassword) {
                setError({
                    first_name: !firstName ? 'The first name field is required.' : '',
                    last_name: !lastName ? 'The last name field is required.' : '',
                    email: !email ? 'The email field is required.' : '',
                    date_of_birth: !dateOfBirth ? 'The date of birth field is required.' : '',
                    password: !password ? 'The password field is required.' : '',
                    confirm_password: !confirmPassword ? 'The password confirm field must match password.' : '',
                });
                return;
            }
            const formData = new FormData();
            formData.append('first_name', firstName);
            formData.append('last_name', lastName);
            formData.append('email', email);
            formData.append('date_of_birth', dateOfBirth);
            formData.append('password', password);
            formData.append('confirm_password', confirmPassword);
            formData.append('role', selected);
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_HOST}/register`, {
                method: 'POST',
                body: formData,
            });
            const resJson = await res.json();
            if (res.status === 200) {
                // window.localStorage.setItem('token', resJson.token);
                window.localStorage.setItem('email', email);
                window.localStorage.setItem('user_id', resJson?.user?.id);
                window.localStorage.setItem('role', selected);
                setFirstName("");
                setLastName("");
                setEmail("");
                setDateOfBirth("");
                setPassword("");
                setConfirmPassword("");
                router.push('/verification');
                toast.success(resJson.message);
            } else if (res?.status === 422) {
                setError((resJson.errors));
            } else {
                setError((resJson.errors));
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoader(false);
        }
    }

    const handleGoogleLogin = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_HOST}/auth/google`);
            const data = await response.json();
            if (data.url) {
                window.location.href = data.url;
            } else {
                console.error('Failed to get Google login URL');
            }
        } catch (error) {
            console.error('Error during Google login:', error);
        } finally {
            setLoading(false);
        }
    };

    useLayoutEffect(() => {
        const token = window.localStorage.getItem("token");
        if (token) {
            router.push('/');
        }
    }, [router]);

    const handleContinue = () => {
        setStep(1);
    };

    return (
        <>
            {step == 0 && (
                <div className="sign-in-container">
                    <div className="sign-up-role sign-in-content">
                        <Link href="/" className='logo_image'><img src="/images/logo.png" alt="" /></Link>
                        <div className='heading_area'>
                            <h1 className="">{locale?.sign_in?.welcome_to_prelease}</h1>
                            <p>Please select your role</p>
                        </div>


                        <div className="role-selection">
                            <div className="role-selection__cards">
                                {roles.map(({ key, icon, description }) => (
                                    <div
                                        key={key}
                                        className={`role-selection__card ${selected === key ? 'role-selection__card--active' : ''}`}
                                        onClick={() => setSelected(key)}
                                    >
                                        <div className="role-selection__card-top">
                                            <span className={`role-selection__card-icon ${selected === key ? 'role-selection__card-icon--active' : ''}`}>
                                                {icon}
                                            </span>
                                            <span className={`role-selection__radio ${selected === key ? 'role-selection__radio--active' : ''}`}>
                                                {selected === key && <span className="role-selection__radio-dot" />}
                                            </span>
                                        </div>
                                        <h3 className="role-selection__card-title">{key}</h3>
                                        <p className="role-selection__card-desc">{description}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Continue Button */}
                            <button className="role-selection__btn" onClick={handleContinue}>
                                Continue
                            </button>

                            {/* Login Link */}
                            <p className="role-selection__login-text">
                                Don't have an account yet? <Link href="/login" className="role-selection__login-link">Login</Link>
                            </p>
                        </div>




                    </div>
                    <div className='banner_image'>
                        <img src="/images/banner-sign-in.webp" alt="Sign In Banner" />
                    </div>
                </div>
            )}
            {step == 1 && (
                <div className="sign-in-container">
                    <div className="sign-in-content">
                        <Link href="/" className='logo_image'><img src="/images/logo.png" alt="Logo" /></Link>
                        <div className='heading_area'>
                            <h1 className="">{locale?.sign_up?.create_account}</h1>
                            <p>{locale?.sign_up?.detail_sign_up}</p>
                        </div>

                        <form className='Form_area'>
                            <div className='d-flex gap-3'>
                                <div className='w-100'>
                                    <label className='inp_label' htmlFor="f-name">{locale?.sign_up?.first_name} <span>*</span></label>
                                    <input type="text" name='first_name' value={firstName} onChange={(e) => setFirstName(e.target.value)} id="f-name" className="inp_control" placeholder={`${locale?.sign_up?.first_name}`} required />
                                    <span className="error-message">{error?.first_name}</span>
                                </div>
                                <div className='w-100'>
                                    <label className='inp_label' htmlFor="l-name">{locale?.sign_up?.last_name}  <span>*</span></label>
                                    <input type="text" id="l-name" className="inp_control" name='last_name' value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder={`${locale?.sign_up?.last_name}`} required />
                                    <span className="error-message">{error?.last_name}</span>
                                </div>
                            </div>
                            <div className='w-100'>
                                <label className='inp_label' htmlFor="dob">{locale?.sign_up?.date_of_birth} <span>*</span></label>
                                <input type="date" id="dob" name='date_of_birth' value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} className="inp_control" required />
                                <span className="error-message">{error?.date_of_birth}</span>
                            </div>

                            <div className='w-100'>
                                <label className='inp_label' htmlFor="email">{locale?.sign_up?.email} <span>*</span></label>
                                <input type="email" id="email" className="inp_control" name='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder={`${locale?.sign_up?.enter_your_email}`} required />
                                <span className="error-message">{error?.email}</span>
                            </div>
                            <div className='w-100'>
                                <label className='inp_label' htmlFor="password-field">{locale?.sign_up?.password} <span>*</span></label>
                                <div className="password-wrapper">
                                    <input
                                        type={isPasswordVisible ? 'text' : 'password'}
                                        id="password-field"
                                        className="inp_control"
                                        placeholder={`${locale?.sign_up?.enter_password}`}
                                        required
                                        name='password' value={password} onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <div className="toggle-button" onClick={togglePasswordVisibility}>
                                        <img
                                            height={18}
                                            src={isPasswordVisible ? eyeIcons.closed : eyeIcons.open}
                                            alt="Toggle password visibility"
                                        />
                                    </div>
                                </div>
                                <span className="error-message">{error?.password}</span> <br />
                                <span>{locale?.sign_up?.minimum_length_8_characters}</span>
                            </div>
                            <div className='w-100'>
                                <label className='inp_label' htmlFor="confirm-password-field">{locale?.sign_up?.confirm_password} <span>*</span></label>
                                <div className="password-wrapper">
                                    <input
                                        type={isConfirmPasswordVisible ? 'text' : 'password'}
                                        id="confirm-password-field"
                                        className="inp_control"
                                        placeholder={`${locale?.sign_up?.enter_confirm_password}`}
                                        required
                                        name='confirm_password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                    <div className="toggle-button" onClick={toggleConfirmPasswordVisibility}>
                                        <img
                                            height={18}
                                            src={isConfirmPasswordVisible ? eyeIcons.closed : eyeIcons.open}
                                            alt="Toggle password visibility"
                                        />
                                    </div>
                                </div>
                                <span className="error-message">{error?.confirm_password}</span> <br />
                                <span>{locale?.sign_up?.minimum_length_8_characters}</span>
                            </div>
                            <div className='forget_row'>
                                <p className="rem-check">
                                    <input id="wp-comment-cookies-consent" name="" type="checkbox" value="" required />
                                    <label htmlFor="wp-comment-cookies-consent">{locale?.sign_up?.remember_me} </label>
                                </p>
                                <Link href="/forget-password">{locale?.sign_up?.forget_password}?</Link>
                            </div>
                            <button className="submit_form" onClick={handleSubmit} disabled={loader === true}>
                                {loader === true ? <div className="loader"></div> : "Sign up"}
                            </button>
                        </form>

                        <div className='span_vr'>
                            <span></span>
                            <p>{locale?.sign_up?.or}</p>
                            <span></span>
                        </div>
                        <div className='social_login'>
                            <button><img src="/images/apple.webp" alt="Apple Login" /></button>
                            <button onClick={handleGoogleLogin} disabled={loading}><img src="/images/google.webp" alt="Google Login" /></button>
                            <button><img src="/images/twit.webp" alt="Twitter Login" /></button>
                        </div>
                        <div className='dont_row'>
                            <span>{locale?.sign_up?.already_have_an_account}?</span>
                            <Link href="/login">{locale?.home?.sign_in}</Link>
                        </div>
                    </div>
                    <div className='banner_image'>
                        <img src="/images/banner-sign-up.webp" alt="Sign Up Banner" />
                    </div>
                </div>
            )}
        </>
    );
});

SignUp.displayName = 'SignUp';

export default SignUp;
