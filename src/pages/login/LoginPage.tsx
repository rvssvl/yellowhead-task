import * as React from 'react';
import {useHistory} from 'react-router-dom';
import {useFormik, FormikErrors} from 'formik';
import {useRef, useState} from 'react';
import './styles.css'
import {useDispatch} from 'react-redux';
import {setToken} from '../../redux/user';
import {useRedirectUri} from '../../utils/use-redirect-uri';

interface ILoginRequestParams {
    email: string;
    password: string;
}

// Maybe switched to using yup for complex cases
const validate = (values: ILoginRequestParams) => {
    const errors: FormikErrors<ILoginRequestParams> = {};
    // eslint-disable-next-line
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if (!re.test(String(values.email).toLowerCase())) {
        errors.email = 'Invalid email format';
    }
    if (values.password.length < 4) {
        errors.password = 'Password should have at least 4 symbols';
    }

    // TODO: Password was 12345678 so I commented validation rules that I've already coded up.
    // if (!values.password.match(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,25}$/)) {
    //     errors.password = 'Password should have at least 25 symbols';
    // }
    // if (!values.password.match(/^(?=.*?[A-Z])/)) {
    //     errors.password = 'Password should have at least 1 uppercase letter';
    // }
    // if (!values.password.match(/^(?=.*?[a-z])/)) {
    //     errors.password = 'Password should have at least 1 lowercase letter';
    // }
    // if (!values.password.match(/^(?=.*?[0-9])/)) {
    //     errors.password = 'Password should have at least 1 digit';
    // }
    return errors;
};

const LoginPage: React.FC = () => {

    const [serverError, setServerError] = useState<string | null>();
    const {redirectUri} = useRedirectUri();
    const history = useHistory();
    const dispatch = useDispatch();
    // TODO: add state to show that request is being processed

    const sendDataToServer = async (data: ILoginRequestParams) => {
        try {
            const response = await fetch(
                'https://academeez-login-ex.herokuapp.com/api/users/login',
                {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            if (!response.ok) {
                const { error }: {error: string} = await response.json();
                setServerError(error);
            }
            const { token }: {token: string} = await response.json();
            dispatch(setToken({token}));
            history.replace(redirectUri || '/todo');

        } catch (e) {
            console.log(e);
        }
    }

    const formik = useFormik<ILoginRequestParams>({
        initialValues: {
            email: '',
            password: '',
        },
        initialErrors: {
            email: '',
            password: '',
        },
        validate,
        onSubmit: async (values: ILoginRequestParams) => {
            setServerError(null);
            await sendDataToServer(values);
        },
    });

    const emailRef = useRef<HTMLInputElement>(null);

    const { handleChange, handleReset, handleBlur, handleSubmit, errors, touched, isValid } = formik;

    return (
        <form onSubmit={handleSubmit} onReset={handleReset} className="login-form">
            <div className="form-control">
                <label htmlFor="email" className="label">Email</label>
                <input id="email" ref={emailRef} type="email" onChange={handleChange} onBlur={handleBlur} />
                {
                    touched.email && errors.email && (
                        <span className="error">{errors.email}</span>
                    )
                }
            </div>
            <div className="form-control">
                <label htmlFor="password" className="label">Password</label>
                <input id="password" type="password" onChange={handleChange} onBlur={handleBlur} />
                {
                    touched.password && errors.password && (
                        <span className="error">{errors.password}</span>
                    )
                }
            </div>
            {
                serverError && (
                    <div className="server-error">{serverError}</div>
                )
            }
            <button type="submit" disabled={!isValid}>Submit</button>
        </form>
    )
};

export default LoginPage;
