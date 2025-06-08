export function gerarNumeroProposta(): number {
    let momentoGeracao = new Date().getTime()/1000.0;
    let cortarDigitos = momentoGeracao.toString();
    let numeroProposta = cortarDigitos.substring(4, 13);
    console.log(Number(numeroProposta));
    return Number(numeroProposta);
}