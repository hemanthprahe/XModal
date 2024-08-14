import React, { useState } from 'react';

const Form = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [dob, setDob] = useState('');
    const [errors, setErrors] = useState({
        username: '',
        email: '',
        phone: '',
        dob: ''
    });

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        if (!username || !email || !phone || !dob) {
            setErrors({
                username: !username ? 'Please fill out this field.' : '',
                email: !email ? 'Please fill out this field.' : '',
                phone: !phone ? 'Please fill out this field.' : '',
                dob: !dob ? 'Please fill out this field.' : ''
            });
        } else if (!email.includes('@')) {
            setErrors({
                ...errors,
                email: 'Invalid email. Please check your email address.'
            });
        } else if (phone.length !== 10 || isNaN(phone)) {
            setErrors({
                ...errors,
                phone: 'Invalid phone number. Please enter a 10-digit phone number.'
            });
        } else if (new Date(dob) > new Date()) {
            setErrors({
                ...errors,
                dob: 'Invalid date of birth. Please enter a past date.'
            });
        } else {
            setIsOpen(true);
            setUsername('');
            setEmail('');
            setPhone('');
            setDob('');
            setErrors({
                username: '',
                email: '',
                phone: '',
                dob: ''
            });
        }
    };

    // Close the modal when clicking outside of it
    const handleClickOutside = (e) => {
        if (!e.target.closest('.modal-content')) {
            setIsOpen(false)
        }
    };

    // Add event listener for mousedown
    document.addEventListener('mousedown', handleClickOutside);

    return (
        <div>
            <h1>User Details Modal</h1>
            <button onClick={openModal}>Open Form</button>
            {isOpen && (
                <div className='modal'>
                    <div className='modal-content'>
                        <h1>Fill Details</h1>
                        <br />
                        <form onSubmit={closeModal}>
                        <label>Username:</label><br />
                        <input type='text' id='username' value={username} onChange={(e) => setUsername(e.target.value)} /><br />
                        <p>{errors.username}</p>
                        <label>Email Address:</label><br />
                        <input type='text' id='email' value={email} onChange={(e) => setEmail(e.target.value)} /><br />
                        <p>{errors.email}</p>
                        <label>Phone Number:</label><br />
                        <input type='text' id='phone' value={phone} onChange={(e) => setPhone(e.target.value)} /><br />
                        <p>{errors.phone}</p>
                        <label>Date Of Birth:</label><br />
                        <input type='date' id='dob' value={dob} onChange={(e) => setDob(e.target.value)} /><br />
                        <p>{errors.dob}</p>
                        <button className='submit-button' onClick={closeModal}>Submit</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Form;
