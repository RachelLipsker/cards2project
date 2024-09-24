import React, { useEffect } from 'react'
import { useCurrentUser } from '../providers/UserProvider'
import useUsers from '../hooks/useUsers';
import useForm from '../../forms/hooks/useForm';
import mapUserToModel from '../helpers/normalization/mapUserToModel';
import { Navigate } from 'react-router-dom';
import ROUTES from '../../routes/routesModel';
import { Container } from '@mui/material';
import UpdateUserForm from '../components/UpdateUserForm';
import updateSchema from '../models/updateSchema';
import initialUpdateForm from '../helpers/initialForms/initialUpdateForm';

export default function EditUser() {
    const { user } = useCurrentUser();
    const { getUserById, profile, handleUpdateUser } = useUsers();
    const {
        data,
        errors,
        setData,
        handleChange,
        handleReset,
        validateForm,
        onSubmit,
    } = useForm(initialUpdateForm, updateSchema, (data) => {
        handleUpdateUser(user._id, data)
    });

    useEffect(() => {
        if (profile) {
            setData(mapUserToModel(profile));
        } else {
            getUserById(user._id);
        }
    }, [profile]);

    if (!user) return <Navigate to={ROUTES.ROOT} replace />

    return (
        <>
            <Container
                sx={{
                    paddingTop: 8,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <UpdateUserForm
                    onSubmit={onSubmit}
                    onReset={handleReset}
                    validateForm={validateForm}
                    title={"edit user profile"}
                    errors={errors}
                    data={data}
                    onInputChange={handleChange}
                />
            </Container>
        </>)
}
