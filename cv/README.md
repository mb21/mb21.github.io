With TeX Live Basic:

    sudo tlmgr update --self
    sudo tlmgr update --all
    sudo tlmgr install ucs
    sudo tlmgr install sectsty
    # sudo tlmgr install palatino
    sudo tlmgr install collection-fontsrecommended

Then:

    pandoc --template template.tex cv.md -o cv.pdf
