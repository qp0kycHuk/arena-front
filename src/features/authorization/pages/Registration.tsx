import { useDocumentTitle } from '@hooks/useDocumentTitle';
import { RegistrationForm } from '../components/RegistrationForm';

interface IRegistrationProps { }

export function Registration(props: IRegistrationProps) {
    useDocumentTitle('Зарегистрироваться')
    
    return (
        <RegistrationForm />
    );
};