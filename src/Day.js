export function Day({children, className}) {
    return (
        <div className={className}>
          {(children < 10 ? '0' : '') + children}
        </div>
    );
}

export function HDay({children}) {
    return <Day className='unfocus-date'>{children}</Day>
}

export default Day;
