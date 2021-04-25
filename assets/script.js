let checkbox = document.querySelector('input[name=checkbox]');

checkbox.addEventListener('click', function(){
    if(this.checked){
        document.getElementById('mainBody').className = 'bodyDark'
        document.getElementById('portfolioTheme').className = 'navbar-brand portfolioDark'
        document.getElementById('homeTheme').className = 'nav-link homeDark'
        document.getElementById('ownNameTheme').className = 'ownName ownNameDark'
    } else {
        document.getElementById('mainBody').className = 'bodyLight'
        document.getElementById('portfolioTheme').className = 'navbar-brand portfolioLight'
        document.getElementById('homeTheme').className = 'nav-link homeLight'
        document.getElementById('ownNameTheme').className = 'ownName ownNameLight'
    }
})