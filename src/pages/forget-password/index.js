'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { CreateApiContext } from '../../ContextApi/CreateApiContext';
import { useContext } from 'react';
import toast from 'react-hot-toast';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loader, setLoader] = useState(false);
    const router = useRouter();
    const { locale } = useContext(CreateApiContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        if (!email) {
            toast.error(locale?.forgot_password?.enter_email || 'Please enter your emails');
            return;
        }

        setLoader(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_HOST}/forgot-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (data.success) {
                toast.success(data.message || 'Reset link sent to your email');
                setEmail('');
            } else {
                toast.error(data.message || 'Something went wrong');
            }
        } catch (err) {
            console.error(err);
            toast.error('Something went wrong. Please try again.');
        } finally {
            setLoader(false);
        }
    };

    return (
        <div className="sign-in-container">
            <div className="sign-in-content">
                <Link href="/" className='logo_image'>
                    <img src="/images/logo.png" alt="Logo" />
                </Link>
                <div className='heading_area'>
                    <h1>{locale?.forgot_password?.title || 'Forgot Password'}</h1>
                    <p>{locale?.forgot_password?.description || 'Enter your email to receive a password reset link.'}</p>
                </div>

                {message && <p className="text-green-500 mb-2">{message}</p>}
                {error && <p className="text-red-500 mb-2">{error}</p>}

                <form className='Form_area' onSubmit={handleSubmit}>
                    <div className='w-100'>
                        <label className='inp_label' htmlFor="email">{locale?.forgot_password?.email || 'Email'} <span>*</span></label>
                        <input
                            type="email"
                            id="email"
                            name='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="inp_control"
                            placeholder={locale?.forgot_password?.enter_email || 'Enter your email'}
                            required
                        />
                    </div>

                    <button className="role-selection__btn" type="submit" disabled={loader}>
                        {loader ? <div className="loader"></div> : locale?.forgot_password?.submit || 'Send Reset Link'}
                    </button>
                </form>

                <div className='dont_row'>
                    <span>{locale?.forgot_password?.back_to_login || 'Remember your password?'}</span>
                    <Link href="/login">{locale?.home?.sign_in || 'Sign In'}</Link>
                </div>
            </div>

            <div className='banner_image'>
                <img src="/images/banner-sign-up.webp" alt="Forgot Password Banner" />
            </div>
        </div>
    );
};

export default ForgotPassword;
