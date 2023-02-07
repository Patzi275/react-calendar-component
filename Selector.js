export function Day({children, className}) {
    return (
        <a className={className}
            href="#">
          {/*(children < 10 ? '0' : '') +*/ children}
        </a>
    );
}

export function HDay({children}) {
    return <Day className='unfocus-date'>{children}</Day>
}

export default Day;
