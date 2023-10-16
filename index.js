let lengthSlider = document.querySelector('.pass-length input');
let btn = document.querySelector('.btn');
let options = document.querySelectorAll('.option input');
let passwordInput = document.querySelector('.inputbox input');
let passIndicator = document.querySelector('.pass-indicator');
let copyIcon = document.querySelector('.inputbox span');

let characters = {
    lowercase:'abcdefghijklmnopqrstuvwxyz',
    uppercase:'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    number:"0123456789",
    symbols:"^@#$*(){}[]|_+*/<>/.;,:=|~%^&"
}

function genratePassword(){
    let staticPassword = ""
    let passLength = lengthSlider.value;
    let randomPassword = "";
    let duplicate = false;

    options.forEach((option) => {
        if(option.checked){
            if(option.id !=='duplicate' && option.id != 'space'){
                staticPassword = staticPassword+characters[option.id];
            }else if(option.id === 'space'){
                staticPassword = `${staticPassword}`;
            }else{
                duplicate = true;
            }
        }
    })
    for(let i = 0; i<passLength; i++){
        let randomChar = staticPassword[Math.floor(Math.random()*staticPassword.length)];

        if(duplicate){
            !randomPassword.includes(randomChar) || randomChar == " "?(randomPassword = randomPassword+randomChar) : i--;
        }else{
            randomPassword = randomPassword+randomChar;
        }
    }
    passwordInput.value = randomPassword;
}
function updateIndicator(){
    passIndicator.id = lengthSlider.value<=8 ? "week" : lengthSlider.value<=16?"medium":"strong";
}

function updateSlider(){
    document.querySelector('.pass-length .value').innerText = lengthSlider.value;
    if(lengthSlider.value <= 8){
        document.querySelector('.pass-length .value').style.color = "red";
    }else if(lengthSlider.value <= 16){
        document.querySelector('.pass-length .value').style.color = "#f48c06";
    }else{
        document.querySelector('.pass-length .value').style.color = "rgb(0, 131, 96)";
    }
    updateIndicator();
    genratePassword();
}

updateSlider();

function copyPassword(){
    navigator.clipboard.writeText(passwordInput.value);
    copyIcon.innerText = "check";
    setTime(() => {
        copyIcon.innerText = "content_copy";
    },1600)
}

lengthSlider.addEventListener('input', updateSlider);
btn.addEventListener('click', genratePassword);
copyIcon.addEventListener('click', copyPassword);
