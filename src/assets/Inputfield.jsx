export function inputField(placeholder, value, setValue) {
    return(
        <input type="text" placeholder={placeholder} value={value} onChange={(e) => setValue(e.target.value)}/>
    );
}