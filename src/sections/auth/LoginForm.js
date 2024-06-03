import React , { useState } from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import FormProvider from '../../components/hook-form/FormProvider'
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Button, IconButton, InputAdornment, Link, Stack } from '@mui/material';
import { RHFTextField } from '../../components/hook-form';
import { Eye, EyeSlash } from 'phosphor-react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const navigate = useNavigate()

  //validation rules 
  const loginSchema = Yup.object().shape({
    // user_id: Yup.string().required('User id 不能为空').matches(/^[0-9a-zA-Z]*$/, 'User id 必须为字母和数字的组合'),
    user_name:Yup.string().required('User name 不能为空')
  });

  const defaultValues = {
    // user_id:'',
    user_name:''
  };

  const methods = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues
  });

  const {reset, setError, handleSubmit, formState:{errors, isSubmitting, isSubmitSuccessful}}
   = methods;

   const onSubmit = async (data) =>{
    // localStorage.setItem('user_id', data.user_id + Date.now())
    localStorage.setItem('user_name', data.user_name)
    navigate('/index')
        // try {
        //     //submit data to backend
        // } catch (error) {
        //     console.log(error);
        //     reset();
        //     setError('afterSubmit',{
        //         ...error,
        //         message: error.message
        //     })
        // }
   }

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
            {!!errors.afterSubmit && <Alert severity='error'>{errors.afterSubmit.message}</Alert>}
        
        {/* <RHFTextField name='user_id' label='user id'  /> */}
        <RHFTextField name='user_name' label='user name' />
        </Stack>
        {/* <Stack alignItems={'flex-end'} sx={{my:2}}>
            <Link component={RouterLink} to='/auth/reset-password'
             variant='body2' color='inherit' underline='always'>Forgot Password?</Link>
        </Stack> */}
        <Button style={{ marginTop: '18px' }} fullWidth color='inherit' size='large' type='submit' variant='contained'
        sx={{bgcolor:'text.primary', color:(theme)=> theme.palette.mode === 'light' ?
         'common.white':'grey.800',
         '&:hover':{
            bgcolor:'text.primary',
            color:(theme)=> theme.palette.mode === 'light' ? 'common.white':'grey.800',
         }}}>Login</Button>
    </FormProvider>
  )
}

export default LoginForm