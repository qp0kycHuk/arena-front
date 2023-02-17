import React, { useEffect, useRef, useState } from "react";

export function useDocumentTitle(title?: string, prevailOnUnmount: boolean = false) {
    const defaultTitle = useRef(document.title);

    useEffect(() => {
        if (title) {
            document.title = title + ' ' + process.env.REACT_APP_TITLE_POSTFIX;
        }
    }, [title]);

    useEffect(() => () => {
        if (!prevailOnUnmount) {
            document.title = defaultTitle.current;
        }
    }, [])
};
