import { PhoneInput } from '@components/PhoneInput';
import { Button, Input } from '@features/ui';
import axios from 'axios';
import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { ILoginRequest, useLazyInitCsrfQuery, useLoginMutation } from 'src/store/auth/auth.api';

interface ILoginFormProps {
}

interface IServerError {
    message: string
}

export function LoginForm(props: ILoginFormProps) {
    const [login, { isLoading, isError, error }] = useLoginMutation()
    const [initCsrf] = useLazyInitCsrfQuery()
    const [formState, setFormState] = useState<ILoginRequest>({
        phone: '',
        password: '',
    })

    async function submitHundler(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        try {
            await initCsrf(true)

            const user = await login({
                phone: formState.phone.replace(/\D/g, ''),
                password: formState.password,
            })


        } catch (err) {
            console.log(err);

        }
    }

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event?.target) {
            setFormState((prev) => ({ ...prev, [event.target.name]: event.target.value }))
        }
    }

    let errorMessage = '';


    if (error && ('data' in error)) {
        errorMessage = (error.data as IServerError).message
    }

    return (
        <form onSubmit={submitHundler} className="bg-white dark:bg-black dark:text-white m-auto rounded-3xl px-8 py-10 w-[400px]">
            <h1 className='mb-10 text-2xl font-semibold text-center'>Авторизация</h1>
            {errorMessage ?
                <div className="bg-red bg-opacity-10 text-red rounded p-4 text-sm font-semibold mb-4">{errorMessage}</div>
                :
                null
            }
            <label className='block'>
                <div className="mb-2 text-sm font-medium">Логин</div>
                <PhoneInput className='w-full' name="phone" required onChange={changeHandler} />
            </label>
            <label className='block mt-4'>
                <div className="mb-2 text-sm font-medium">Пароль</div>
                <Input className='w-full' name="password" type="password" required onChange={changeHandler} />
            </label>
            <Button className='w-full mt-7'>Войти</Button>
            <div className="mt-5 text-center">
                Я ещё не зарегистрировался <br />
                <Link to='/registration' className="font-semibold underline text-primary underline-offset-4 decoration-dashed decoration-1">
                    Зарегистрироваться
                </Link>
            </div>
        </form>
    );
}
