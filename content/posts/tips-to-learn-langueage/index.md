---
title: "Solving Krashen's i+1: A 0–100 Difficulty Scale for Language Reading Practice"
url: "/krashen-i-plus-1-difficulty-scale-comprehensible-input"
description: "Krashen's i+1 input hypothesis is powerful but hard to apply — CEFR levels jump too much. Here's a 0–100 scale and AI prompt to find your sweet spot."
tags: 
    - language learning
    - krashen
    - comprehensible-input
    - german
categories: []
toc: true
date: 2026-07-18T07:34:33+02:00
---

## The problem with graded reading

I've spent months trying to find interesting reading material that is just above my level of competence, but it is very hard to find. I have tried reading news, but those are full of metaphors or very advanced grammar and vocab and graded readers are often boring and not interesting enough to read regularly. Learning anything hard comes with this same friction — I wrote about [the one word that helps you push through it](/the-one-magic-word-that-helps-you-learn-anything-especially-the-hard-stuff) a while back, and it applies just as much to language reading as it does to everything else.

In order to progress in learning language(or anything) it is very important to make reasonable steps towards mastery - fluency. If the input(from books, videos, audio) is too easy, we do not learn anything new, just reaffirm existing knowledge and if it is too hard we easily lose interest or even feel an aversion.

American linguist, Stephen Krashen, dedicated his life to studying language acquisition. The core of his findings is Input hypothesis, which says that you acquire language by receiving input that is slightly above your level of competence and input should be interesting to you.

> i + 1 means slightly above your level

The problem is that it is ***extremely hard to find interesting i+1 input*** regularly. By i+1 I mean not just in vocabulary, but also in grammar. Krashen advocates Graded reading(easy to read books), but there are limitations. For example, Swedes do not translate to english and it is hard to find any graded books in Swedish, let alone ones that are interesting.

### ..., but there is solution now

Take a topic you like, put into an AI and write to simplify to level A2, B1, or whatever your level is.

The problem is that the jump between for example A2 and B1 is huge, so I wrote the prompt to spread difficulty between 0 and 100. All I need to do is to find my sweet spot, the level that is my i+1.

The usage of the prompt to simplify the reading:
- insert a URL of an article on your favorite topic
- upload books to NotebookLM and read chapter by chapter

### A prompt

The following prompt is designed to help you find your i+1 level in language learning. It uses a custom 0–100 difficulty scale for texts, with finer steps than CEFR bands so each increase is a small, isolated grammar/vocab nudge rather than a big jump:

The only thing you need to change in the prompt is the level number (0–100) and the language you learn. The rest of the prompt is fixed. Both the level and the language are in the last line of the prompt.

```prompt
Use a custom 0–100 difficulty scale for texts, with finer steps than CEFR bands so each increase is a small, isolated grammar/vocab nudge rather than a big jump:

- 0–10: single words, present tense only, no connectors
- 11–25: simple present-tense sentences, basic connectors (and/but)
- 26–40: past tense introduced, simple sequencing, embedded quotes
- 41–55: subordinate clauses (that/which-clauses), modal verbs expand
- 56–70: passive voice, past perfect, longer subordinate chains
- 71–85: nuanced modality, idiomatic phrasing, varied register
- 86–100: near-native complexity (C1/C2), low-frequency vocab, stylistic variation

How this works:

1. I'll give you a level number (0–100).
2. Respond in the language I learn calibrated precisely to that level — sentence complexity, tense range, vocabulary difficulty.
3. Keep the level fixed across multiple texts until I say otherwise — I want reading fluency practice, not just grammar exposure. You can vary sentence patterns, connectors, and structure within the level.

Respond in german language level 34.
```

> Note:
> - if the spread is still too big, just rewrite the prompt to scale between 0 and 200.
> - I find it helpful to stay at a level for a few days and read articles that differ in topics. If your mind wanders during longer sessions, [brown noise is worth trying](/finding-focus-how-brown-noise-transformed-my-study-sessions) — it's what fixed the same problem for me during study sessions generally.

By now I have read almost all my favorite books in a foreign language with this technique. Using this simple technique makes reading interesting and fun. The reading flows much easier and you control the difficulty.

A friendly reminder: AI makes mistakes.

## Sources:

- [Krashen's site](https://www.sdkrashen.com/)

---

**Further reading:** if graduated difficulty works for language learning, the same idea applies to [building daily habits that compound into lifelong intelligence](/4-daily-practices-that-build-lifelong-intelligence).
