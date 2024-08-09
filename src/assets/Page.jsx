import { inputField } from './Inputfield';
import { button } from './Button';
export function page(placeholder, value, setValue, text, onClick = () => {}){
    return (
        <div className="flex flex-col items-center">
            {inputField(placeholder, value, setValue)}
            {button(text, onClick)}
        </div>
    );
}