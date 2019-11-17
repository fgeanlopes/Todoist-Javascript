var listElement = document.querySelector('#app ul');
var inputElement = document.querySelector('#app textarea');
var buttonElement = document.querySelector('#app button')

//Buscando os itens do localStorage e transformando em Array
var todos = JSON.parse(localStorage.getItem('list_todos')) || [] ;

function renderTodos(){

    // Apaga o conteudo dentro das "li" presente,
    // para evitar duplicatas
    listElement.innerHTML = '';


    // For para ler array
    // le o todos e adiciona o item ao todo
    for (todo of todos){

        // Cria o elemento li
        var todoElement = document.createElement('li');
        
        // Cria o texto do todo
        var todoText = document.createTextNode(todo);

        // Criar o elemento "a"
        var linkElement = document.createElement('a');
        
        // Adiciona no "a" o "href" e "#"
        linkElement.setAttribute('href', '#');

        //Aqui ele ira busca o nome do item selecionado com a função "indexof"
        var pos = todos.indexOf(todo);

        //Aqui esta adicionando o  Atributo "onclick" no li,
        //esse atributo recebe a funcao deleteTodo com numero do array
        //encontrado no "IndexOf"
        linkElement.setAttribute('onclick', 'deleteTodo('+pos+')');
        
        //Criar o texto "excluir"
        var linkText = document.createTextNode('Remover');

        // Adicionar o texto "excluir" dentro do "a"
        linkElement.appendChild(linkText);
        

        //Pega o "li" e adiciona o texto dentro
        todoElement.appendChild(todoText);

        //Adiciona o "a href" dentro do "li"
        todoElement.appendChild(linkElement);

        // Pega o "Ul" e adiciona o "li" dentro
        listElement.appendChild(todoElement);
    }
}

renderTodos();

function addTodo(){
    // Busca o texto que esta no campo input
    var todoText = inputElement.value;

    // Adiciona o texto recuparado no Array
    todos.push(todoText);
    
    // Apaga o conteudo do campo input
    inputElement.value = "";

    // Chama o render para ler novamenete o array
    renderTodos();
    
    //Atualiza no localStorage do Browser
    saveToStorage();
}

// Ao clicar no botão ele executa a funcao addTodo
buttonElement.onclick = addTodo;

//Função para excluir item da lista
function deleteTodo(pos){

    //Vai pegar a posição do array e remover o primeiro item
    todos.splice(pos, 1);

    renderTodos();

    //Atualiza no localStorage do Browser
    saveToStorage();
}

//Salvando no browser
function saveToStorage(){
    //Recebe o vetor de itens e converte para o formato Json
    localStorage.setItem('list_todos', JSON.stringify(todos));
}