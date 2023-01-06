class Produto{
    constructor(){
        this.id = 1;
        this.arrayProdutos = [];
        this.editId =null;
    }

    salvar(){
        let produto = this.lerDados();

        if (this.validaCampos(produto)){
            if(this.editId == null){
                this.adicionar(produto);
            }
        else{
            this.atualizar(this.editId, produto);
            }
        }

        this.listaTabela();
        this.buttonSalvar();
        this.clearFields();
        
        console.log(produto);
    }
        
    listaTabela(){
        let tbody = document.getElementById('tbody');
        tbody.innerText ='';

        for(let i=0; i< this.arrayProdutos.length; i++){
            let tr = tbody.insertRow();

            let td_id = tr.insertCell();
            let td_descricao = tr.insertCell();
            let td_categoria = tr.insertCell();
            let td_estoque = tr.insertCell();
            let td_valor = tr.insertCell();
            let td_acoes = tr.insertCell();

            td_id.innerText = this.arrayProdutos[i].id;
            td_descricao.innerText = this.arrayProdutos[i].descricao;
            td_categoria.innerText = this.arrayProdutos[i].categoria;
            td_estoque.innerText = this.arrayProdutos[i].estoque;
            td_valor.innerText = this.arrayProdutos[i].valor;                    

            let btnEdit = document.createElement("button");
            btnEdit.innerHTML = 'Editar';
            btnEdit.setAttribute("onclick","produto.preparaEdicao("+ JSON.stringify(this.arrayProdutos[i]) +")");
            btnEdit.setAttribute('id', 'btnEditar');
            btnEdit.setAttribute('class', 'btnyellow');
            btnEdit.setAttribute('data-toggle','modal');
            btnEdit.setAttribute('data-target','#modalCadastro');

            let btnDel = document.createElement("button");
            btnDel.innerHTML  = 'Deletar';
            btnDel.setAttribute('id', 'btnDeletar');
            btnDel.setAttribute('class', 'btnred');
            btnDel.setAttribute("onclick","produto.deletar("+ this.arrayProdutos[i].id +")");

            td_acoes.appendChild(btnEdit);
            td_acoes.appendChild(btnDel);
        }
    }

    adicionar(produto){
        produto.valor = parseFloat(produto.valor);
        this.arrayProdutos.push(produto);
        this.id++;
    }

    atualizar(id, produto){
        for(let i=0; i< this.arrayProdutos.length; i++){
           if(this.arrayProdutos[i].id == id){
                this.arrayProdutos[i].descricao = produto.descricao;
                this.arrayProdutos[i].categoria = produto.categoria;
                this.arrayProdutos[i].estoque = produto.estoque;
                this.arrayProdutos[i].valor = produto.valor;
           }   
        }
    }

    clearFields(){
        $('#form').each (function(){
        this.reset();
        });
    }

    preparaEdicao(dados){
        this.editId = dados.id;
        
        document.getElementById('descricao').value = dados.descricao;
        document.getElementById('categoria').value = dados.categoria;
        document.getElementById('estoque').value = dados.estoque;
        document.getElementById('valor').value = dados.valor;

        document.getElementById('btn1').innerText="Atualizar";
    }

    lerDados(){
        let produto ={}
        produto.id =this.id;
        produto.descricao = document.getElementById('descricao').value;
        produto.categoria = document.getElementById('categoria').value;
        produto.estoque = document.getElementById('estoque').value;
        produto.valor = document.getElementById('valor').value;
        
        return produto;
    }

    validaCampos(produto){
        let msg ='';

        if(produto.descricao == ""){
            msg += 'Informe a descrição do Produto \n'
        }
        if(produto.estoque == ""){
            msg += 'Insira a quantidade de estoque \n'
        }
        if(produto.valor == ""){
            msg += 'Insira o valor do produto \n'
        }
        if (msg != ''){
            alert(msg);
            return false
        }
        else{
            $('#modalCadastro').modal('hide')
        }
        return true
    }
    
    buttonSalvar(){
        document.getElementById('btn1').innerText = 'Salvar';
        this.editId = null;
    }

    deletar(id){
        if(confirm('Deseja realmente deletar este produto?')){
            let tbody = document.getElementById('tbody');

            for(let i=0; i <this.arrayProdutos.length; i++){
                if(this.arrayProdutos[i].id == id){
                    this.arrayProdutos.splice(i, 1);
                    tbody.deleteRow(i);
                }
            }
        }
    }
}
var produto = new Produto();
