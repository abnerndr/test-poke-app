# Sistema de Tradução (i18n)

Este projeto possui um sistema de tradução customizado para traduzir textos da interface e dados da API do Pokémon.

## Como usar

### 1. Hook `useI18n`

Use o hook `useI18n` em qualquer componente client-side para acessar as funções de tradução:

```tsx
import { useI18n } from "@/lib/i18n/context";

function MyComponent() {
  const { t, translateStat, translateAbility, translateAbilityEffect, language, setLanguage } = useI18n();

  return (
    <div>
      <h1>{t("ui.baseStats")}</h1>
      <p>{translateStat("hp")}</p>
      <button onClick={() => setLanguage("en")}>English</button>
    </div>
  );
}
```

### 2. Funções disponíveis

- **`t(key: string)`**: Traduz uma chave de tradução (ex: `"ui.baseStats"`)
- **`translateStat(statName: string)`**: Traduz o nome de uma estatística
- **`translateAbility(abilityName: string)`**: Traduz o nome de uma habilidade
- **`translateAbilityEffect(abilityName: string)`**: Traduz o efeito de uma habilidade (se disponível)
- **`language`**: Idioma atual (`"pt-BR"` ou `"en"`)
- **`setLanguage(lang: Language)`**: Altera o idioma

### 3. Adicionar novas traduções

Edite os arquivos em `src/lib/i18n/translations/`:

- `pt-BR.ts` - Traduções em português
- `en.ts` - Traduções em inglês

### 4. Estrutura das traduções

```typescript
{
  ui: {
    // Textos da interface
    baseStats: "Estatísticas Base",
    // ...
  },
  stats: {
    // Nomes de estatísticas
    hp: "HP",
    // ...
  },
  abilities: {
    // Nomes de habilidades
    overgrow: "Supercrescimento",
    // ...
  },
  abilityEffects: {
    // Efeitos de habilidades
    overgrow: "Fortalece movimentos do tipo Grama...",
    // ...
  },
  errors: {
    // Mensagens de erro
    loadPokemon: "Erro ao carregar pokemon...",
    // ...
  }
}
```

### 5. Traduzir dados da API

Para traduzir dados que vêm da API (como nomes de habilidades, stats, etc.), use as funções específicas:

```tsx
// Traduzir nome de stat
const translatedStat = translateStat("special-attack"); // "At. Esp." em pt-BR

// Traduzir nome de habilidade
const translatedAbility = translateAbility("overgrow"); // "Supercrescimento" em pt-BR

// Traduzir efeito de habilidade (retorna null se não houver tradução)
const effect = translateAbilityEffect("overgrow"); // Retorna tradução ou null
```

### 6. Persistência do idioma

O idioma escolhido é salvo automaticamente no `localStorage` e recuperado na próxima visita.

## Exemplo completo

```tsx
"use client";

import { useI18n } from "@/lib/i18n/context";

export function PokemonCard({ pokemon }) {
  const { t, translateAbility } = useI18n();

  return (
    <div>
      <h2>{t("ui.abilities")}</h2>
      {pokemon.abilities.map(ability => (
        <div key={ability.name}>
          <span>{translateAbility(ability.name)}</span>
        </div>
      ))}
    </div>
  );
}
```

