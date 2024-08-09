export function button(text, onClick = () => {}){
    return(
        <button onClick={onClick} className="bg-rm-blue-100 hover:bg-rm-blue-200">{text}</button>
    );
}