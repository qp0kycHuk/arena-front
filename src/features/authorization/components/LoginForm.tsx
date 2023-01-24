import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ILoginRequest, useLogin } from '@store/auth';
import { useForm } from '@hooks/useForm';
import { useErrorMessage } from '@hooks/useErrorMessage';
import { PhoneInput } from '@components/PhoneInput';
import { Spiner } from '@components/Spiner';
import { Button, Input } from '@features/ui';
import { getUnmaskedValue as getUnmaskedPhone } from '@utils/phoneMaskUtils';

interface ILoginFormProps { }

const initialFormState: ILoginRequest = {
    phone: '',
    password: '',
}

export function LoginForm(props: ILoginFormProps) {
    const [formState, changeHandler] = useForm<ILoginRequest>(initialFormState)
    const [login, { error }] = useLogin()
    const [loading, setLoading] = useState(false)
    const errorMessage = useErrorMessage(error);

    async function submitHundler(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setLoading(true)
        try {
            await login({
                phone: getUnmaskedPhone(formState.phone),
                password: formState.password,
            })
        } catch (err) { }

        setLoading(false)
    }

    return (
        <form onSubmit={submitHundler} className="bg-white dark:bg-black dark:text-white m-auto rounded-3xl px-8 py-10 w-[400px]">
            <h1 className='mb-10 text-2xl font-semibold text-center'>Авторизация</h1>
            {errorMessage && !loading ?
                <div className="p-4 mb-4 text-sm font-semibold rounded bg-red bg-opacity-10 text-red">{errorMessage}</div>
                : null
            }
            <label className='block'>
                <div className="mb-2 text-sm font-medium">Логин</div>
                <PhoneInput className='w-full' name="phone" required onChange={changeHandler} />
            </label>
            <label className='block mt-4'>
                <div className="mb-2 text-sm font-medium">Пароль</div>
                <Input className='w-full' name="password" type="password" required onChange={changeHandler} />
            </label>
            <Button type='submit' className='w-full mt-7' disabled={loading}>
                {loading ? <Spiner /> : 'Войти'}
            </Button>
            <div className="mt-5 text-center">
                Я ещё не зарегистрировался <br />
                <Link to='/registration' className="font-semibold underline text-primary underline-offset-4 decoration-dashed decoration-1">
                    Зарегистрироваться
                </Link>
            </div>
        </form>
    );
}
