// modal
const modal = document.querySelector("#sign-in-success-modal");
const modalMessage = document.querySelector(".modal-message");
const modalContent = document.querySelector(".modal-content");
const closeModalBtn = document.querySelector(".close");
const openModalBtn = document.querySelector("#open-modal");


closeModalBtn.addEventListener("click", () => {
    modal.classList.remove("active-modal");
});

openModalBtn.addEventListener("click", () => {
    modal.classList.add("active-modal");
    modalMessage.innerText = "modal open from button click";
});

modal.addEventListener("click", (e) => {
    console.log(e.target);

    // მოდალის ელემენტზე (ნაცრისფერ ბლოკზე) კლიკი როცა ხდება, დავხუროთ მოდალი
    if (e.target === modal) {
        modal.classList.remove("active-modal");
    }
});

// form
const form = document.querySelector("form");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const password2Input = document.querySelector('#password2')
const idNumber = document.querySelector('#id-number')

function addError(parent) {
    parent.classList.remove("success");
    parent.classList.add("error");
}

function checkPassword() {
    const parent = passwordInput.parentElement;
    if (passwordInput.value.length < 8) {
        addError(parent);
        parent.querySelector(".error-message").innerText =
            "password must be at least 8 char";
        return false;

    }   else {
        parent.classList.remove("error");
        parent.classList.add("success");
        parent.querySelector(".error-message").innerText = "";
        return true;
    }
}

function confirmPassword() {
    const parent = password2Input.parentElement
    if (password2Input.value !== passwordInput.value) {
        addError(parent)
        parent.querySelector('.error-message').innerText =
            "passwords do not match ! "
        return false
    } else {
        parent.classList.remove('error')
        parent.classList.add('success')
        parent.querySelector('.error-message').innerText = '';
        return true
    }
}



function confirmIdNumber() {
    let regex = /^[0-9]+$/
    const parent = idNumber.parentElement
    if (idNumber.value === '') {
        addError(parent)
        parent.querySelector('.error-message').innerText =
            'id-number is required'
        return false;
    } else if (!regex.test(idNumber.value)) {
        addError(parent)
        parent.querySelector('.error-message').innerText =
            'only numbers are allowed'
        return false
    } else if(idNumber.value.length < 11) {
        addError(parent)
        parent.querySelector('.error-message').innerText =
            'it must be 11 character'
        return false
    }
    else {
        parent.classList.remove('error')
        parent.classList.add('success')
        parent.querySelector('.error-message').innerText = ''
        return true
    }
}

function checkEmail() {
    const parent = emailInput.parentElement;

    if (emailInput.value === "") {
        addError(parent);
        parent.querySelector(".error-message").innerText = "email is required";
        return false;
    } else if (!/@academy.edu.ge$/.test(emailInput.value)) {
        addError(parent);
        parent.querySelector(".error-message").innerText =
            "email ending must be 'academy.edu.ge'";
        return false;
    } else {
        parent.classList.remove("error");
        parent.classList.add("success");
        parent.querySelector(".error-message").innerText = "";
        return true;
    }
}

emailInput.addEventListener("input", checkEmail);
passwordInput.addEventListener("input", checkPassword);
password2Input.addEventListener('input', confirmPassword)
idNumber.addEventListener('input', confirmIdNumber)

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const isPasswordCorrect = checkPassword();
    const isEmailCorrect = checkEmail();
    const confirmPassword = confirmPassword();
    const confirmIdNumber = confirmIdNumber()

    if (isEmailCorrect && isPasswordCorrect && confirmPassword && confirmIdNumber) {
        // form.submit();
        modalMessage.innerText = "form sent successfully";
        modal.classList.add("active-modal");
    }
});