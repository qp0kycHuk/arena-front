import * as React from 'react';
import { Button, Input } from '@features/ui';
import background from '@assets/img/auth-background.jpg';

interface ILoginProps {

}

export function Login(props: ILoginProps) {

    return (
        <div className='flex flex-grow bg-cover' style={{ backgroundImage: 'url(' + background + ')' }}>
            <div className="bg-white m-auto rounded-3xl px-8 py-10 w-[400px]">
                <h1 className='text-2xl text-center font-semibold mb-10'>Авторизация</h1>

                <label className='block'>
                    <div className="text-sm font-medium mb-2">Логин</div>
                    <Input className='w-full' name="login" />
                </label>
                <Button className='mt-7 w-full'>Войти</Button>
                <div className="mt-5 text-center">
                    Я ещё не зарегистрировался <br />
                    <a href='#' className="font-semibold text-primary underline underline-offset-4 decoration-dashed decoration-1">Зарегистрироваться</a>
                </div>
            </div>
        </div>
    );
};