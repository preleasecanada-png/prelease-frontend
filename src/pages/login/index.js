import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useCallback, useContext, useEffect, useLayoutEffect, useState } from 'react';
import { CreateApiContext } from '../../ContextApi/CreateApiContext';
import toast from 'react-hot-toast';
import { GoogleLogin } from '@react-oauth/google';
import Script from 'next/script';

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
        const existingToken = window.localStorage.getItem("token");
        if (!existingToken) {
            window.localStorage.setItem("token", '');
            window.localStorage.setItem("email", '');
            window.localStorage.setItem("user_id", '');
        }
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
                router.push('/');
            } else if (res?.status === 422) {
                toast.error(resJson.error);
            } else {
                toast.error(resJson.error);
            }
        } catch (error) {
            toast.error(error?.message || 'Something went wrong');
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
            const token = credentialResponse.credential;

            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_HOST}/google-login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token })
            });

            const data = await res.json();

            if (res.ok) {
                handleSocialLoginSuccess(data);
            } else {
                toast.error(data.error || 'Google login failed');
            }
        } catch (error) {
            toast.error('Error during Google login');
        }
    };

    const handleSocialLoginSuccess = (data) => {
        localStorage.setItem("token", data.token);
        localStorage.setItem("email", data.user.email);
        localStorage.setItem("user_id", data.user.id);
        localStorage.setItem("role", data.user.role);
        localStorage.setItem("user_picture", data.user.picture || '');
        localStorage.setItem("user_name", data.user.first_name || '');
        document.cookie = `token=${data.token}; path=/; max-age=86400`;
        document.cookie = `role=${data.user.role}; path=/; max-age=86400`;
        router.push('/');
    };

    const handleFacebookLogin = () => {
        if (!window.FB) {
            toast.error('Facebook SDK not loaded yet. Please try again.');
            return;
        }
        window.FB.login((response) => {
            if (response.authResponse) {
                const accessToken = response.authResponse.accessToken;
                sendFacebookToken(accessToken);
            } else {
                toast.error('Facebook login was cancelled');
            }
        }, { scope: 'email,public_profile' });
    };

    const sendFacebookToken = async (accessToken) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_HOST}/facebook-login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token: accessToken })
            });
            const data = await res.json();
            if (res.ok) {
                handleSocialLoginSuccess(data);
            } else {
                toast.error(data.error || 'Facebook login failed');
            }
        } catch (error) {
            toast.error('Error during Facebook login');
        }
    };

    const handleAppleLogin = () => {
        if (!window.AppleID) {
            toast.error('Apple Sign In not loaded yet. Please try again.');
            return;
        }
        window.AppleID.auth.init({
            clientId: process.env.NEXT_PUBLIC_APPLE_CLIENT_ID,
            scope: 'name email',
            redirectURI: window.location.origin + '/login',
            usePopup: true,
        });
        window.AppleID.auth.signIn().then(async (response) => {
            try {
                const idToken = response.authorization.id_token;
                const firstName = response?.user?.name?.firstName || '';
                const lastName = response?.user?.name?.lastName || '';

                const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_HOST}/apple-login`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ token: idToken, first_name: firstName, last_name: lastName })
                });
                const data = await res.json();
                if (res.ok) {
                    handleSocialLoginSuccess(data);
                } else {
                    toast.error(data.error || 'Apple login failed');
                }
            } catch (error) {
                toast.error('Error during Apple login');
            }
        }).catch((error) => {
            if (error?.error !== 'popup_closed_by_user') {
                toast.error('Apple login was cancelled');
            }
        });
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
                        <button onClick={handleAppleLogin} title="Sign in with Apple"><img src="/images/apple.webp" alt="Apple" /></button>
                        <GoogleLogin
                            onSuccess={handleSuccess}
                            onError={() => toast.error('Google login failed')}
                        />
                        <button onClick={handleFacebookLogin} title="Sign in with Facebook">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="#1877F2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                        </button>
                    </div>

                    <Script
                        src="https://connect.facebook.net/en_US/sdk.js"
                        strategy="lazyOnload"
                        onLoad={() => {
                            window.FB.init({
                                appId: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID,
                                cookie: true,
                                xfbml: false,
                                version: 'v19.0'
                            });
                        }}
                    />
                    <Script
                        src="https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js"
                        strategy="lazyOnload"
                    />
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
