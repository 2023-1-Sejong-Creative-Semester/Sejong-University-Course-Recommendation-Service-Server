let checkboxData;

window.onload = () => {
    let C = document.getElementById("C");
    let Cpp = document.getElementById("C++");
    let Java = document.getElementById("Java");
    let SWIFT = document.getElementById("SWIFT");
    let JavaScript = document.getElementById("JavaScript");
    let Python = document.getElementById("Python");
    let R = document.getElementById("R");
    let Kotlin = document.getElementById("Kotlin");
    

    const onChangeCheckbox = (e) => {
        let {name, checked} = e.target;
        console.log(name, checked);
        checkboxData = {
            ...checkboxData,
            [name]: checked,
        }
    
        console.log(checkboxData);
    }

    C.addEventListener('change', onChangeCheckbox);
    Cpp.addEventListener('change', onChangeCheckbox);
    Java.addEventListener('change', onChangeCheckbox);
    SWIFT.addEventListener('change', onChangeCheckbox);
    JavaScript.addEventListener('change', onChangeCheckbox);
    Python.addEventListener('change', onChangeCheckbox);
    R.addEventListener('change', onChangeCheckbox);
    Kotlin.addEventListener('change', onChangeCheckbox);


}
