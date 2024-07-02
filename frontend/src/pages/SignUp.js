import { Avatar, Box, Typography, Link } from '@mui/material';
import React, { useEffect } from 'react';
import Footer from '../component/Footer';
import Navbar from '../component/Navbar';
import PersonAddOutlined from '@mui/icons-material/PersonAddOutlined';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { userSignUpAction } from '../redux/actions/userAction';
import { useNavigate } from 'react-router-dom';

const validationSchema = yup.object({
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string('Enter your password')
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
    role: yup
        .number('Enter your role')
        .oneOf([0, 1], 'Role must be 0 or 1')
        .default(0)
        .required('Role is required'),
});

const SignUp = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated, userInfo } = useSelector(state => state.signUp);

    useEffect(() => {
        if (isAuthenticated) {
            if (userInfo.role === 1) {
                navigate('/admin/dashboard');
            } else {
                navigate('/user/dashboard');
            }
        }
    }, [isAuthenticated, navigate, userInfo]);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            role: 0,
        },
        validationSchema: validationSchema,
        onSubmit: (values, actions) => {
            dispatch(userSignUpAction(values));
            actions.resetForm();
        }
    });

    return (
        <>
            <Navbar />
            <Box sx={{ height: '81vh', display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: '#FFE9D0' }}>
                <Box onSubmit={formik.handleSubmit} component="form" className='form_style border-style' sx={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '10px',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    padding: '2rem',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '100%',
                    maxWidth: '400px'
                }}>
                    <Avatar sx={{ m: 1, bgcolor: "#7469B6", mb: 3 }}>
                        <PersonAddOutlined />
                    </Avatar>
                    <TextField sx={{ mb: 3 }}
                        fullWidth
                        id="email"
                        label="E-mail"
                        name='email'
                        InputLabelProps={{
                            shrink: true,
                        }}
                        placeholder="E-mail"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                    />
                    <TextField sx={{ mb: 3 }}
                        fullWidth
                        id="password"
                        name="password"
                        label="Password"
                        type="password"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        placeholder="Password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                    />
                    <TextField sx={{ mb: 3 }}
                        fullWidth
                        id="role"
                        name="role"
                        label="Role"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        placeholder="Role (0 or 1)"
                        value={formik.values.role}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.role && Boolean(formik.errors.role)}
                        helperText={formik.touched.role && formik.errors.role}
                    />
                    <Button fullWidth variant="contained" type='submit' sx={{ bgcolor: "#7469B6" }}>Sign Up</Button>
                    <Typography sx={{ mt: 2 }}>
                        Already have an account? <Link href="/login" sx={{ color: "#7469B6" }}>Log In</Link>
                    </Typography>
                </Box>
            </Box>
            <Footer />
        </>
    );
}

export default SignUp;
