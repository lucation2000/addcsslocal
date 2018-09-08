window.addEventListener('load', function(){
    /**
     * @author Lucas Moreira Alves de Souza <lucasmoreira.as@gmail.com>
     * @version 1.0
     */

    function adicionaRemoveCSS()
    {
        //Função para remoção de CSS da página.
        function removeCSS(dado,tipo)
        {

            var style = document.getElementsByTagName('style');
            var link  = document.getElementsByTagName('link');
            
            //remove o CSS externo @import inserido via tag style
            for(var i = 0; i < style.length; i++ )
            {

                if(style[i].innerHTML.indexOf(dado) > -1)
                {
                    
                    style[i].innerHTML = style[i].innerHTML.replace(dado,'');

                    if(tipo == 2)
                    {
                        //Adiciona o nome inserido no campo ao localStorange
                        localStorage.setItem("removidoCSS", (localStorage.getItem("removidoCSS") ? localStorage.getItem("removidoCSS")+"," : '')+dado);
                    }

                }

            }

            //remove o CSS externo via tag style
            for(var i = 0; i < link.length; i++ )
            {

                if(link[i].getAttribute('href').indexOf(dado) > -1)
                {

                    link[i].remove();

                    if(tipo == 2)
                    {
                        //Adiciona o nome inserido no campo ao localStorange
                        localStorage.setItem("removidoCSS", (localStorage.getItem("removidoCSS") ? localStorage.getItem("removidoCSS")+"," : '')+dado);
                    }

                }

            }

        }

        //Adiciona CSS
        function adicionaCSS(dado,tipo)
        {

            var link = document.createElement('link');
            
            link.setAttribute('rel','stylesheet');
            link.setAttribute('media','all');
            link.setAttribute('href',dado);
            document.getElementsByTagName('head')[0].appendChild(link);
            
            if(tipo == 2)
            {
                //Adiciona o nome inserido no campo ao localStorange
                localStorage.setItem("adicionadoCSS", (localStorage.getItem("adicionadoCSS") ? localStorage.getItem("adicionadoCSS")+"," : '')+dado);
            }
        }

        //Inicia oo BOX para inserir/remover/limpar o localstorange
        //Pega dados do local Storange se hover e coloca/remove na página
        function inicio()
        {

            var removidoCSS = localStorage.getItem("removidoCSS");
            var adicionadoCSS = localStorage.getItem("adicionadoCSS");
            
            if(removidoCSS)
            {

                var removidos = removidoCSS.split(',');

                for(var i = 0; i < removidos.length; i++)
                {
                    removeCSS(removidos[i],1);
                }

            }

            if(removidoCSS)
            {
                
                var adicionados = adicionadoCSS.split(',');

                for(var i = 0; i < adicionados.length; i++)
                {
                    adicionaCSS(adicionados[i],1);
                }

            }

            //Box para manipular os arquivos
            var boxContent = '<form id="formAddCSS" name="fomAddCSS" style="display: none;    margin-bottom: 5px;"> <input type="text" name="arquivoAdd" placeholder="adicionar/remover CSS" style="    border: solid 1px #FF0000;height: 27px;vertical-align: top;"> <button id="formAddRemover" style="    border: 0;color: #FFFFFF;background-color: red;height: 27px; font-size: 12px!important;">Remover</button> <button id="formAddAdiciona" style="    border: 0;color: #FFFFFF;background-color: red;height: 27px; font-size: 12px!important;">Adicionar</button> <button id="formAddLimpar" style="    border: 0;color: #FFFFFF;background-color: red;height: 27px; font-size: 12px!important;">Limpar</button> </form> <button id="addCSSfechar" style="    border: 0;color: #FFFFFF;background-color: red;height: 27px; font-size: 12px!important;">Abrir / Fechar</button>';

            var box = document.createElement('div');
            
            box.setAttribute('id','addCSS');
            box.setAttribute('style','position: fixed; bottom: 0; left: 0; background-color: #ffd8b8; border: solid 1px #FF0000; padding: 5px; font-size: 12px!important; z-index: 400');
            document.body.appendChild(box);
            document.getElementById('addCSS').innerHTML = boxContent;
            /*

            Recomendações para o uso

            *O link do arquivo a ser removido tem que ser copiado o conteudo do atributo href na tag <link> ou o @import completo na tag <style> (Ex.: "@import('style/estilo/linhas.css');").

            * O arquivo local a ser inserido precisa ser colocado em um servidor local (Ex.: XAMPP) e no campo colocar o endereço local (Ex.: http://localhost/projeto/local.css).
            
            *Clicar no botão Adicionar, adiciona um link CSS ao documento.

            *Clicar no botão Remover, remove um link ou um @import do documento.

            *Recomenda-se remover e depois inserir o link dos arquivos. Pois, os links podem ser excluidos possuam o mesmo nome.

            *Clicar no botão Limpar, limpa todo o Local Storange.

            *Clicar no botão Fechar reduz o box e exibe apenas este botão.

            */

            document.getElementById('formAddAdiciona').onclick = function() 
            {

                adicionaCSS(fomAddCSS.arquivoAdd.value,2);
                fomAddCSS.arquivoAdd.value = "";
                return false;

            }

            document.getElementById('formAddRemover').onclick = function() 
            {

                removeCSS(fomAddCSS.arquivoAdd.value,2);
                fomAddCSS.arquivoAdd.value = "";
                return false;

            }

            document.getElementById('formAddLimpar').onclick = function() 
            {

                localStorage.clear();
                fomAddCSS.arquivoAdd.value = "";
                return false;

            }

            document.getElementById('addCSSfechar').onclick = function() 
            {

                var formulario = document.getElementById('formAddCSS');
                fomAddCSS.arquivoAdd.value = "";

                if(formulario.style.display == 'block')
                {

                    formulario.style.display = 'none';

                }
                else
                {

                    formulario.style.display = 'block';

                }

            }

        }

        inicio();

    }
    adicionaRemoveCSS();
}, false);
