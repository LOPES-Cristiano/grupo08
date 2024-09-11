function scriptHomePerfil(conteudo) {
    conteudo.innerHTML = `
        <h2>Meu Perfil</h2>
        <p>Aqui você pode alterar alguns itens do seu perfil </p>
        <div class="perfil-forms">
            <form>
                <label for="nome">NOME:</label>
                <input type="text" id="nome" iname="nome" placeholder="Informe novo nome de exibição">
                <button id="salvar" type="submit">Salvar</button>
            </form>
            <form>
                <label for="email">E-MAIL:</label>
                <input type="email" id="email" name="email" placeholder="Informe o novo email">
                <button id="salvar" type="submit">Salvar</button>
            </form>
        <form class="form-senha">
                <label for="senha">SENHA:</label>
                <input type="password" id="senha" name="senha" placeholder="Senha atual">
                <input type="password" id="senha" name="senha" placeholder="Nova senha">
                <input type="password" id="senha" name="senha" placeholder="Confirmar nova senha">
                <button id="salvar" type="submit">Salvar</button>
            </form>
        </div>

    `;
    document.getElementById('salvar').addEventListener('click', function() {
        alert('Função ainda não implementada.');
    });
}
