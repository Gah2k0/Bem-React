export function aplicarMaskCpf(cpf: React.FormEvent<HTMLInputElement>) {
    cpf.currentTarget.maxLength = 14;
    let value = cpf.currentTarget.value;
    
    if (!value.match(/^(\d{3}).(\d{3}).(\d{3})-(\d{2})$/)) {
        console.log("entrou no regex")
        console.log(value.length);
        value = value.replace(/\D/g, "");
        value = value.replace(/(\d{3})(\d)/, "$1.$2");
        value = value.replace(/(\d{3})(\d)/, "$1.$2");
        value = value.replace(/(\d{3})(\d{2})$/, "$1-$2");
        cpf.currentTarget.value = value;
      }
}

export function aplicarMaskCep(e: React.FormEvent<HTMLInputElement>) {
    e.currentTarget.maxLength = 9;
    let value = e.currentTarget.value;
    if(!value.match(/^(\d{5})-(\d{3})$/)){
        value = value.replace(/\D/g, "");
        value = value.replace(/^(\d{5})(\d)/, "$1-$2");
        e.currentTarget.value = value;
        return e.currentTarget.value;
    }
}

export function aplicarMaskMonetario(e: React.FormEvent<HTMLInputElement>) {
    let value = e.currentTarget.value;
    value = value.replace(/\D/g, "");
    value = value.replace(/(\d)(\d{2})$/, "$1,$2");
    value = value.replace(/(?=(\d{3})+(\D))\B/g, ".");
    e.currentTarget.value =  ('R$' + value);
    return (e.currentTarget.value);
}

export function aplicarMaskCepApi(e: string): string {
    let value = e;
    if(!value.match(/^(\d{5})-(\d{3})$/)){
        value = value.replace(/\D/g, "");
        value = value.replace(/^(\d{5})(\d)/, "$1-$2");
        e = value;
    }
    return e;
}

export function aplicarMaskNumero(e: string): string {
    let value = e;
    if(!value.match(/\D/g)){
        value = value.replace(/\D/g, "");
        e = value;
    }
    return e;
}

