# ATF+ — A arte de fazer mais

Site estático de apresentação e catálogo da ATF+.

## Publicar no GitHub Pages

1. Crie um repositório no GitHub e extraia o conteúdo deste pacote na raiz do repositório.
2. Envie os arquivos para a branch main, incluindo .github/workflows/pages.yml e .nojekyll.
3. No GitHub, abra Settings → Pages e selecione GitHub Actions como origem.
4. A publicação começa a cada envio para main. Também é possível iniciá-la em Actions → Publicar site ATF+ no GitHub Pages → Run workflow.
5. Depois que a ação terminar, o GitHub mostrará o endereço do site em Settings → Pages.

O pacote funciona como site de projeto, em um endereço no formato https://USUARIO.github.io/REPOSITORIO/; os links e imagens usam caminhos relativos. Não é necessário instalar dependências nem configurar um comando de build.

## Conteúdo

- index.html: homepage e catálogo em destaque.
- produtos.html: página com o catálogo completo.
- 404.html: página para endereços não encontrados.
- assets/: imagens e arquivos de estilo e interação.

O formulário de orçamento abre o WhatsApp informado pela ATF+. O site não possui banco de dados e não armazena os campos preenchidos.

## Antes da apresentação

Confira se o repositório e a página podem ser vistos pelo cliente. O catálogo, preços, prazos, opções de entrega, política de privacidade e informações da marca ainda devem ser validados pela ATF+. Depois que o endereço do GitHub Pages estiver definido, ele poderá ser incluído em metadados, sitemap e prévias de compartilhamento.
