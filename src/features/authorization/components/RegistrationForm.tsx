import { Button, Input } from '@features/ui';
import { Link } from 'react-router-dom';
import { PhoneInput } from '@components/PhoneInput';
import { IRegisterRequest, useLazyInitCsrfQuery, useRegisterMutation } from '@store/auth';
import { useMemo, useState } from 'react';
import { useForm } from '@hooks/useForm';
import { getUnmaskedValue as getUnmaskedPhone } from '@utils/phoneMaskUtils';
import { Spiner } from '@components/Spiner';

interface IRegistrationFormProps {
}

const initialFormState: IRegisterRequest = {
    phone: '',
    first_name: '',
    last_name: '',
    password: '',
    password_confirmation: '',
}

export function RegistrationForm(props: IRegistrationFormProps) {
    const [register, { error }] = useRegisterMutation()
    const [initCsrf] = useLazyInitCsrfQuery()
    const [loading, setLoading] = useState(false)

    const [formState, changeHandler] = useForm<IRegisterRequest>(initialFormState)

    let errorMessage = useMemo(() => {
        if (error && ('data' in error)) {
            return (error.data as IServerError).message
        } else {
            return null
        }
    }, [error]);

    async function submitHundler(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setLoading(true)
        try {
            await initCsrf(true)
            await register({
                ...formState,
                phone: getUnmaskedPhone(formState.phone),
            })

        } catch (err) {
        }
        setLoading(false)

    }

    return (
        <form onSubmit={submitHundler} className="bg-white dark:bg-black dark:text-white m-auto rounded-3xl px-8 py-10 w-[400px]">
            <h1 className='mb-10 text-2xl font-semibold text-center'>Регистрация</h1>
            {errorMessage && !loading ?
                <div className="p-4 mb-4 text-sm font-semibold rounded bg-red bg-opacity-10 text-red">{errorMessage}</div>
                :
                null
            }
            <div className="space-y-4">
                <label className='block'>
                    <div className="mb-2 text-sm font-medium">Телефон</div>
                    <PhoneInput className='w-full' type='tel' required onChange={changeHandler} name="phone" />
                </label>
                <label className='block'>
                    <div className="mb-2 text-sm font-medium">Имя</div>
                    <Input className='w-full' type='text' required onChange={changeHandler} name="first_name" />
                </label>
                <label className='block'>
                    <div className="mb-2 text-sm font-medium">Фамилия</div>
                    <Input className='w-full' type='text' required onChange={changeHandler} name="last_name" />
                </label>
                <label className='block'>
                    <div className="mb-2 text-sm font-medium">Пароль</div>
                    <Input className='w-full' type='password' required onChange={changeHandler} name="password" />
                </label>
                <label className='block'>
                    <div className="mb-2 text-sm font-medium">Повторите пароль</div>
                    <Input className='w-full' type='password' required onChange={changeHandler} name="password_confirmation" />
                </label>
            </div>
            <Button className='w-full mt-7' disabled={loading}>
                {loading ? <Spiner /> : 'Зарегистрироваться'}
            </Button>
            <div className="mt-5 text-center">
                Уже есть аккаунт <br />
                <Link to='/login' className="font-semibold underline text-primary underline-offset-4 decoration-dashed decoration-1">
                    Войти
                </Link>
            </div>
        </form>
    );
}
