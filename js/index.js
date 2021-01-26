const radioOptions = document.querySelectorAll('.impression__option');
const introductionInputs = document.querySelectorAll('.introduction__input');
const contactInfoInputs = document.querySelectorAll('.contact-info__input');
const visitedSightsBlock = document.querySelector('.visited-sights');
const visitedSightsCheckboxes = document.querySelectorAll('.visited-sights__checkbox');
const emotionsBlock = document.querySelector('.emotions');
const emotionsTextArea = document.querySelector('.emotions__textarea');
const submitButton = document.querySelector('.submit__button');
const modal = document.querySelector('.modal');
const closeSpan = document.querySelector('.close');

radioOptions.forEach((radio) =>
  radio.addEventListener('click', (event) => {
    switch (event.target.id) {
      case 'positive':
        visitedSightsBlock.style.display = 'block';
        emotionsBlock.style.display = 'none';
        break;
      case 'negative':
        emotionsBlock.style.display = 'none';
        visitedSightsBlock.style.display = 'none';
        break;
      case "can't-answer":
        emotionsBlock.style.display = 'block';
        visitedSightsBlock.style.display = 'none';
        break;
    }
  })
);

submitButton.addEventListener('click', (event) => {
  event.preventDefault();
  removeRedundantWarnings();
  let isAnyInputFalse;
  if (!checkIntroductionInputs()) {
    isAnyInputFalse = true;
  }
  if (!checkContactInfo()) {
    isAnyInputFalse = true;
  }
  if (!checkEmotionsTextArea()) {
    showWarningMessage(emotionsTextArea);
    isAnyInputFalse = true;
  }
  if (!checkVisitedSights()) {
    isAnyInputFalse = true;
  }
  if (isAnyInputFalse) {
    return;
  } else {
    showModal();
  }
});

function checkIntroductionInputs() {
  let isCorrect = true;
  introductionInputs.forEach((input) => {
    if (input.value < 3) {
      showWarningMessage(input);
      isCorrect = false;
    }
  });
  return isCorrect;
}

function checkContactInfo() {
  let isCorrect = true;
  let phoneRegExp = /^\+?3?8?(0\d{9})$/;
  let emailRegExp = /\S+@\S+\.\S+/;
  contactInfoInputs.forEach((info) => {
    switch (info.id) {
      case 'phone-number':
        if (!phoneRegExp.test(info.value)) {
          showWarningMessage(info);
          isCorrect = false;
        }
        break;
      case 'email':
        if (!emailRegExp.test(info.value)) {
          showWarningMessage(info);
          isCorrect = false;
        }
        break;
    }
  });
  return isCorrect;
}

function checkVisitedSights() {
  let isOneChecked = false;
  if (!visitedSightsBlock.style.display || visitedSightsBlock.style.display === 'none') {
    return true;
  } else {
    visitedSightsCheckboxes.forEach((checkbox) => {
      if(checkbox.checked) {
        isOneChecked = true;
      }
    });  
  }
  if(!isOneChecked) {
    showWarningMessage(visitedSightsCheckboxes[3])
    return isOneChecked;
  } else {
    return isOneChecked;
  }
}

function checkEmotionsTextArea() {
  if (!emotionsBlock.style.display || emotionsBlock.style.display === 'none') {
    return true;
  } else {
    return emotionsTextArea.value.length > 9;
  }
}

function showModal() {
  modal.style.display = 'block';
}

function removeRedundantWarnings() {
  const redundantIncorrectBorders = document.querySelectorAll('.incorrect-input');
  const redundantIncorrectMessages = document.querySelectorAll('.incorrect-message');
  redundantIncorrectBorders.forEach((element) => {
    element.classList.remove('incorrect-input');
  });
  redundantIncorrectMessages.forEach((message) => {
    message.remove();
  });
}

function showWarningMessage(element) {
  const span = document.createElement('span');
  span.classList.add('incorrect-message');
  span.innerText = 'Please, fill it in';
  element.parentNode.after(span);
  element.classList.add('incorrect-input');
}

closeSpan.addEventListener('click', () => {
  modal.style.display = 'none';
});
