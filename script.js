const textResultado = document.querySelector('.text-result')
const cpfInput = document.getElementById('cpf-input')
const btnGerar = document.getElementById('btn-gerar')
const btnVerificar = document.getElementById('btn-verificar')

function gerarNumeros() {
    const cpf = []
    for(let i = 0; i < 9; i ++) {
        const numero = Math.floor(Math.random() * 10)
        cpf.push(numero)
    }
    return cpf
}

function verificarDv(cpfNumero) {
    let dv1 = 0
    const numero = [...cpfNumero]

    for(let i = 0; i < numero.length; i++) {
        dv1 += numero[i] * (10 - i)
    }
    dv1 = dv1 % 11
    dv1 = dv1 < 2 ? 0 : 11 - dv1

    numero.push(dv1)

    let dv2 = 0
    for(let i = 0; i < numero.length; i++) {
        dv2 += numero[i] * (11 - i)
    }
    dv2 = dv2 % 11
    dv2 = dv2 < 2 ? 0 : 11 - dv2

    numero.push(dv2)

    return numero
}

function verificarCpf(cpf) {
    if(cpf.length !== 9 && cpf.length !== 11) {
        return alert("CPF Inválido. Digite no mínimo 9 números ou os 11 números do CPF sem pontuação.")
    }
    const todosIguais = cpf.every(v => v === cpf[0]);

    if(todosIguais) return alert('CPF Inválido. Os números não podem ser todos repetidos.')

    if(cpf.length == 11) {
        const cpfClone = cpf.slice(0, 9)
        const cpfResultado = verificarDv(cpfClone).join("").split("")
        if (cpfResultado.join("") === cpf.join("")) {
            textResultado.textContent = 'CPF Válido'
            textResultado.style.color = 'rgb(3, 204, 3)'
        } else {
            textResultado.textContent = 'CPF Inválido'
            textResultado.style.color = 'rgb(224, 5, 5)'
        }
    }
    if (cpf.length == 9) {
        const cpfResultado = verificarDv(cpf).join("")
        textResultado.textContent = "CPF Válido"
        textResultado.style.color = 'rgb(3, 204, 3)'
        cpfInput.value = cpfResultado
    }
}

btnGerar.addEventListener('click', () => {
    const cpfGerado = verificarDv(gerarNumeros()).join("")
    textResultado.style.color = 'rgb(3, 204, 3)'
    textResultado.textContent = 'CPF Gerado'
    cpfInput.value = cpfGerado
})

btnVerificar.addEventListener('click', () => {
    const cpf = cpfInput.value.split("").map(Number)
    verificarCpf(cpf)
})

cpfInput.addEventListener('click', () => {
    textResultado.textContent = 'Gerador e Validador de CPFs'
    textResultado.style.color = 'white'
})