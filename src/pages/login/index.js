import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useCallback, useContext, useEffect, useLayoutEffect, useState } from 'react';
import { CreateApiContext } from '../../ContextApi/CreateApiContext';
import toast from 'react-hot-toast';
import { GoogleLogin } from '@react-oauth/google';

const eyeIcons = {
    open: '/images/eye-open.svg',
    closed: '/images/eye-closed.svg',
};
const SignIn = () => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState({});
    const [loader, setLoader] = useState(false);
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const { locale } = useContext(CreateApiContext);

    const togglePasswordVisibility = useCallback(() => {
        setIsPasswordVisible(!isPasswordVisible);
    }, [isPasswordVisible]);

    useEffect(() => {
        window.localStorage.setItem("token", '');
        window.localStorage.setItem("email", '');
        window.localStorage.setItem("user_id", '');
    }, []);

    useEffect(() => {
        setTimeout(() => {
            setLoader(false)
        }, 5000);
    }, [loader]);

    const handleLoginUser = async (e) => {
        e.preventDefault();
        setLoader(true);
        try {
            if (!email || !password) {
                setError({ email: !email ? 'The email field is required.' : '', password: !password ? 'The password field is required.' : '' });
                return;
            }
            let formData = new FormData();
            formData.append('email', email);
            formData.append('password', password);
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_HOST}/login`, {
                method: "POST",
                body: formData
            });
            const resJson = await res.json();
            if (res.status === 200) {
                router.push('/');
                window.localStorage.setItem('token', resJson.token);
                window.localStorage.setItem('email', email);
                window.localStorage.setItem('user_id', resJson.user_id);
                window.localStorage.setItem('role', resJson.role || resJson.user?.role);
                window.localStorage.setItem('user_picture', resJson.user?.picture || '');
                window.localStorage.setItem('user_name', resJson.user?.first_name || '');
                document.cookie = `token=${resJson.token}; path=/; max-age=86400`;
                document.cookie = `role=${resJson.role || resJson.user?.role}; path=/; max-age=86400`;
                setEmail("");
                setPassword("");
                toast.success(resJson.message);
            } else if (res?.status === 422) {
                toast.error(resJson.error);
            } else {
                toast.error(resJson.error);
            }
        } catch (error) {
            toast.error(error);
        }
    }


    useLayoutEffect(() => {
        const token = window.localStorage.getItem("token");
        if (token) {
            router.push('/');
        }
    }, [router]);

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

    const handleSuccess = async (credentialResponse) => {
        try {
            const token = credentialResponse.credential; // ID token from Google

            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_HOST}/google-login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ token })
            });

            const data = await res.json();
            console.log(data);

            if (res.ok) {
                router.push('/');
                localStorage.setItem("token", data.token);
                localStorage.setItem("email", data.user.email);
                localStorage.setItem("user_id", data.user.id);
                localStorage.setItem("role", data.user.role);
                localStorage.setItem("user_picture", data.user.picture || '');
                localStorage.setItem("user_name", data.user.first_name || '');
            } else {
                console.error("Google login failed:", data.error);
            }

        } catch (error) {
            console.error("Error in Google login:", error);
        }
    };

    return (
        <>
            <div className="sign-in-container">
                <div className="sign-in-content">
                    <Link href="/" className='logo_image'><img src="/images/logo.png" alt="" /></Link>
                    <div className='heading_area'>
                        <h1 className="">{locale?.sign_in?.welcome_to_prelease}</h1>
                        <p>{locale?.sign_in?.detail_sign_in}.</p>
                    </div>

                    <form className='Form_area'>
                        <div className='w-100'>
                            <label className='inp_label' htmlFor="email">{locale?.sign_up?.email} <span>*</span></label>
                            <input type="email" id="email" name='email' className="inp_control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={`${locale?.sign_up?.enter_your_email}...`} required />
                            <span className="error-message">{error?.email}</span>
                        </div>
                        <div className='w-100'>
                            <label className='inp_label' htmlFor="email">{locale?.sign_up?.password} <span>*</span></label>
                            <div className="password-wrapper">
                                <input type={isPasswordVisible ? 'text' : 'password'} id="password-field" name='password' value={password} onChange={(e) => setPassword(e.target.value)} className="inp_control" placeholder={`${locale?.sign_up?.enter_password}`} required />
                                <div className="toggle-button" onClick={togglePasswordVisibility}>
                                    <img height={18} src={isPasswordVisible ? eyeIcons.closed : eyeIcons.open} alt="Toggle password visibility" />
                                </div>
                                <span className="error-message">{error?.password}</span>
                            </div>
                        </div>
                        <div className='forget_row'>
                            <p className="rem-check">
                                <input id="wp-comment-cookies-consent" name="" type="checkbox" value="" required />
                                <label htmlFor="wp-comment-cookies-consent">{locale?.sign_up?.remember_me} </label>
                            </p>
                            <Link href="/forget-password">{locale?.sign_up?.forget_password}?</Link>
                        </div>
                        <button className="role-selection__btn" onClick={handleLoginUser} disabled={loader === true}>
                            {loader === true ? <div className="loader"></div> : "Sign in"}
                        </button>
                    </form>

                    <div className='span_vr'>
                        <span></span>
                        <p>{locale?.sign_up?.or}</p>
                        <span></span>
                    </div>
                    <div className='social_login'>
                        <button><img src="/images/apple.webp" alt="" /></button>
                        {/* <button><img src="/images/google.webp" alt="" /></button> */}
                        {/* <button onClick={handleGoogleLogin} disabled={loading}><img src="/images/google.webp" alt="Google Login" /></button> */}
                        <GoogleLogin
                        onSuccess={handleSuccess}
                        onError={() => console.log('Login Failed')}
                        />
                        <button><img src="/images/twit.webp" alt="" /></button>
                    </div>
                    <div className='dont_row'>
                        <span>{locale?.sign_in?.dont_have_an_account_yet}?</span>
                        <Link href="/sign-up">{locale?.home?.sign_up}</Link>
                    </div>
                </div>
                <div className='banner_image'>
                    <img src="/images/banner-sign-in.webp" alt="Sign In Banner" />
                </div>
            </div>
        </>
    );
};

export default SignIn;
