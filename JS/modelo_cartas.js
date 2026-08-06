let arrayCategoriasCartas = JSON.parse(localStorage.getItem('categoriasCartas')) || [];

function exibeCategoriasCadastradas(){
    document.getElementById('exibeCadastroNovaCategoriaCartas').classList.remove('d-none');
    document.getElementById('alertaCategoria').classList.add('uppercase','text-center');
    document.getElementById('alertaCategoria').style.fontSize = '0.8rem';

    if(arrayCategoriasCartas.length === 0){
        document.getElementById('alertaCategoria').innerText = 'Não foram encontrados cadastros de Categorias para modelos de cartas.'
    }
    else{
        document.getElementById('alertaCategoria').innerText = `Foram encontrados <b>${arrayCategoriasCartas.length} cadastros de categorias</b> para modelos de cartas.`
        for(let i=0;i< arrayCategoriasCartas.length;i++){
            
        }
    }
    
}


