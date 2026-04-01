import 'react-international-phone/style.css';
import { CreateApiContext } from '@/ContextApi/CreateApiContext';
import { authFetch } from '@/Helper/helper';
import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { PhoneInput } from 'react-international-phone';

const EditableSection = ({ title, value, description, id }) => {
    const [isEditing, setIsEditing] = useState(false);
    const { users, fetchUsersLists } = useContext(CreateApiContext);
    const [userId, setUserId] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [about, setAbout] = useState('');
    const [gender, setGender] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        if (users?.length == 0) fetchUsersLists();
    }, []);

    useEffect(() => {
        const user_id = window?.localStorage?.getItem('user_id');
        setUserId(user_id);
        if (user_id && users?.length > 0) {
            const host = users?.find(item => item?.id == user_id);
            if (host) {
                setFirstName(host?.first_name);
                setLastName(host?.last_name);
                setAbout(host?.bio);
                setUserId(user_id);
                setGender(host?.gender);
                setDateOfBirth(host?.date_of_birth);
                setPhoneNo(host?.phone_no);
                setEmail(host?.email);
            }
        }
    }, [userId, users]);

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('id', userId);
            formData.append('first_name', firstName);
            formData.append('last_name', lastName);
            formData.append('gender', gender);
            formData.append('bio', about);
            formData.append('phone_no', phoneNo);
            formData.append('email', email);
            formData.append('date_of_birth', dateOfBirth);
            const response = await authFetch(`/profile-update`, {
                method: 'POST',
                body: formData,
            });
            if (response?.status == 200) {
                toast.success(response?.message);
                setIsEditing(false);
                fetchUsersLists();
            }
        } catch (error) {
            console.log(error, 'profile update section showing this error');
        }
    }

    const renderInput = () => {
        if (id === 'about') {
            return (
                <div className='legal-info-l-name'>
                    <textarea
                        className="form-control w-100"
                        value={about}
                        onChange={(e) => setAbout(e.target.value)}
                        placeholder='Enter about'
                    />
                </div>
            )
        }

        if (id == 'legal-first-name') {
            return (
                <>
                    <div className='legal-info'>
                        <div className='legal-info-f-name'>
                            <input
                                type="text"
                                className="form-control w-100"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                placeholder="Enter first name"
                            />
                        </div>
                        <div className='legal-info-l-name'>
                            <input
                                type="text"
                                className="form-control w-100"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                placeholder="Enter last name"
                            />
                        </div>
                    </div>
                </>
            )
        }
        if (id == 'gender') {
            return (
                <div className='legal-info-l-name'>
                    <select
                        className="form-control w-100"
                        defaultValue={gender}
                        onChange={(e) => setGender(e.target.value)}>
                        <option value="">Select an option</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>
            )
        }

        if (id == 'date_of_birth') {
            return (
                <div className='legal-info-l-name'>
                    <input
                        type='date'
                        className="form-control w-100"
                        value={dateOfBirth}
                        onChange={(e) => setDateOfBirth(e.target.value)}
                    />
                </div>
            )
        }
        if (id == 'contactPhoneNo') {
            return (
                <div className='legal-info-l-name'>
                    <PhoneInput className="form-control contact-input-f w-100" defaultCountry="us" value={phoneNo} onChange={(phone) => setPhoneNo(phone)} />
                </div>
            )
        }
        if (id == 'email') {
            return (
                <div className='legal-info-l-name'>
                    <input
                        type='email'
                        className="form-control w-100"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='Enter email'
                    />
                </div>
            )
        }
    }

    return (
        <div className={`profile-session-left-about-you mb-4 ${isEditing ? 'editing-mode' : ''}`}>
            {description && description != undefined && description == 'legal-info-about-user' ? ' ' : null}
            <div className='profile-session-left-inside-det'>
                <h3>{title}</h3>
                {!isEditing && <p>{value || 'Not Provided'}</p>}
            </div>

            {!isEditing && (
                <span className='edit p-0' onClick={() => setIsEditing(true)}>
                    Edit
                </span>
            )}

            {isEditing && (
                <div className="w-100 mt-3">
                    {renderInput()}
                    <div className='profile-button-container gap-2'>
                        <button className='profile-button-save btn btn-danger rounded-5' onClick={handleProfileUpdate}>Save</button>
                        <button className='profile-button-cancel btn btn-secondary rounded-5' onClick={() => setIsEditing(false)}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default EditableSection
