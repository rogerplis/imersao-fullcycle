import React, { PropsWithChildren } from 'react';

export type TitleProps = {
    className?: string;
}

function Title(props: PropsWithChildren<TitleProps>){
    
    return <h1 className={`text-left text-[24px] font-semibold ${props.className}`} >{props.children}</h1>
}

export default Title;