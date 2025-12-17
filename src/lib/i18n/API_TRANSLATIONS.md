# Tradução de Dados da API

Este documento explica como funciona a tradução automática dos dados que vêm da API do Pokémon.

## Como Funciona

O sistema de tradução busca automaticamente as traduções da **PokeAPI oficial** (https://pokeapi.co) quando os dados são carregados. A tradução acontece de forma assíncrona e é cacheada para melhor performance.

## Dados Traduzidos

### 1. Nome do Pokémon
- **Fonte**: URL da `species` retornada pela API
- **Endpoint**: `https://pokeapi.co/api/v2/pokemon-species/{id}/`
- **Traduzido**: Nome do Pokémon (ex: "Pikachu" → "Pikachu" em pt-BR)

### 2. Nomes de Habilidades
- **Fonte**: Nome da habilidade usado para construir a URL
- **Endpoint**: `https://pokeapi.co/api/v2/ability/{ability-name}/`
- **Traduzido**: Nome da habilidade (ex: "static" → "Estático")

### 3. Efeitos de Habilidades
- **Fonte**: Mesmo endpoint da habilidade
- **Traduzido**: 
  - `short_effect`: Efeito curto da habilidade
  - `effect`: Efeito completo da habilidade

### 4. Evoluções
- **Fonte**: IDs das evoluções usados para construir URLs de species
- **Traduzido**: Nomes dos Pokémon na cadeia de evolução

## Implementação

### Hook `useTranslatedPokemon`

O hook `useTranslatedPokemon` é usado automaticamente no `useDetails`:

```tsx
const { translatedPokemon, isTranslating } = useTranslatedPokemon(pokemon);
```

Este hook:
1. Detecta o idioma atual (`pt-BR` ou `en`)
2. Busca traduções da PokeAPI para todos os dados traduzíveis
3. Retorna os dados traduzidos quando disponíveis
4. Faz fallback para os dados originais se a tradução falhar

### Cache

As traduções são cacheadas em memória para evitar requisições repetidas:
- Cache por chave: `{tipo}-{identificador}-{idioma}`
- Cache persiste durante a sessão do usuário

## Exemplo de Uso

```tsx
// No componente de detalhes
const { pokemon, isTranslating } = useDetails();

// pokemon.name já está traduzido
// pokemon.abilities[].name já está traduzido
// pokemon.abilities[].short_effect já está traduzido
// pokemon.evolutions.*.name já está traduzido
```

## Idiomas Suportados

- **pt-BR**: Português Brasileiro (ID: 8 na PokeAPI)
- **en**: Inglês (ID: 9 na PokeAPI)

Para adicionar mais idiomas, edite `src/services/pokeapi-translations.ts`:

```typescript
const POKEAPI_LANGUAGE_MAP: Record<LanguageCode, number> = {
  "pt-BR": 8,
  "en": 9,
  "es": 7, // Espanhol
  // ...
};
```

## Performance

- **Cache**: Traduções são cacheadas para evitar requisições repetidas
- **Assíncrono**: Traduções acontecem em background sem bloquear a UI
- **Fallback**: Se a tradução falhar, os dados originais são mantidos
- **Indicador**: `isTranslating` indica quando as traduções estão sendo carregadas

## Limitações

1. **Requisições à PokeAPI**: Cada tradução requer uma requisição HTTP à PokeAPI oficial
2. **Latência**: Pode haver um pequeno delay enquanto as traduções são carregadas
3. **Rate Limiting**: A PokeAPI pode ter limites de requisições (geralmente generosos)
4. **Dependência Externa**: Requer conexão com a internet para funcionar

## Melhorias Futuras

- [ ] Cache persistente (localStorage/IndexedDB)
- [ ] Pré-carregamento de traduções comuns
- [ ] Suporte a mais idiomas
- [ ] Fallback para traduções locais quando a API falhar

