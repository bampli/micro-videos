# Forum

[A 'super' call must be the first statement in the constructor when a class contains initialized properties](https://forum.code.education/forum/topico/a-super-call-must-be-the-first-statement-in-the-constructor-when-a-class-contains-initialized-properties-1436/)

## post-a

Oi Luiz, tudo blz. Obrigado pela resposta. Estou usando Ubuntu. Estava mantendo o Vscode na versão 1.60.2 porque tinha dado problema nas últimas atualizações. Quanto ao Typescript a versão 4.6.4 que uso é a última disponível, li que há previsão de sair a versão 4.7 RC nessa semana. Com a última versão do Vscode 1.67.0, segue o log abaixo, ocorre erro após tentar abrir o remote container: "An error ocurred setting up the container". Estava fugindo das atualizações por causa disso.

Tentei deletar o diretório .devcontainer para gerar um novo mas não resolveu. Alguma dica? Valeu mais uma vez!

```

```

## post-b

Oi Luiz,

Desculpe mas não sei o que houve com a formatação, parece que virou tudo texto corrido. Não consigo também ver o preview ao lado.

Com relação ao erro no construtor, resolvi invertendo as linhas como sugerido. Acompanhei uma issue no github/typescript bem acaloradas sobre super() ser o primeiro statement. Concordo com vc que nesse caso não há problema em criar o base-object para validar depois.

Obrigado pela dica do tsc:check, reparei que havia um erro que  tinha passado despercebido. Surgiu então mais uma dúvida, não sei se seria melhor abrir novo thread mas em todo caso, segue abaixo.

Ocorre em runRule, na chamada method.apply():

```
function runRule({
    value,
    property,
    rule,
    params = []
}: Omit<ExpectedRule, "error">) {
    const validator = ValidatorRules.values(value, property);
    const method = validator[rule];
    method.apply(validator, params);
}
```

```
The 'this' context of type '(() => Omit<ValidatorRules, "string">) | (() => Omit<ValidatorRules, "boolean">) | (() => Omit<ValidatorRules, "required">) | ((max: number) => Omit<...>)' is not assignable to method's 'this' of type '(this: ValidatorRules) => Omit<ValidatorRules, "string">'.
  Type '() => Omit<ValidatorRules, "boolean">' is not assignable to type '(this: ValidatorRules) => Omit<ValidatorRules, "string">'.
    Property 'boolean' is missing in type 'Omit<ValidatorRules, "boolean">' but required in type 'Omit<ValidatorRules, "string">'.ts(2684)
```

Só consegui resolver trocando de 'private' para 'public' o parametro 'value' do construtor em 'validator-rules.ts' , como visto abaixo. Não entendi bem o motivo.

```
export default class ValidatorRules {
    private constructor( private value: any,  private property: string) { }
```

Solução que eliminou todos os erros. Deu green! Porque?

```
export default class ValidatorRules {
    private constructor( public value: any,  private property: string) { }
```



