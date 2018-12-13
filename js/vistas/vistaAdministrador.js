/*
 * Vista administrador
 */
var VistaAdministrador = function(modelo, controlador, elementos) {
  this.modelo = modelo;
  this.controlador = controlador;
  this.elementos = elementos;
  var contexto = this;

  // suscripción de observadores
  this.modelo.preguntaAgregada.suscribir(function() {
    contexto.reconstruirLista();
  }),
  this.modelo.EliminarPregunta.suscribir(function() {
    contexto.reconstruirLista();
  }),  
  this.modelo.editandoPreguntas.suscribir(function () {
    contexto.reconstruirLista();
  }),
  this.modelo.borrarTodas.suscribir(function() {
    contexto.reconstruirLista();
  })
};


VistaAdministrador.prototype = {
  //lista
  inicializar: function() {
    //llamar a los metodos para reconstruir la lista, configurar botones y validar formularios
    validacionDeFormulario();
    this.reconstruirLista();
    this.configuracionDeBotones();
  },

  construirElementoPregunta: function(pregunta){
    var contexto = this;
    var nuevoItem;
    //completar
    //asignar a nuevoitem un elemento li con clase "list-group-item", id "pregunta.id" y texto "pregunta.textoPregunta"
    nuevoItem = $('<li/>', {
      'class' : 'list-group-item',
      id : pregunta.id,
      'texto' : pregunta.textoPregunta
    });
    var interiorItem = $('.d-flex');
    var titulo = interiorItem.find('h5');
    titulo.text(pregunta.textoPregunta);
    interiorItem.find('small').text(pregunta.cantidadPorRespuesta.map(function(resp){
      return " " + resp.textoRespuesta;
    }));
    nuevoItem.html($('.d-flex').html());
    return nuevoItem;
  },

  reconstruirLista: function() {
    var lista = this.elementos.lista;
    lista.html('');
    var preguntas = this.modelo.preguntas;
    for (var i=0;i<preguntas.length;++i){
      lista.append(this.construirElementoPregunta(preguntas[i]));
    }
  },

  configuracionDeBotones: function(){
    var e = this.elementos;
    var contexto = this;

    //asociacion de eventos a boton
    e.botonAgregarPregunta.click(function() {
      var value = e.pregunta.val();
      var respuestas = [];

      $('[name="option[]"]').each(function() {
        var respuesta = $(this).val();
        
        if ( respuesta ) {
          var nuevaRespuesta = {'textoRespuesta':respuesta,'cantidad':0};
          respuestas.push(nuevaRespuesta);
        };
        if(respuestas.length>0){
          this.modelo.agregarPregunta(value, respuestas);
        }
      })
      contexto.limpiarFormulario();
      contexto.controlador.agregarPregunta(value, respuestas);
    });
    //asociar el resto de los botones a eventos
    e.botonBorrarPregunta.click(function () {
      var id = parseInt($('.list-group-item.active').attr('id'));
      contexto.controlador.borrarPregunta(id);
    });

    e.borrarTodo.click(function () {
      var preguntas = contexto.modelo.preguntas;
      contexto.controlador.limpiarTodas(preguntas);
    });

    e.botonEditarPregunta.click(function () {
      var id = parseInt($('.list-group-item.active').attr('id'));      
      var titulo = $('#to-do');
      var PreguntaId = $('#pregunta');      
      var botonAgregar = $('#agregarPregunta');
      // var botonRespuesta = $('#optionTemplate');
      contexto.controlador.editarPregunta(id, titulo, PreguntaId, botonAgregar, /*botonRespuesta*/);
    });
  },

  limpiarFormulario: function(){
    $('.form-group.answer.has-feedback.has-success').remove();
  },
};