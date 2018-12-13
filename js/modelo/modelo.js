/*
 * Modelo
 */
var Modelo = function() {
  this.preguntas = localStorage.getItem('preguntas') ? JSON.parse(localStorage.getItem('preguntas')) : [];
  this.ultimoId = 0;

  //inicializacion de eventos
  this.preguntaAgregada = new Evento(this);
  this.EliminarPregunta = new Evento(this);
  this.borrarTodas = new Evento(this);
  this.editandoPreguntas = new Evento(this);
  this.agregandoVoto = new Evento(this);
};

Modelo.prototype = {
  //se obtiene el id más grande asignado a una pregunta
  obtenerUltimoId: function() {
    return this.preguntas.length - 1;
  },

  //se agrega una pregunta dado un nombre y sus respuestas
  agregarPregunta: function(nombre, respuestas) {
    var id = this.obtenerUltimoId();
    id++;
    var nuevaPregunta = {'textoPregunta': nombre, 'id': id, 'cantidadPorRespuesta': respuestas};
    this.preguntas.push(nuevaPregunta);
    this.guardar();
    this.preguntaAgregada.notificar();
  },

  borradoDePregunta: function (id) {
    this.preguntas.splice(id, 1);
    this.guardar();    
    this.EliminarPregunta.notificar();
  },

  //se guardan las preguntas
  guardar: function(){
    localStorage.setItem('preguntas', JSON.stringify(this.preguntas));
  },

  borrandoTodasPreguntas: function (preguntas) {
    preguntas.splice(0, this.preguntas.length);
    localStorage.clear();
    this.borrarTodas.notificar();
  },

   editarPregunta: function (id, titulo, preguntaId,) {
    var titulo = nuevoTitulo.html();
    this.preguntas.find(function (txtPreg) {
      if (txtPreg.id === id) {
        preguntaId.val(txtPreg.textoPregunta);
      };
    });
    titulo.text('Editar preguntas y respuestas');
    botoncambiado.text('Editar');
    nuevoTitulo.text(titulo);
    })
    this.borradoDePregunta(id);
    this.editandoPreguntas.notificar();
    this.guardar();
  },

  agregarVoto: function (nombrePregunta, respuestaSeleccionada) {    
    this.preguntas.forEach(element => {
      if (element.textoPregunta===nombrePregunta) {
        element.cantidadPorRespuesta.forEach(i=>{
          if (respuestaSeleccionada===i.textoRespuesta) {
            i.cantidad += 1;                    
          };
        });
      }
    });
    this.guardar();
    this.agregandoVoto.notificar();
    
  },
};