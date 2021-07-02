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
        , el_JobsTitleTheme = document.getElementById('JobsTitleTheme')
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
        , el_cardTheme5 = document.getElementById('cardTheme5')
        , el_cardTheme6 = document.getElementById('cardTheme6')
        , el_cardThemeJobs1 = document.getElementById('cardThemeJobs1')
        , el_cardThemeJobs2 = document.getElementById('cardThemeJobs2')
        , el_cardTitleTheme = document.getElementById('cardTitleTheme')
        , el_cardTitleTheme1 = document.getElementById('cardTitleTheme1')
        , el_cardTitleTheme2 = document.getElementById('cardTitleTheme2')
        , el_cardTitleTheme3 = document.getElementById('cardTitleTheme3')
        , el_cardTitleTheme4 = document.getElementById('cardTitleTheme4')
        , el_cardTitleTheme5 = document.getElementById('cardTitleTheme5')
        , el_cardTitleTheme6 = document.getElementById('cardTitleTheme6')
        , el_cardTitleThemeJobs1 = document.getElementById('cardTitleThemeJobs1')
        , el_cardTitleThemeJobs2 = document.getElementById('cardTitleThemeJobs2')
        , el_cardTextTheme = document.getElementById('cardTextTheme')
        , el_cardTextTheme1 = document.getElementById('cardTextTheme1')
        , el_cardTextTheme2 = document.getElementById('cardTextTheme2')
        , el_cardTextTheme3 = document.getElementById('cardTextTheme3')
        , el_cardTextTheme4 = document.getElementById('cardTextTheme4')
        , el_cardTextTheme5 = document.getElementById('cardTextTheme5')
        , el_cardTextTheme6 = document.getElementById('cardTextTheme6')
        , el_cardTextThemeJobs1 = document.getElementById('cardTextThemeJobs1')
        , el_cardTextThemeJobs2 = document.getElementById('cardTextThemeJobs2')
        , el_artigosTitleTheme = document.getElementById('artigosTitleTheme')
        , el_hrTheme = document.getElementById('hrTheme')
        , el_hrTheme1 = document.getElementById('hrTheme1')
        , el_artigosTheme = document.getElementById('artigosTheme')
        , el_notaTheme = document.getElementById('notaTheme')
        , el_notaCardTheme = document.getElementById('notaCardTheme')
        , el_fabGitTheme1 = document.getElementById('fabGitTheme1')
        , el_fabGitTheme2 = document.getElementById('fabGitTheme2')
        , el_fabGitTheme3 = document.getElementById('fabGitTheme3')
        , el_fabGitTheme4 = document.getElementById('fabGitTheme4')
        , el_fabGitTheme5 = document.getElementById('fabGitTheme5')
        , el_fabGitTheme6 = document.getElementById('fabGitTheme6')
        , el_fabGitTheme7 = document.getElementById('fabGitTheme7')
        , el_fabGlobeTheme1 = document.getElementById('fabGlobeTheme1')
        , el_fabGlobeTheme2 = document.getElementById('fabGlobeTheme2')
        , el_fabGlobeTheme3 = document.getElementById('fabGlobeTheme3')
        , el_fabGlobeTheme4 = document.getElementById('fabGlobeTheme4')
        , el_fabGlobeTheme5 = document.getElementById('fabGlobeTheme5')
        , el_fabGlobeTheme6 = document.getElementById('fabGlobeTheme6')
        , el_fabGlobeThemeJobs1 = document.getElementById('fabGlobeThemeJobs1')
        , el_fabGlobeThemeJobs2 = document.getElementById('fabGlobeThemeJobs2')
        , el_navTheme = document.getElementById('navTheme')
        , el_sunDarkmode = document.getElementById('sunDarkmode')
        ;
    function setTheme(darkMode) {
        if (darkMode) {
            el_mainBody.className = 'bodyDark'
            el_JobsTitleTheme.className = 'pDark centralizar'
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
            el_cardTheme5.className = 'card bg-dark'
            el_cardTheme6.className = 'card bg-dark'
            el_cardThemeJobs1.className = 'card bg-dark'
            el_cardThemeJobs2.className = 'card bg-dark'
            el_cardTitleTheme.className = 'card-title pDark'
            el_cardTitleTheme1.className = 'card-title pDark'
            el_cardTitleTheme2.className = 'card-title pDark'
            el_cardTitleTheme3.className = 'card-title pDark'
            el_cardTitleTheme4.className = 'card-title pDark'
            el_cardTitleTheme5.className = 'card-title pDark'
            el_cardTitleTheme6.className = 'card-title pDark'
            el_cardTitleThemeJobs1.className = 'card-title pDark'
            el_cardTitleThemeJobs2.className = 'card-title pDark'
            el_cardTextTheme.className = 'card-text pDark'
            el_cardTextTheme1.className = 'card-text pDark'
            el_cardTextTheme2.className = 'card-text pDark'
            el_cardTextTheme3.className = 'card-text pDark'
            el_cardTextTheme4.className = 'card-text pDark'
            el_cardTextTheme5.className = 'card-text pDark'
            el_cardTextTheme6.className = 'card-text pDark'
            el_cardTextThemeJobs1.className = 'card-text pDark'
            el_cardTextThemeJobs2.className = 'card-text pDark'
            el_artigosTitleTheme.className = 'centralizar pDark'
            el_hrTheme.className = 'hrDark'
            el_hrTheme1.className = 'hrDark'
            el_artigosTheme.className = 'nav-link pDark'
            el_notaTheme.className = 'notaDark'
            el_notaCardTheme.className = 'notaDark'
            el_fabGitTheme1.className = 'pDark fab fa-github'
            el_fabGitTheme2.className = 'pDark fab fa-github'
            el_fabGitTheme3.className = 'pDark fab fa-github'
            el_fabGitTheme4.className = 'pDark fab fa-github'
            el_fabGitTheme5.className = 'pDark fab fa-github'
            el_fabGitTheme6.className = 'pDark fab fa-github'
            el_fabGitTheme7.className = 'pDark fab fa-github'
            el_fabGlobeTheme1.className = 'pDark fas fa-globe-americas'
            el_fabGlobeTheme2.className = 'pDark fas fa-globe-americas'
            el_fabGlobeTheme3.className = 'pDark fas fa-globe-americas'
            el_fabGlobeTheme4.className = 'pDark fas fa-globe-americas'
            el_fabGlobeTheme5.className = 'pDark fas fa-globe-americas'
            el_fabGlobeTheme6.className = 'pDark fas fa-globe-americas'
            el_fabGlobeThemeJobs1.className = 'pDark fas fa-globe-americas'
            el_fabGlobeThemeJobs2.className = 'pDark fas fa-globe-americas'
            el_navTheme.className = 'navbar navbar-expand-lg navHr navbar-dark bg-dark'
            el_sunDarkmode.className = 'fas fa-moon pDark'
        } else {
            el_mainBody.className = 'bodyLight'
            el_JobsTitleTheme.className = 'pLight centralizar'
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
            el_cardTheme5.className = 'card bg-light'
            el_cardTheme6.className = 'card bg-light'
            el_cardThemeJobs1.className = 'card bg-light'
            el_cardThemeJobs2.className = 'card bg-light'
            el_cardTitleTheme.className = 'card-title pLight'
            el_cardTitleTheme1.className = 'card-title pLight'
            el_cardTitleTheme2.className = 'card-title pLight'
            el_cardTitleTheme3.className = 'card-title pLight'
            el_cardTitleTheme4.className = 'card-title pLight'
            el_cardTitleTheme5.className = 'card-title pLight'
            el_cardTitleTheme6.className = 'card-title pLight'
            el_cardTitleThemeJobs1.className = 'card-title pLight'
            el_cardTitleThemeJobs2.className = 'card-title pLight'
            el_cardTextTheme.className = 'card-text pLight'
            el_cardTextTheme1.className = 'card-text pLight'
            el_cardTextTheme2.className = 'card-text pLight'
            el_cardTextTheme3.className = 'card-text pLight'
            el_cardTextTheme4.className = 'card-text pLight'
            el_cardTextTheme5.className = 'card-text pLight'
            el_cardTextTheme6.className = 'card-text pLight'
            el_cardTextThemeJobs1.className = 'card-text pLight'
            el_cardTextThemeJobs2.className = 'card-text pLight'
            el_artigosTitleTheme.className = 'centralizar pLight'
            el_hrTheme.className = 'hrLight'
            el_hrTheme1.className = 'hrLight'
            el_artigosTheme.className = 'nav-link pLight'
            el_notaTheme.className = 'notaLight'
            el_notaCardTheme.className = 'notaLight'
            el_fabGitTheme1.className = 'pLight fab fa-github'
            el_fabGitTheme2.className = 'pLight fab fa-github'
            el_fabGitTheme3.className = 'pLight fab fa-github'
            el_fabGitTheme4.className = 'pLight fab fa-github'
            el_fabGitTheme5.className = 'pLight fab fa-github'
            el_fabGitTheme6.className = 'pLight fab fa-github'
            el_fabGitTheme7.className = 'pLight fab fa-github'
            el_fabGlobeTheme1.className = 'pLight fas fa-globe-americas'
            el_fabGlobeTheme2.className = 'pLight fas fa-globe-americas'
            el_fabGlobeTheme3.className = 'pLight fas fa-globe-americas'
            el_fabGlobeTheme4.className = 'pLight fas fa-globe-americas'
            el_fabGlobeTheme5.className = 'pLight fas fa-globe-americas'
            el_fabGlobeTheme6.className = 'pLight fas fa-globe-americas'
            el_fabGlobeThemeJobs1.className = 'pLight fas fa-globe-americas'
            el_fabGlobeThemeJobs2.className = 'pLight fas fa-globe-americas'
            el_navTheme.className = 'navbar navbar-expand-lg navHr navbar-light bg-light'
            el_sunDarkmode.className = 'fas fa-sun'
        }
    }
    checkbox.checked = JSON.parse(localStorage.getItem(LocalStorageName)) ?? false  // default value
    setTheme(checkbox.checked)

    checkbox.addEventListener('click', function () {
        setTheme(checkbox.checked)
        localStorage.setItem(LocalStorageName, JSON.stringify(checkbox.checked))
    })
})()