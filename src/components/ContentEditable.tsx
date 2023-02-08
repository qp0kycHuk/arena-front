import { useEffect, useRef } from "react";


interface IContentEditableProps {
    value: string,
    onChange?(e: React.ChangeEvent<HTMLDivElement>): any
    className?: string
}
export function ContentEditable({ onChange, value, className, ...props }: IContentEditableProps) {
    const textareaEl = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (value && textareaEl.current) {
            textareaEl.current.textContent = value;
        }
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLDivElement>) => {
        if (textareaEl.current) {
            textareaEl.current.textContent = e.target.textContent;
        }
        
        onChange?.(e);
    };

    return (
        <div
            {...props}
            className={className}
            ref={textareaEl}
            contentEditable
            suppressContentEditableWarning
            onInput={handleChange}
        ></div>
    );
}