let globalOzgaruvch = []

function render(products) {
    let wrapper = document.querySelector('.main-wrapper')
    wrapper.innerHTML = ''

    products.forEach((product) => {
        let shortTitle = product.title.length > 25
            ? product.title.slice(0, 20) + "..."
            : product.title

        let card = document.createElement('div')
        card.classList = 'cards'
        card.innerHTML = `
            <img class="imgs" src="${product.image}" alt="${product.title}">
            <h2>${shortTitle}</h2>
            <h3>Kategoriya: ${product.category}</h3>

            <div class="info">
                <p><span>ID:</span> ${product.id}</p>
                <p><span>Narx:</span> $${product.price}</p>
            </div>
        `
        wrapper.append(card)
    })
}







async function elemens() {
    try {
        let data = await fetch('https://fakestoreapi.com/products')
        let res = await data.json()
        console.log(res);

        globalOzgaruvch = res
        render(res)

        let input = document.querySelector('.inputs')

        input.addEventListener('input', () => {
            let inputv = input.value.toLowerCase().trim()
            let elem = res.filter(titles => titles.title.trim().toLowerCase().includes(inputv))
            render(elem)
        })

        let selects = document.querySelector('#sort')



        selects.addEventListener('change', () => {
            const value = selects.value

            if (value === 'az') {
                let soter = res.sort((a, b) => a.title.localeCompare(b.title))
                render(soter)
            } else if (value === 'za') {
                let soter = res.sort((a, b) => b.title.localeCompare(a.title))
                render(soter)
            }


        })

        let narhsort = document.getElementById("narh")

        narhsort.addEventListener('change', () => {
            let narhv = narhsort.value
            if (narhv === 'arzon') {
                let narhsortss = res.sort((a, b) => a.price - b.price)
                render(narhsortss)
            } else if (narhv === 'qimat') {
                let narhsortss = res.sort((a, b) => b.price - a.price)
                render(narhsortss)
            }
        })


    } catch (err) {
        console.log(err)
    }
}

elemens()