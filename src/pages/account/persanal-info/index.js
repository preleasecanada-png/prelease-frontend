import Link from 'next/link'
import React, { useContext, useEffect, useRef, useState } from 'react'
import EditableSection from './EditTableSection'
import { CreateApiContext } from '@/ContextApi/CreateApiContext';
import { authFetch } from '@/Helper/helper';
import toast from 'react-hot-toast';

const PersonalInfo = () => {
    const { users, fetchUsersLists } = useContext(CreateApiContext);
    const [host, setHost] = useState({});
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (users?.length == 0) fetchUsersLists();
    }, []);

    useEffect(() => {
        const user_id = window?.localStorage?.getItem('user_id');
        if (users?.length > 0) {
            const host = users?.find(item => item?.id == user_id);
            setHost(host);
        }
    }, [users]);

    const handlePhotoUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
        if (!validTypes.includes(file.type)) {
            toast.error('Please select a valid image (JPG, PNG, WebP, GIF)');
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            toast.error('Image must be less than 5MB');
            return;
        }
        setUploading(true);
        try {
            const formData = new FormData();
            formData.append('id', host?.id);
            formData.append('picture', file);
            const response = await authFetch('/profile-update', {
                method: 'POST',
                body: formData,
            });
            if (response?.status === 200) {
                toast.success('Profile photo updated!');
                const newPicture = response?.host?.picture || '';
                window.localStorage.setItem('user_picture', newPicture);
                fetchUsersLists();
            } else {
                toast.error('Failed to upload photo');
            }
        } catch (error) {
            console.error(error);
            toast.error('Error uploading photo');
        } finally {
            setUploading(false);
        }
    };

    const getProfileImage = () => {
        if (host?.picture) {
            return host.picture.startsWith('http')
                ? host.picture
                : `${process.env.NEXT_PUBLIC_BASE_LOCAL_IMAGE_HOST}/${host.picture}`;
        }
        return null;
    };

    return (
        <section className="profile-session-main-container container">
            <div className='profile-session-heading'>
                <h4><Link href="/account">Account</Link></h4>
                <p><Link href="/account/personal-info">{' > Personal Info'}</Link></p>
            </div>

            <div className='profile-session-row'>
                <div className='profile-session-left-container'>
                    <h1>Basic Info</h1>

                    <div className='profile-session-left-legal-name' style={{ marginBottom: '24px' }}>
                        <h3>Profile Photo</h3>
                        <p>This photo will be visible to other users on the platform.</p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginTop: '12px' }}>
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                style={{
                                    width: '96px', height: '96px', borderRadius: '50%', overflow: 'hidden',
                                    border: '3px solid #e0e0e0', cursor: 'pointer', position: 'relative',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    backgroundColor: '#f5f5f5', flexShrink: 0,
                                }}
                            >
                                {getProfileImage() ? (
                                    <img src={getProfileImage()} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                ) : (
                                    <div style={{
                                        width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        backgroundColor: '#D80621', color: '#fff', fontSize: '36px', fontWeight: '600',
                                    }}>
                                        {host?.first_name?.charAt(0)?.toUpperCase() || '?'}
                                    </div>
                                )}
                                <div style={{
                                    position: 'absolute', bottom: 0, left: 0, right: 0, height: '28px',
                                    backgroundColor: 'rgba(0,0,0,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                                        <circle cx="12" cy="13" r="4"></circle>
                                    </svg>
                                </div>
                            </div>
                            <div>
                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    disabled={uploading}
                                    style={{
                                        padding: '8px 20px', borderRadius: '8px', border: '1px solid #D80621',
                                        backgroundColor: '#fff', color: '#D80621', fontWeight: '600',
                                        cursor: uploading ? 'not-allowed' : 'pointer', fontSize: '14px',
                                    }}
                                >
                                    {uploading ? 'Uploading...' : 'Change Photo'}
                                </button>
                                <p style={{ fontSize: '12px', color: '#717171', marginTop: '6px' }}>JPG, PNG or WebP. Max 5MB.</p>
                            </div>
                        </div>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/jpeg,image/png,image/webp,image/gif"
                            onChange={handlePhotoUpload}
                            style={{ display: 'none' }}
                        />
                    </div>

                    <div className='profile-session-left-legal-name'>
                        <h3>Your Legal Name</h3>
                        <p>Make sure this matches the name on your government ID.</p>
                        <EditableSection description="legal-info-first-name" title="Legal Information" value={`${host?.first_name || ''} ${host?.last_name || ''}`} inputType="text" id="legal-first-name" />
                    </div>
                    <EditableSection title="About you" value={host?.bio} id="about" />
                    <EditableSection title="Gender" value={host?.gender} id="gender" />
                    <EditableSection title="DOB" value={host?.date_of_birth} id='date_of_birth' />
                    <h1 className='contact-info-hea mt-5'>Contact info</h1>
                    <EditableSection title="Phone Number" value={host?.phone_no} id="contactPhoneNo" />
                    <EditableSection title="Email" id="email" value={host?.email} />
                </div>

                <div className='profile-session-right-container'>
                    <img src="/images/account/profile-img-1.webp" alt="Profile" />
                    <h4>Your basic details and contact information</h4>
                    <p>We use your personal details to verify your identity and personalize your booking experience. Your information is kept secure and private.</p>
                </div>
            </div>
        </section>
    )
}

export default PersonalInfo