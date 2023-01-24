import { Button } from '@features/ui';
import { LinksItem } from './LinksItem';
import { ILinksController } from '../../hooks/useLinks';

interface ILinksProps {
    controller: ILinksController
}

export function Links({ controller }: ILinksProps) {

    return (
        <div>
            <div className="space-y-4">
                {controller.links.map((link) => (
                    <LinksItem removeLink={controller.removeLink} updateLink={controller.updateLink} link={link} key={link.id || link.key} />
                ))}
            </div>
            <Button disabled={!controller.isAccessAdd} onClick={controller.addLink} variant='text' className='mt-2'>Добавить ссылку</Button>
        </div>
    );
}
