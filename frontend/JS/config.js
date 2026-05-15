const menuBtn = document.getElementById('menuBtn');
const dropdown = document.getElementById('dropdown');

menuBtn.addEventListener('click', () => {
    dropdown.classList.toggle('show');
});

window.addEventListener('click', (e) => {

    if (!menuBtn.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.classList.remove('show');
    }

});


const darkMode = document.getElementById('darkMode');

if(localStorage.getItem('theme') === 'light'){
    document.body.classList.add('light-mode');
    darkMode.checked = true;
}

darkMode.addEventListener('change', () => {

    document.body.classList.toggle('light-mode');

    if(document.body.classList.contains('light-mode')){
        localStorage.setItem('theme', 'light');
    } else {
        localStorage.setItem('theme', 'dark');
    }

});


const deleteBtn = document.getElementById('deleteBtn');

deleteBtn.addEventListener('click', () => {

    const confirmar = confirm(
        'Tem certeza que deseja excluir sua conta?'
    );

    if(confirmar){
        alert('Conta excluída com sucesso!');
    }

});