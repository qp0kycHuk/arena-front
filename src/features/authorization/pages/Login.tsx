import { useDocumentTitle } from '@hooks/useDocumentTitle';
import { LoginForm } from '../components/LoginForm';

interface ILoginProps { }

export function Login(props: ILoginProps) {
    useDocumentTitle('Войти')
    
    return (
        <LoginForm />
    );
};