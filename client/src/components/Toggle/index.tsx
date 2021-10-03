import { useEffect } from 'react';
import _  from "../../themes"
 
function Toggle() {
    let theme = localStorage.getItem('theme');

    const handleOnClick = () => {
        if (localStorage.getItem('theme') === 'theme-dark') {
            _.setTheme('theme-light');
        } else {
            _.setTheme('theme-dark');
        }
    }

    useEffect(() => {
        if (localStorage.getItem('theme') === 'theme-dark') {
        } else if (localStorage.getItem('theme') === 'theme-light') {
        }
    }, [theme])

    return (
        <span onClick={handleOnClick}> change theme</span>
    )
}
export default Toggle;