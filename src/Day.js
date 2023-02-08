export function Day({children, className, onClick}) {
    const handleClick = function(e) {
        e.preventDefault();
        onClick(children);
    };

    return (
        <a className={className} 
            onClick={handleClick}
            href="#">
          {/*(children < 10 ? '0' : '') +*/ children}
        </a>
    );
}

export function HDay({children, onClick}) {
    return <Day className='unfocus-date' onClick={onClick}>{children}</Day>
}

export default Day;
