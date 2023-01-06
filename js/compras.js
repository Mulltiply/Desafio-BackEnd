class Compras{
    constructor(){
        this.id = 1;
        this.arrayCompras = [];
        this.editId =null;
    }

    salvar(){
        let compras = this.lerDados();

        if (this.validaCampos(compras)){
            if(this.editId == null){
                this.adicionar(compras);
            }
        else{
            this.atualizar(this.editId, compras);
            }
        }

        this.listaTabela();
        this.buttonSalvar();
        this.clearFields();
        
        console.log(compras);
    }
    cancelar(){
        buttonSalvar();
    }
        
    listaTabela(){
        let tbody = document.getElementById('tbody');
        tbody.innerText ='';

        for(let i=0; i< this.arrayCompras.length; i++){
            let tr = tbody.insertRow();

            let td_id = tr.insertCell();
            let td_fornecedor = tr.insertCell();
            let td_cnpj = tr.insertCell();
            // let td_cep = tr.insertCell();
            // let td_endereco = tr.insertCell();
            let td_contato= tr.insertCell();
            // let td_numero = tr.insertCell();
            let td_tel= tr.insertCell();
            let td_produto= tr.insertCell();
            let td_valorUn= tr.insertCell();
            let td_quantidade= tr.insertCell();
            let td_total = tr.insertCell();
            let td_acoes = tr.insertCell();
            

            td_id.innerText = this.arrayCompras[i].id;
            td_fornecedor.innerText = this.arrayCompras[i].fornecedor;
            td_cnpj.innerText = this.arrayCompras[i].cnpj;
            // td_cep.innerText = this.arrayCompras[i].cep;
            // td_endereco.innerText = this.arrayCompras[i].endereco;
            td_contato.innerText = this.arrayCompras[i].contato;
            // td_numero.innerText = this.arrayCompras[i].numero;
            td_tel.innerText = this.arrayCompras[i].tel;
            td_produto.innerText = this.arrayCompras[i].produto;
            td_valorUn.innerText = this.arrayCompras[i].valorUn;
            td_quantidade.innerText = this.arrayCompras[i].quantidade;
            td_total.innerText = this.arrayCompras[i].total;                    

            let btnEdit = document.createElement("button");
            btnEdit.innerHTML = 'Editar';
            btnEdit.setAttribute("onclick","compras.preparaEdicao("+ JSON.stringify(this.arrayCompras[i]) +")");
            btnEdit.setAttribute('id', 'btnEditar');
            btnEdit.setAttribute('class', 'btnyellow');
            btnEdit.setAttribute('data-toggle','modal');
            btnEdit.setAttribute('data-target','#modalCadastro');

            let btnDel = document.createElement("button");
            btnDel.innerHTML  = 'Deletar';
            btnDel.setAttribute('id', 'btnDeletar');
            btnDel.setAttribute('class', 'btnred');
            btnDel.setAttribute("onclick","compras.deletar("+ this.arrayCompras[i].id +")");

            td_acoes.appendChild(btnEdit);
            td_acoes.appendChild(btnDel);
        }
    }

    adicionar(compras){
        compras.valorUn = parseFloat(compras.valorUn);
        this.arrayCompras.push(compras);
        this.id++;
    }

    atualizar(id, compras){
        for(let i=0; i< this.arrayCompras.length; i++){
           if(this.arrayCompras[i].id == id){
                this.arrayCompras[i].fornecedor = compras.fornecedor;
                this.arrayCompras[i].cnpj = compras.cnpj;
                this.arrayCompras[i].cep = compras.cep;
                this.arrayCompras[i].endereco = compras.endereco;
                this.arrayCompras[i].contato = compras.contato;
                this.arrayCompras[i].numero = compras.numero;
                this.arrayCompras[i].tel = compras.tel;
                this.arrayCompras[i].produto = compras.produto;
                this.arrayCompras[i].valorUn = compras.valorUn;
                this.arrayCompras[i].quantidade = compras.quantidade;
                this.arrayCompras[i].total = compras.total;
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
        
        document.getElementById('fornecedor').value = dados.fornecedor;
        document.getElementById('cnpj').value = dados.cnpj;
        document.getElementById('cep').value = dados.cep;
        document.getElementById('endereco').value = dados.endereco;
        document.getElementById('numero').value = dados.numero;
        document.getElementById('contato').value = dados.contato;
        document.getElementById('tel').value = dados.tel;
        document.getElementById('produto').value = dados.produto;
        document.getElementById('valorUn').value = dados.valorUn;
        document.getElementById('quantidade').value = dados.quantidade;
        document.getElementById('total').value = dados.total;

        document.getElementById('btn1').innerText="Atualizar";
    }

    lerDados(){
        let compras ={}
        compras.id =this.id;
        compras.fornecedor = document.getElementById('fornecedor').value;
        compras.cnpj = document.getElementById('cnpj').value;
        compras.cep = document.getElementById('cep').value;
        compras.endereco = document.getElementById('endereco').value;
        compras.numero = document.getElementById('numero').value;
        compras.contato = document.getElementById('contato').value;
        compras.tel = document.getElementById('tel').value;
        compras.produto = document.getElementById('produto').value;
        compras.valorUn = document.getElementById('valorUn').value;
        compras.quantidade = document.getElementById('quantidade').value;
        compras.total = document.getElementById('total').value;

        return compras;
    }

    validaCampos(compras){
        let msg ='';

        if(compras.fornecedor == ""){
            msg += 'Informe a Razão Social do fornecedor \n'
        }
        if(compras.cnpj == ""){
            msg += 'Insira o CNPJ do fornecedor \n'
        }
        if(compras.cep == ""){
            msg += 'Insira o de endereço do fornecedor \n'
        }
        if(compras.endereco == ""){
            msg += 'Insira o endereço do fornecedor \n'
        }
        if(compras.contato == ""){
            msg += 'Insira o nome de contato do fornecedor \n'
        }
        if(compras.numero == ""){
            msg += 'Insira o número de endereço do fornecedor \n'
        }
        if(compras.tel == ""){
            msg += 'Insira o telefone do contato \n'
        }
        if(compras.produto== ""){
            msg += 'Informe o produto a ser comprado \n'
        }
        if(compras.valorUn == ""){
            msg += 'Insira o valor Unitário do Produto \n'
        }
        if(compras.quantidade == ""){
            msg += 'Informe a quantidade de produtos a serem comprados \n'
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
        if(confirm('Deseja realmente deletar esta compra?')){
            let tbody = document.getElementById('tbody');

            for(let i=0; i <this.arrayCompras.length; i++){
                if(this.arrayCompras[i].id == id){
                    this.arrayCompras.splice(i, 1);
                    tbody.deleteRow(i);
                }
            }
        }
    }
}
var compras = new Compras();
