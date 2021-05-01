const rootDataset = document.documentElement.dataset;

document.onclick = () => {
    const inDarkMode = (rootDataset.theme === 'dark');
    rootDataset.theme = inDarkMode ? '' : 'dark';
}

(function () {

    const
        LocalStorageName = 'thema'
        , checkbox = document.querySelector('input[name=checkbox]')
        , el_bodyTheme = document.getElementById('bodyTheme')
        , el_articleTheme = document.getElementById('articleTheme')
        , el_olTheme = document.getElementById('olTheme')
        ;
    function setTheme(darkMode) {
        if (darkMode) {
            el_olTheme.className = 'pDark'
            el_bodyTheme.className = 'bodyDark'
            el_articleTheme.className = 'col-sm-6 container-md pDark'
        } else {
            el_olTheme.className = 'pLight'
            el_bodyTheme.className = 'bodyLight'
            el_articleTheme.className = 'col-sm-6 container-md pLight'
        }
    }
    checkbox.checked = JSON.parse(localStorage.getItem(LocalStorageName)) ?? false  // default value
    setTheme(checkbox.checked)

    checkbox.addEventListener('click', function () {
        setTheme(checkbox.checked)
        localStorage.setItem(LocalStorageName, JSON.stringify(checkbox.checked))
    })
})()