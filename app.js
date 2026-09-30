// Carregar os Módulos Nativos
import http from 'http';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Recuperar __filename e __dirname no ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Diretório da pasta pública
const publicDir = path.join(__dirname, 'public');

// Mapeamento de Content-Types
const contentTypes = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg'
};

//Função para ler arquivos estáticos
function readFile(response, file) {
    fs.readFile(file, function (err, data) {
        if (err) {
            return erro404(response);
        }

        const extension = path.extname(file).toLowerCase();
        const contentType = contentTypes[extension] || 'aplication/octet-stream';

        response.writeHead(200, { 'Content-Type': contentType });
        response.end(data);
    });
}

// Tratar Erro 404
function erro404(response) {
    const file = path.join(publicDir, 'erro404.html');

    fs.readFile(file, function (err, data) {
        if (err) {
            response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8'});
            return response.end('404 - Página Não Encontrada');
        }

        response.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8'});
        response.end(data);
    });
}

// Renderizar páginas HTML dinâmicas (Aprovado / Reprovado)
function mostrarResultado(response, pagina, p1, p2, media, situacao) {
    const file = path.join(publicDir, pagina);

    fs.readFile(file, 'utf-8', function (err, data) {
        if (err) {
            return erro404(response);
        }

        // Substituir marcadores dinâmicos pelos valores reais
        data = data.replace(/{p1}/g, p1.toFixed(1));
        data = data.replace(/{p2}/g, p2.toFixed(1));
        data = data.replace(/{media}/g, media.toFixed(1));
        data = data.replace(/{situacao}/g, situacao);

        response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8'});
        response.end(data);
    });
}
// Callback Principal do Servidor HTTP
function callback(request, response) {
    const url = new URL(request.url, `http://${request.headers.host}`);
    const pathname = decodeURIComponent(url.pathname);

    // Rota Principal
    if (pathname === '/') {
        return readFile(response, path.join(publicDir, 'index.html'));
    }

    // Rota /media
    if (pathname === '/media') {
        const paramP1 = url.searchParams.get('p1');
        const paramP2 = url.searchParams.get('p2');

        const p1 = parseFloat(paramP1);
        const p2 = parseFloat(paramP2);

        // Tratamento de errros e notas inválidas
        if (paramP1 === null || paramP2 === null || isNaN(p1) || isNaN(p2) || p1 < 0 || p1 > 10 || p2 < 0 || p2 > 10) {
            response.writeHead(400, {'Content-Type': 'text/html; charset=utf-8' });
            return response.end(`
                <!DOCTYPE html>
                <html lang="pt-BR">
                <head>
                    <meta charset="UTF-8">
                    <title>Erro nos Parâmetros</title>
                    <link rel="stylesheet" href="/css/style.css">
                </head>
                <body class="erro">
                    <main class="resultado">
                        <h1>Parâmetros Inválidos!</h1>
                        <p>Por favor, informe notas válidas para <strong>p1</strong> e <strong>p2</strong> entre 0.0 e 10.0 na URL.</p>
                        <p>Exemplo: <code>/media?p1=7.5&p2=5.0</code></p>
                        <a href="/" class="btn">Voltar à página inicial</a>
                    </main>
                </body>
                </html>
            `);
        }

        // Cáculo da Média
        const media = (p1 + p2) / 2;
        const aprovado = media >= 6.0;
        const situacao = aprovado ? 'APROVADO' : 'REPROVADO';
        const pagina = aprovado ? 'aprovado.html' : 'reprovado.html';

        return mostrarResultado(response, pagina, p1, p2, media, situacao);
    }

    // Arquivos Estáticos (CSS, Imagens, etc.)
    const file = path.join(publicDir, pathname);

    // Impedir Acesso Fora da Pasta public
    if (!file.startsWith(publicDir)) {
        return erro404(response);
    }

    readFile(response, file);
}

// Servidor HTTP na Porta 3000
const server = http.createServer(callback);
const PORT = 3000;

server.listen(PORT, function() {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
