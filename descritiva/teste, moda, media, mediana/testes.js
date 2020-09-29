let vetElemento = ['1', '2', '3'] //vetor com o conteudo          

let vetFrequencia = [3,5,2] //vetor com a frequencia dos conteudos   //# CONTEUDO PARA TESTES #

console.log(`A média é: ${acharMedia(vetElemento, vetFrequencia)}`)
console.log(`A mediana é: ${acharMediana(vetElemento)}`)
console.log(`A moda é: ${acharModa(vetElemento, vetFrequencia)}`)
console.log(`O desvio padrão é: ${acharDP(vetElemento, vetFrequencia)}`)
console.log(`O coeficiente de variação é: ${acharCV(vetElemento, vetFrequencia)}`)

function acharMediana(vet){

  let impPar
  let mediana
  let indice

  if(vet.length & 1){ //ve se a quantidade de elemento do vetor e impar ou par para saber quantas medianas teram
    impPar = 'Impar'
  } 
  else {
    impPar = 'Par'
  }

  if(impPar == 'Impar'){ //descobre apenas uma mediana porque e impar
    indice = vet.length / 2
    mediana = vet[Math.floor(indice)]
  }
  else{ //descobre duas medianas porque e par
    indice = vet.length / 2
    mediana = vet[indice - 1]
    mediana += ' e ' + vet[indice] //separa com a conjunção e
  }
 
  return mediana

}

function acharMedia(vetEle, vetFre){ //entrar com o vetor de lista de elemento e de frequencia precisa fazer um if para
                                     //identificar qual opção o usuario escolheu ordinal, nominal ...
    var soma = parseFloat(vetEle[0]) * vetFre[0]
    var somaFre = vetFre[0]
  
    for(var i = 1; i < vetEle.length; i++){ //multiplica e soma os elementos do vetor com suas frequencias
        soma = soma + parseFloat(vetEle[i]) * vetFre[i]
        somaFre = somaFre + vetFre[i]
    }
    
    return (soma / somaFre).toFixed(1) //sai a media com apenas uma casa depois da virgula
  
  }
  
function acharModa(vetProp, vetValor) { //tem que entrar com o vetor de lista de elementos e frequencia   
  
  let asModa = []                      
  let propiedade
  let maior
  let indice
  let cont = 0
  
  for (var i = 0; i <= vetValor.length; i++) { //Vendo se todas os elementos do vetor são iguais assim não havera MODA
    if (vetValor[0] == vetValor[i]) {
      cont++
    }
  }
  
  if (cont == vetValor.length) { //Retorno se todos forem iguais
    return 'Não tem moda'
  }
  else {
    propiedade = vetProp[0]
    maior = vetValor[0]
    indice = 0
  
    for (var i = 1; i <= vetValor.length; i++) { //Descobrindo a maior frequencia e sua posição
      if (vetValor[i] >= maior) {
        maior = vetValor[i]            // #############################  //
        propriedade = vetProp[i]       // ####  TA DANDO ERRO AQUI ####  //
        indice = i                     // #############################  //
      }
    }

    console.log(propiedade) // MOSTRANDO ERRO
  
    for (var j = 0; j <= indice; j++) { //Vendo se a MODA encontrada se repete
      if (vetValor[j] == maior) {
        asModa.push(vetProp[j]) // # Aqui esta saido a MODA #
      }
    }
  
    if(asModa.length <= 1){ //verificando se apenas um elemento e moda
       return propiedade
    }
    else{
      return asModa
    }
  }
}

function acharDP(vetEle, vetFre){ //entrar com o vetor de lista de elemento e de frequencia precisa fazer um if para
                                     //identificar qual opção o usuario escolheu ordinal, nominal ...
var soma = parseFloat(vetEle[0]) * vetFre[0]
var somaFre = vetFre[0]
var media
var etapaUm = 0
var DP

for(var i = 1; i < vetEle.length; i++){ //multiplica e soma os elementos do vetor com suas frequencias
soma = soma + parseFloat(vetEle[i]) * vetFre[i]
somaFre = somaFre + vetFre[i]
}

media = (soma / somaFre).toFixed(1) //sai a media com apenas uma casa depois da virgula

for(var i = 0; i < vetEle.length; i++){
  etapaUm = etapaUm + Math.pow(parseFloat(vetEle[i]) - media, 2) * vetFre[i]
}
                                                    //Aplicando a formula
DP = (Math.sqrt(etapaUm / somaFre)).toFixed(1)

return DP
}

function acharCV(vetEle, vetFre){ //entrar com o vetor de lista de elemento e de frequencia precisa fazer um if para
  //identificar qual opção o usuario escolheu ordinal, nominal ...
var soma = parseFloat(vetEle[0]) * vetFre[0]
var somaFre = vetFre[0]
var media
var etapaUm = 0
var DP
var CV

for(var i = 1; i < vetEle.length; i++){ //multiplica e soma os elementos do vetor com suas frequencias
soma = soma + parseFloat(vetEle[i]) * vetFre[i]
somaFre = somaFre + vetFre[i]
}

media = (soma / somaFre).toFixed(1) //sai a media com apenas uma casa depois da virgula

for(var i = 0; i < vetEle.length; i++){
etapaUm = etapaUm + Math.pow(parseFloat(vetEle[i]) - media, 2) * vetFre[i]
}
                                            //Aplicando a formula
DP = (Math.sqrt(etapaUm / somaFre)).toFixed(1)

CV = `${((DP / media) * 100).toFixed(0)}%`

return CV
}
