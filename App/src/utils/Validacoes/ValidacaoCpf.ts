export function validarCpf(cpf: string): boolean {
    return !testaCPFValido(cpf) && cpf !== "" && cpf.length === 14
}

export function testaCPFValido(strCPF: string): boolean {
    strCPF = strCPF.replaceAll(".", "").replaceAll("-", "");
    if (strCPF.length !== 11 || !!strCPF.match(/(\d)\1{10}/)) return false
    let Soma;
    let Resto;
    Soma = 0;
    if (strCPF === '00000000000') return false;

    for (let i = 1; i <= 9; i++)
        Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if (Resto === 10  || Resto === 11) Resto = 0;
    if (Resto !== parseInt(strCPF.substring(9, 10))) return false;

    Soma = 0;
    for (let i = 1; i <= 10; i++)
        Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if (Resto === 10 || Resto === 11) Resto = 0;
    if (Resto !== parseInt(strCPF.substring(10, 11))) return false;
    return true;
}

