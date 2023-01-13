import { phoneMask } from '@const/maskExpressions';
import { Button, Input } from '@features/ui';
import { MaskedInput } from '@features/ui/components/Input';
import axios from 'axios';
import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { ILoginRequest, useLoginMutation } from 'src/store/auth/auth.api';

interface ILoginFormProps {
}

export function LoginForm(props: ILoginFormProps) {
    const [login, { isLoading }] = useLoginMutation()
    const [formState, setFormState] = useState<ILoginRequest>({
        phone: '',
        password: '',
    })

    async function submitHundler(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        try {
            await axios.get(process.env.REACT_APP_API_URL + 'sanctum/csrf-cookie')
                .then((response) => {
                    console.log(response);

                })
            const user = await login({
                phone: '79184284848',
                password: '12345678'
            })
            console.log(user);

        } catch (err) {
            console.log(err);

        }
    }

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event?.target) {
            setFormState((prev) => ({ ...prev, [event.target.name]: event.target.value }))
        }
    }

    return (
        <form onSubmit={submitHundler} className="bg-white dark:bg-black dark:text-white m-auto rounded-3xl px-8 py-10 w-[400px]">
            <h1 className='text-2xl text-center font-semibold mb-10'>Авторизация</h1>

            <label className='block'>
                <div className="text-sm font-medium mb-2">Логин</div>
                <MaskedInput mask={phoneMask} className='w-full' name="phone" required onChange={changeHandler} />
            </label>
            <label className='block mt-4'>
                <div className="text-sm font-medium mb-2">Пароль</div>
                <Input className='w-full' name="password" type="password" required onChange={changeHandler} />
            </label>
            <Button className='mt-7 w-full'>Войти</Button>
            <div className="mt-5 text-center">
                Я ещё не зарегистрировался <br />
                <Link to='/registration' className="font-semibold text-primary underline underline-offset-4 decoration-dashed decoration-1">
                    Зарегистрироваться
                </Link>
            </div>
        </form>
    );
}
