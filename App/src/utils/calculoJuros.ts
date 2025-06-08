
export function calcularJuros(valorSolicitado: string, prazo: number): string {
    let valor = valorSolicitado.replaceAll(".", "").replace(",", ".").replaceAll("R$", "");
    let valorFinanciado = parseFloat(valor) * (Math.pow((0.10 + 1), prazo));
    let resultado = valorFinanciado.toFixed(2);
    let montante = aplicarMaskJuros(String(resultado));
    return String(montante)
}

function aplicarMaskJuros(e: string) {
    console.log(e);
    let value = e;
    value = value.replace(/\D/g, "");
    value = value.replace(/(\d)(\d{2})$/, "$1,$2");
    value = value.replace(/(?=(\d{3})+(\D))\B/g, ".");
    e =  ('R$' + value);
    return (e);
}