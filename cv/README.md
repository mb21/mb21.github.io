## My CV

- [PDF](https://mb21.github.io/cv/cv.pdf)
- [Markdown](cv.md)

---

### Installing

    brew install pandoc
    brew install --cask basictex

    sudo tlmgr update --all
    sudo tlmgr update --self
    sudo tlmgr install ucs
    sudo tlmgr install sectsty
    sudo tlmgr install collection-fontsrecommended

### Generating the PDF

    pandoc --template template.tex cv.md -o cv.pdf
