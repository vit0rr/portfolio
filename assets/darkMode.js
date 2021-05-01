const rootDataset = document.documentElement.dataset;

document.onclick = () => {
    const inDarkMode = (rootDataset.theme === 'dark');
    rootDataset.theme = inDarkMode ? '' : 'dark';
}

(function () {

    const
        LocalStorageName = 'thema'
        , checkbox = document.querySelector('input[name=checkbox]')
        , el_mainBody = document.getElementById('mainBody')
        , el_portfolioTheme = document.getElementById('portfolioTheme')
        , el_homeTheme = document.getElementById('homeTheme')
        , el_ownNameTheme = document.getElementById('ownNameTheme')
        , el_pTheme = document.getElementById('pTheme')
        , el_ownInfo = document.getElementById('ownInfo')
        , el_projetosTheme = document.getElementById('projetosTheme')
        , el_cardTheme = document.getElementById('cardTheme')
        , el_cardTheme1 = document.getElementById('cardTheme1')
        , el_cardTheme2 = document.getElementById('cardTheme2')
        , el_cardTheme3 = document.getElementById('cardTheme3')
        , el_cardTheme4 = document.getElementById('cardTheme4')
        , el_cardTitleTheme = document.getElementById('cardTitleTheme')
        , el_cardTitleTheme1 = document.getElementById('cardTitleTheme1')
        , el_cardTitleTheme2 = document.getElementById('cardTitleTheme2')
        , el_cardTitleTheme3 = document.getElementById('cardTitleTheme3')
        , el_cardTitleTheme4 = document.getElementById('cardTitleTheme4')
        , el_cardTextTheme = document.getElementById('cardTextTheme')
        , el_cardTextTheme1 = document.getElementById('cardTextTheme1')
        , el_cardTextTheme2 = document.getElementById('cardTextTheme2')
        , el_cardTextTheme3 = document.getElementById('cardTextTheme3')
        , el_cardTextTheme4 = document.getElementById('cardTextTheme4')
        , el_textMutedTheme = document.getElementById('textMutedTheme')
        , el_textMutedTheme1 = document.getElementById('textMutedTheme1')
        , el_textMutedTheme2 = document.getElementById('textMutedTheme2')
        , el_textMutedTheme3 = document.getElementById('textMutedTheme3')
        , el_textMutedTheme4 = document.getElementById('textMutedTheme4')
        , el_textMutedLinkTheme = document.getElementById('textMutedLinkTheme')
        , el_textMutedLinkTheme2 = document.getElementById('textMutedLinkTheme2')
        , el_textMutedLinkTheme3 = document.getElementById('textMutedLinkTheme3')
        , el_textMutedLinkTheme4 = document.getElementById('textMutedLinkTheme4')
        , el_artigosUlTheme = document.getElementById('artigosUlTheme')
        , el_emDesenvolvimento = document.getElementById('emDesenvolvimento')
        , el_artigosTitleTheme = document.getElementById('artigosTitleTheme')
        , el_hrTheme = document.getElementById('hrTheme')
        ;
    function setTheme(darkMode) {
        if (darkMode) {
            el_mainBody.className = 'bodyDark'
            el_portfolioTheme.className = 'navbar-brand portfolioDark'
            el_homeTheme.className = 'nav-link homeDark'
            el_ownNameTheme.className = 'ownName ownNameDark'
            el_pTheme.className = 'pDark'
            el_ownInfo.className = 'ownInfoItemsDark'
            el_projetosTheme.className = 'centralizar projetosDark'
            el_cardTheme.className = 'card bg-dark'
            el_cardTheme1.className = 'card bg-dark'
            el_cardTheme2.className = 'card bg-dark'
            el_cardTheme3.className = 'card bg-dark'
            el_cardTheme4.className = 'card bg-dark'
            el_cardTitleTheme.className = 'card-title pDark'
            el_cardTitleTheme1.className = 'card-title pDark'
            el_cardTitleTheme2.className = 'card-title pDark'
            el_cardTitleTheme3.className = 'card-title pDark'
            el_cardTitleTheme4.className = 'card-title pDark'
            el_cardTextTheme.className = 'card-text pDark'
            el_cardTextTheme1.className = 'card-text pDark'
            el_cardTextTheme2.className = 'card-text pDark'
            el_cardTextTheme3.className = 'card-text pDark'
            el_cardTextTheme4.className = 'card-text pDark'
            el_textMutedTheme.className = 'text-muted pDark'
            el_textMutedTheme1.className = 'text-muted pDark'
            el_textMutedTheme2.className = 'text-mutd pDark'
            el_textMutedTheme3.className = 'text-muted pDark'
            el_textMutedTheme4.className = 'text-muted pDark'
            el_textMutedLinkTheme.className = 'text-muted pDark'
            el_textMutedLinkTheme2.className = 'text-muted pDark'
            el_textMutedLinkTheme3.className = 'text-muted pDark'
            el_textMutedLinkTheme4.className = 'text-muted pDark'
            el_artigosTitleTheme.className = 'centralizar pDark'
            el_artigosUlTheme.className = 'pDark'
            el_emDesenvolvimento.className = 'pDark'
            el_hrTheme.className = 'hrDark'
        } else {
            el_mainBody.className = 'bodyLight'
            el_portfolioTheme.className = 'navbar-brand portfolioLight'
            el_homeTheme.className = 'nav-link homeLight'
            el_ownNameTheme.className = 'ownName ownNameLight'
            el_pTheme.className = 'pLight'
            el_ownInfo.className = 'ownInfoItemsLight'
            el_projetosTheme.className = 'centralizar projetosLight'
            el_cardTheme.className = 'card bg-light'
            el_cardTheme1.className = 'card bg-light'
            el_cardTheme2.className = 'card bg-light'
            el_cardTheme3.className = 'card bg-light'
            el_cardTheme4.className = 'card bg-light'
            el_cardTitleTheme.className = 'card-title pLight'
            el_cardTitleTheme1.className = 'card-title pLight'
            el_cardTitleTheme2.className = 'card-title pLight'
            el_cardTitleTheme3.className = 'card-title pLight'
            el_cardTitleTheme4.className = 'card-title pLight'
            el_cardTextTheme.className = 'card-text pLight'
            el_cardTextTheme1.className = 'card-text pLight'
            el_cardTextTheme2.className = 'card-text pLight'
            el_cardTextTheme3.className = 'card-text pLight'
            el_cardTextTheme4.className = 'card-text pLight'
            el_textMutedTheme.className = 'text-muted pLight'
            el_textMutedTheme1.className = 'text-muted pLight'
            el_textMutedTheme2.className = 'text-muted pLight'
            el_textMutedTheme3.className = 'text-muted pLight'
            el_textMutedTheme4.className = 'text-muted pLight'
            el_textMutedLinkTheme.className = 'text-muted pLight'
            el_textMutedLinkTheme2.className = 'text-muted pLight'
            el_textMutedLinkTheme3.className = 'text-muted pLight'
            el_textMutedLinkTheme4.className = 'text-muted pLight'
            el_artigosTitleTheme.className = 'centralizar pLight'
            el_artigosUlTheme.className = 'pLight'
            el_emDesenvolvimento.className = 'pLight'
            el_hrTheme.className = 'hrLight'
        }
    }
    checkbox.checked = JSON.parse(localStorage.getItem(LocalStorageName)) ?? false  // default value
    setTheme(checkbox.checked)

    checkbox.addEventListener('click', function () {
        setTheme(checkbox.checked)
        localStorage.setItem(LocalStorageName, JSON.stringify(checkbox.checked))
    })
})()