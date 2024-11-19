import React, { useRef, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setUserId } from '../redux/result_reducer';
import Cookies from 'js-cookie';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Main() {
    const navigate = useNavigate();
    const location = useLocation();
    const username=Cookies.get('clientusername');
    const [name, setname] = useState(username);
console.log(name);
    useEffect(() => {
        // Check if the cookie is not set
        if (!Cookies.get('login')) {
            // Redirect to the login page
            navigate('/login'); // Replace '/login' with the actual login page URL
        }
    }, []);

    const inputRef = useRef(null);
    const dispatch = useDispatch();

    function startQuiz() {
        if (inputRef.current?.value) {
            dispatch(setUserId(inputRef.current.value));
        }
    }

    return (
        <div className='container'>
            <h1 className='title text-light'>Quiz Application</h1>

            <ol>
                <li>You will be asked 10 questions one after another.</li>
                <li>10 points are awarded for the correct answer.</li>
                <li>Each question has three options. You can choose only one option.</li>
                <li>You can review and change answers before the quiz finishes.</li>
                <li>The result will be declared at the end of the quiz.</li>
            </ol>

            <form id='form'>
                <input
                    ref={inputRef}
                    className='userid'
                    type='text'
                    value={name}
                    placeholder={username}
                    onChange={(e) => setname(e.target.value)}
                />
            </form>

            <div className='start'>
                <Link className='btn' to={'quiz'} onClick={startQuiz}>
                    Start Quiz
                </Link>
            </div>
        </div>
    );
}
