# Battle Details - Sistema de Tradução

Este componente traduz automaticamente os dados dos Pokémon usados em batalhas.

## Como Usar

### Opção 1: Usar o componente diretamente

```tsx
import BattleDetails from "@/components/app/battle/details";
import { Pokemon } from "@/types/pokemon";

function MyBattlePage() {
  const firstPokemon: Pokemon = {
    id: 25,
    name: "pikachu",
    // ... outros dados
  };

  const secondPokemon: Pokemon = {
    id: 1,
    name: "bulbasaur",
    // ... outros dados
  };

  return (
    <BattleDetails 
      firstPokemon={firstPokemon} 
      secondPokemon={secondPokemon} 
    />
  );
}
```

### Opção 2: Usar apenas o hook para traduzir

Se você quiser apenas traduzir os dados sem usar o componente completo:

```tsx
import { useBattleDetails } from "@/components/app/battle/details/hooks/use-battle-details";
import { Pokemon } from "@/types/pokemon";

function MyCustomBattleComponent() {
  const firstPokemon: Pokemon = { /* ... */ };
  const secondPokemon: Pokemon = { /* ... */ };

  const { 
    firstPokemon: translatedFirst, 
    secondPokemon: translatedSecond,
    isTranslating 
  } = useBattleDetails(firstPokemon, secondPokemon);

  // Os Pokémon já estão traduzidos!
  // translatedFirst.name → "Pikachu" (em pt-BR)
  // translatedFirst.abilities[0].name → "Estático" (em pt-BR)
  // translatedFirst.abilities[0].short_effect → "Tem 30% de chance..." (em pt-BR)

  return (
    <div>
      <h1>{translatedFirst.name} vs {translatedSecond.name}</h1>
      {isTranslating && <p>Traduzindo...</p>}
      {/* Seu conteúdo customizado */}
    </div>
  );
}
```

### Opção 3: Traduzir um único Pokémon

Se você só precisa traduzir um Pokémon:

```tsx
import { useBattlePokemon } from "@/components/app/battle/details/hooks/use-battle-pokemon";

function MyComponent() {
  const pokemon: Pokemon = { /* ... */ };
  const { pokemon: translatedPokemon, isTranslating } = useBattlePokemon(pokemon);

  return (
    <div>
      <h1>{translatedPokemon?.name}</h1>
      {translatedPokemon?.abilities.map(ability => (
        <div key={ability.name}>
          <h3>{ability.name}</h3>
          <p>{ability.short_effect}</p>
        </div>
      ))}
    </div>
  );
}
```

## O que é Traduzido

Automaticamente traduz:
- ✅ Nome do Pokémon
- ✅ Nomes das habilidades
- ✅ Efeitos das habilidades (short_effect e effect)
- ✅ Nomes das evoluções

## Idioma

O idioma é determinado automaticamente pelo contexto `I18nProvider`. 
Para mudar o idioma, use:

```tsx
import { useI18n } from "@/lib/i18n/context";

function MyComponent() {
  const { setLanguage } = useI18n();
  
  return (
    <button onClick={() => setLanguage("pt-BR")}>Português</button>
    <button onClick={() => setLanguage("en")}>English</button>
  );
}
```

## Exemplo Completo

```tsx
"use client";

import BattleDetails from "@/components/app/battle/details";
import { useBattleDetails } from "@/components/app/battle/details/hooks/use-battle-details";
import { Pokemon } from "@/types/pokemon";

export default function BattlePage() {
  // Suponha que você recebeu esses dados da API
  const firstPokemonData: Pokemon = {
    id: 25,
    name: "pikachu",
    abilities: [
      {
        name: "static",
        short_effect: "Has a 30% chance of paralyzing attacking Pokémon on contact.",
        // ...
      }
    ],
    // ...
  };

  const secondPokemonData: Pokemon = {
    id: 1,
    name: "bulbasaur",
    // ...
  };

  // Opção 1: Usar o componente completo
  return (
    <BattleDetails 
      firstPokemon={firstPokemonData} 
      secondPokemon={secondPokemonData} 
    />
  );

  // Opção 2: Usar apenas o hook para tradução customizada
  // const { firstPokemon, secondPokemon, isTranslating } = useBattleDetails(
  //   firstPokemonData, 
  //   secondPokemonData
  // );
  // 
  // return (
  //   <div>
  //     <h1>{firstPokemon?.name} vs {secondPokemon?.name}</h1>
  //     {/* Seu layout customizado */}
  //   </div>
  // );
}
```

## Notas

- As traduções são feitas automaticamente quando o componente é montado
- As traduções são cacheadas para melhor performance
- Se a tradução falhar, os dados originais são mantidos
- O indicador `isTranslating` mostra quando as traduções estão sendo carregadas

