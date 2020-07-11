## My CV

- [PDF](https://mb21.github.io/cv/cv.pdf)
- [Markdown](cv.md)

---

### Generating the PDF


With TeX Live Basic:

    sudo tlmgr update --self
    sudo tlmgr update --all
    sudo tlmgr install ucs
    sudo tlmgr install sectsty
    # sudo tlmgr install palatino
    sudo tlmgr install collection-fontsrecommended

Then:

    pandoc --template template.tex cv.md -o cv.pdf
