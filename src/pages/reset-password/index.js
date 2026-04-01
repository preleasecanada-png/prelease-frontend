'use client';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';

const eyeIcons = {
    open: '/images/eye-open.svg',
    closed: '/images/eye-closed.svg',
};

const ResetPassword = () => {
    const router = useRouter();
    const { token } = router.query;

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loader, setLoader] = useState(false);

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    useEffect(() => {
        if (!router.isReady) return;
        if (!token) {
            setError('Invalid or missing token');
        }
    }, [router.isReady , token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        if (!password || !confirmPassword) {
            toast.error('All fields are required');
            return;
        }

        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        setLoader(true);

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_API_HOST}/reset-password`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        token: token,
                        password: password,
                        confirm_password: confirmPassword,
                    }),
                }
            );

            const data = await res.json();

            if (data.success) {
                toast.success(data.message || 'Password reset successfully');
                setPassword('');
                setConfirmPassword('');

                setTimeout(() => {
                    router.push('/login');
                }, 2000);
            } else {
                toast.error(data.message || 'Something went wrong');
            }
        } catch (err) {
            toast.error('Server error, please try again');
        } finally {
            setLoader(false);
        }
    };

    return (
        <div className="sign-in-container">
            <div className="sign-in-content">
                <Link href="/" className="logo_image">
                    <img src="/images/logo.png" alt="Logo" />
                </Link>

                <div className="heading_area">
                    <h1>Reset Password</h1>
                    <p>Enter your new password below</p>
                </div>

                {error && <p className="text-red-500">{error}</p>}
                {message && <p className="text-green-500">{message}</p>}

                <form className="Form_area" onSubmit={handleSubmit}>
                    <div className="w-100">
                        <label className="inp_label">New Password</label>
                        <div className="password-wrapper">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                className="inp_control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter new password"
                                required
                            />
                            <div
                                className="toggle-button"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                <img
                                    height={18}
                                    src={showPassword ? eyeIcons.closed : eyeIcons.open}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="w-100">
                        <label className="inp_label">Confirm Password</label>
                        <div className="password-wrapper">
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                className="inp_control"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm password"
                                required
                            />
                            <div
                                className="toggle-button"
                                onClick={() =>
                                    setShowConfirmPassword(!showConfirmPassword)
                                }
                            >
                                <img
                                    height={18}
                                    src={
                                        showConfirmPassword
                                            ? eyeIcons.closed
                                            : eyeIcons.open
                                    }
                                />
                            </div>
                        </div>
                    </div>

                    <button className="submit_form" disabled={loader || !token}>
                        {loader ? <div className="loader"></div> : 'Reset Password'}
                    </button>
                </form>

                <div className="dont_row" style={{ marginTop: '0px !important' }}>
                    <Link href="/login">Back to Login</Link>
                </div>
            </div>

            <div className="banner_image">
                <img src="/images/banner-sign-up.webp" alt="Reset Password" />
            </div>
        </div>
    );
};

export default ResetPassword;
