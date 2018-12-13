/*
 * Controlador
 */
var Controlador = function(modelo) {
  this.modelo = modelo;
};

Controlador.prototype = {
  agregarPregunta: function(pregunta, respuestas) {
      this.modelo.agregarPregunta(pregunta, respuestas);
  },

  borrarPregunta: function (id) {
    this.modelo.borradoDePregunta(id);
  },

  limpiarTodas: function (preguntas) {
    this.modelo.borrandoTodasPreguntas(preguntas);
  },

  editarPregunta: function (id, changeTitle, idPregunta, btAddPregunta) {
    this.modelo.editarPregunta(id, changeTitle, idPregunta, btAddPregunta);
  },

  agregarVotos: function(){
    var contexto = this;
    $('#preguntas').find('div').each(function(){
      var nombrePregunta = $(this).attr('value');
      // console.log('nombrePregunta:',nombrePregunta);      
      var id = $(this).attr('id');      
      var respuestaSeleccionada = $('input[name=' + id + ']:checked').val();
      $('input[name=' + id + ']').prop('checked',false);
      // console.log('respuestaSeleccionada:',respuestaSeleccionada);      
      contexto.modelo.agregarVoto(nombrePregunta,respuestaSeleccionada);
    });
  },
};
