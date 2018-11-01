var trEditar
var editando = false

document.getElementById('formulario').addEventListener('submit',function(event){
	event.preventDefault()

	fetch('estudiantes.php', {
		'method': 'POST',
		'body': new FormData(document.getElementById('formulario'))
	}).then((response) => {
		return response.json()
	}).then((data) => {
		alert(data.mensaje)
	}).catch((err) => {
		alert(err)
	})

	if(editando){
		//
		trEditar.children[0].innerText = document.getElementById('identificacion').value
		trEditar.children[1].innerText = document.getElementById('nombre').value
		trEditar.children[2].innerText = document.getElementById('apellido').value
		trEditar.children[3].innerText = document.getElementById('email').value
	}else{
		let row = document.getElementById('listado').insertRow(1)
		row.insertCell(0).innerHTML = document.getElementById('identificacion').value
		row.insertCell(1).innerHTML = document.getElementById('nombre').value
		row.insertCell(2).innerHTML = document.getElementById('apellido').value
		row.insertCell(3).innerHTML = document.getElementById('email').value
		row.insertCell(4).innerHTML = '<button onclick="editar(event.target)"  class="btn btn-sm btn-warning">Editar</button> <button onclick="eliminar(event.target)" class="btn btn-sm btn-danger">Eliminar</button>'
	}


	document.getElementById('identificacion').value = ""
	document.getElementById('nombre').value = ""
	document.getElementById('apellido').value = ""
	document.getElementById('email').value = ""

	editando = false
	document.getElementById('identificacion').readOnly = false

})
function eliminar(btn){
	if(confirm('Esta seguro?')){
		let trEliminar = btn.closest('tr')
		let docEliminar = trEliminar.children[0].innerText
		fetch('estudiantes.php?doc='+docEliminar+'&tipo=2')
		.then((response) => {
			return response.json()
		})
		.then((data) => {
			alert(data.mensaje)
			trEliminar.remove()
		})
		.catch((err) => {
			alert(err)
		})
	}

}
function editar(btn){
	trEditar = btn.closest('tr')

	document.getElementById('identificacion').value = trEditar.children[0].innerText
	document.getElementById('nombre').value = trEditar.children[1].innerText
	document.getElementById('apellido').value = trEditar.children[2].innerText
	document.getElementById('email').value = trEditar.children[3].innerText
	document.getElementById('identificacion').readOnly = true
	editando = true

}

var estudiantes = []

/*
let request = new XMLHttpRequest();
request.onreadystatechange = function(){
	//console.log(this);
	if(this.status == 200 && this.readyState == 4){
		estudiantes = JSON.parse(this.response).data
		estudiantes.forEach(function(item){
			let row = document.getElementById('listado').insertRow(1)
				row.insertCell(0).innerHTML = item.nombres
				row.insertCell(1).innerHTML = item.apellidos
				row.insertCell(2).innerHTML = item.email
				row.insertCell(3).innerHTML = '<button onclick="editar(event.target)"  class="btn btn-sm btn-warning">Editar</button> <button onclick="eliminar(event.target)" class="btn btn-sm btn-danger">Eliminar</button>'
		})
	}
}
request.open('GET', 'estudiantes.php')
request.send()
*/

fetch('estudiantes.php?tipo=1').then((response) => {
	return response.json()
}).then((data) => {
	estudiantes = data.data
	estudiantes.forEach(function(item){
		let row = document.getElementById('listado').insertRow(1)
			row.insertCell(0).innerHTML = item.identificacion
			row.insertCell(1).innerHTML = item.nombres
			row.insertCell(2).innerHTML = item.apellidos
			row.insertCell(3).innerHTML = item.email
			row.insertCell(4).innerHTML = '<button onclick="editar(event.target)"  class="btn btn-sm btn-warning">Editar</button> <button onclick="eliminar(event.target)" class="btn btn-sm btn-danger">Eliminar</button>'
	})
})
