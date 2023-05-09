const recordContainer = document.querySelector('.record-container');
const phoneNumber = document.getElementById('contact-num');
const imageInput = document.getElementById('UploadImg');
const imgPreview = document.getElementById('imgPreview');
const cancelBtn = document.getElementById('cancel-btn');
const deleteBtn = document.getElementById('delete-btn');
const clearBtn = document.getElementById('clear-btn');
const addBtn = document.getElementById('submit-btn');
const letters = document.getElementById('name');
const names = document.getElementById('name');
const status = document.getElementById('address');

addBtn.addEventListener('click', function () {
    if (addBtn.textContent == 'Save') {
        imgPreview.style.display = "none";
        const id = addBtn.getAttribute('updatedId');
        let names = document.getElementById('name').value;
        let status = document.getElementById('address').value;
        let phNumbers = document.getElementById('contact-num').value;
        let images = document.getElementById('UploadImg');
        let letter = names.charAt(0);
        const file = images.files[0];
        const fileReader = new FileReader();
        if (images.value == '') {
            let json = JSON.stringify({ letter, names, status, phNumbers });
            localStorage.setItem(id, json);
            showAll();
        } else {
            fileReader.readAsDataURL(file);
            fileReader.addEventListener('load', () => {
                const url = fileReader.result;
                let json = JSON.stringify({ names, status, phNumbers, url });
                localStorage.setItem(id, json);
                showAll();
            })
        }
        clearInputFields();
        addBtn.textContent = 'Add Contact';
    } else {
        showAll();
        add();
        clearInputFields();
    }
});

cancelBtn.addEventListener('click', function () {
    clearInputFields();
});

clearBtn.addEventListener('click', function () {
    clearInputFields();
    localStorage.clear();
    showAll();
});
//Previewing images and not showing letters.
imageInput.addEventListener('change', function () {
    let images = document.getElementById('UploadImg');
    const file = images.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.addEventListener('load', () => {
        const url = fileReader.result
        if (url == undefined) {
            imgPreview.style.display = "none";
        } else {
            imgPreview.style.display = "block";
            imgPreview.src = url;
        }
    });
});

const showAll = function () {
    let body = document.createElement('tbody');
    body.id = 'recordTableBody';

    for (let index = 0; index < localStorage.length; index++) {
        const id = localStorage.key(index);
        let { names, phNumbers, status, url } = JSON.parse(localStorage.getItem(id));
        let namesTd = document.createElement('td');
        let statusTd = document.createElement('td');
        let phNumbersTd = document.createElement('td');
        let actionTdEdit = document.createElement('td');
        let actionTdDelete = document.createElement('td');
        let btnDelete = document.createElement('button');
        let btnEdit = document.createElement('button');
        let row = document.createElement('tr');

        btnEdit.textContent = 'Edit';
        btnEdit.id = 'btnEditId';
        btnEdit.className = 'btnEditClass';
       
        btnEdit.onclick = function () {
            
            addBtn.setAttribute('updatedId', id);
            if (imgPreview.style.display === "none") {
                imgPreview.style.display = "block";
            }
            if (url == undefined) {
                imgPreview.style.display = "none";
            } else {
                imgPreview.src = url;
            }
            if (btnEdit.textContent == 'Edit') {
                let namesInput = document.getElementById('name');
                let statusInput = document.getElementById('address');
                namesInput.value = names;
                statusInput.value = status;
                phoneNumber.value = phNumbers;
                addBtn.textContent = 'Save';
                btnEdit.style.display = 'none';
                
            };
        }

        btnDelete.textContent = 'Delete';
        btnDelete.id = 'btnDeleteId'
        btnDelete.onclick = function () {
            if (confirm(`Do you really want to delete ${names}, are you sure?`)) {
                remove(id);
            } else {
            }
        };

        namesTd.textContent = names;
        statusTd.textContent = status;
        phNumbersTd.textContent = phNumbers;

        let letterTd = document.createElement('td');
        letterTd.textContent = names.charAt(0).toUpperCase();
        letterTd.id = 'letterId';
        letterTd.style.backgroundColor = assingColors();
        row.appendChild(letterTd);

        if (url == undefined) {
            imgPreview.style.display = "none";
        } else {
            let imgTdInput = document.createElement('img');
            imgTdInput.src = url;
            imgTdInput.id = 'mainImg';
            row.removeChild(letterTd);
            row.appendChild(imgTdInput);
        }

        if (addBtn.textContent = 'Add Contact') {
            btnEdit.style.display = "block";
        }

        actionTdEdit.appendChild(btnEdit);
        actionTdDelete.appendChild(btnDelete);
        row.appendChild(namesTd);
        row.appendChild(statusTd);
        row.appendChild(phNumbersTd);
        row.appendChild(actionTdEdit);
        row.appendChild(actionTdDelete);
        body.appendChild(row);

        btnEdit.setAttribute('disabled', true)
    }
    document.getElementById('recordTableBody').replaceWith(body);

};

const add = function () {
    let names = document.getElementById('name').value;
    let status = document.getElementById('address').value;
    let phNumbers = document.getElementById('contact-num').value;
    let images = document.getElementById('UploadImg');
    let letter = names.charAt(0);
    const file = images.files[0];
    const fileReader = new FileReader();
    if (images.value == '') {
        let json = JSON.stringify({ letter, names, status, phNumbers });
        localStorage.setItem((localStorage.length) + 1, json);
        showAll();
    } else {
        fileReader.readAsDataURL(file);
        fileReader.addEventListener('load', () => {
            const url = fileReader.result
            let json = JSON.stringify({ letter, names, status, phNumbers, url });
            localStorage.setItem((localStorage.length) + 1, json);
            showAll();
        })
    }
};

const remove = function (id) {
    localStorage.removeItem(id);
    showAll();
};

const assingColors = function () {
    const color = [
        '#000000',
        '#A52A2A',
        '#0000FF',
        '#5F9EA0',
        '#D2691E',
        '#00008B',
        '#2F4F4F',
        '#FFD700',
        '#800000',
        '#191970',
        '#FFFF00',
        '#EE82EE',
        '#008080',
    ];
    return color[Math.floor(Math.random() * color.length)]
}

const clearInputFields = function () {
    names.value = '';
    status.value = '';
    phoneNumber.value = '';
    imageInput.value = '';
    imgPreview.src = '';
    imgPreview.style.display = 'none';
    addBtn.textContent = 'Add Contact';
    showAll();
}

window.onload = showAll();