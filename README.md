# 📊 Projeto 05 — Cálculo de Média de Alunos (Node.js + NPM)

Aplicação Web desenvolvida para a disciplina de **Desenvolvimento Web III** do curso de **Desenvolvimento de Software Multiplataforma — FATEC Diadema (Luigi Papaiz)**.

O projeto calcula a média aritmética de duas notas (`P1` e `P2`) enviadas via parâmetros de URL (*query strings*), classifica o resultado em **APROVADO** ou **REPROVADO**, e renderiza dynamicamente a página correspondente sem a utilização de *frameworks*.

---

## 👨‍💻 Autores / Dupla

- **Maciel dos Santos**
- *(Nome do Integrante 2)*

**Professor:** Vinícius Heltai Pacheco  
**Semestre:** 3º Semestre  
**Instituição:** FATEC Diadema — Luigi Papaiz  

---

## 🎯 Regras de Negócio e Requisitos

1. **Acesso e Recebimento de Dados:**
   - Exemplo de URL: `http://localhost:3000/media?p1=7.5&p2=5.0`
2. **Cálculo da Média:**
   $$\text{MEDIA} = \frac{P1 + P2}{2}$$
3. **Condição de Aprovação:**
   - $\text{MEDIA} \ge 6.0 \longrightarrow$ Servir `public/aprovado.html` (**APROVADO**)
   - $\text{MEDIA} < 6.0 \longrightarrow$ Servir `public/reprovado.html` (**REPROVADO**)
4. **Exibição nas Páginas:**
   - As páginas de resultado exibem as notas $P1$, $P2$, a Média Final e a Situação do Aluno.
5. **Tratamento de Exceções e Erros:**
   - Tratamento de parâmetros ausentes ou não numéricos ($400\text{ Bad Request}$).
   - Tratamento de rotas inexistentes ($404\text{ Not Found}$).
   - Restrição de acesso fora da pasta `public` por razões de segurança.

---

## 🛠️ Tecnologias Utilizadas

- **Node.js** (v22+)
- **JavaScript (ES Modules - ESM)**
- **Módulos Nativos:** `http`, `fs`, `path`, `url`
- **HTML5 & CSS3**
- **Git & GitHub**

---

## 📁 Estrutura do Projeto

```text
projeto05-media/
├── app.js
├── package.json
├── README.md
└── public/
    ├── index.html
    ├── aprovado.html
    ├── reprovado.html
    ├── erro404.html
    └── css/
        └── style.css
        