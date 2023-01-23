import * as React from 'react';

interface ISpinerProps {
}

export function Spiner(props: ISpinerProps) {
    return (<div className='border-r-transparent animate-spin inline-block w-4 h-4 border-[currentColor] border-2 rounded-full'></div>);
}
