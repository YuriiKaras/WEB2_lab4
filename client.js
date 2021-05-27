/*
function createTable(container, mas)
{
	let mastable = JSON.parse(mas);
	let args = ['username', 'post', 'password', 'age']
	let htmltable = '<table><thead><tr>';
	for (const arg in args) {
		htmltable+='<th>' + arg + '</th>';
	}
	htmltable+='</tr></thead><tbody>';
	for(const mastabel in mastable){
		htmltable += '<tr>';
		for(const arg in args){
			htmltable += '<td>' + mastabel[arg] + '</td>';
		}
		htmltable += '</tr>';
	}
	htmltable += '</tbody><table>';
	document.getElementById(container).innerHTML = htmltable;
}
*/

$(document).ready(function(){
	function createTable(element,mas){
		$(element).empty();
		console.log(mas);        
		$('.add').show();
        $('.update').hide();
		$('<table>').addClass("table table-bordered table-primary col-6").appendTo(element);
		for(let i=0;i<mas.length;i++){
			$('<tr>').addClass('tr').appendTo('.table');
			for(let key in mas[i]){
				$('<td>').addClass('td').appendTo('.tr:last').text(mas[i][key]);
			}
			$('.tr:last .td:first').hide();
			$('<td>').appendTo('.tr:last');
			$('<button>').text('Delete').addClass('btn btn-danger').appendTo('td:last').click(function(){
				let id = $(this).parent().parent().find('td:first').text();
				console.log(id);
				deleteUser(id);
			});
			$('.tr:last .td:first').hide();
			$('<td>').appendTo('.tr:last');
			$('<button>').text('Update').addClass('btn btn-danger').appendTo('td:last').click(function(){
				let id = $(this).parent().parent().find('td:first').text();                
				let name=$(this).parent().parent().find('td:eq(1)').text();
                let age=$(this).parent().parent().find('td:eq(2)').text();
				console.log(id);
				$('.add').hide();
				$('.update').show();
				$('.name').val(name);
				$('.age').val(age);
				$('.update').click(function(){
					name=$('.name').val();
					age=$('.age').val();
					$('.name').val("");
					$('.age').val("");
					updateUser(id,name,age);
				});
			});
		}
	}
	

	function getUsers(){
		$.get('/getusers',function(data){
			createTable('#table',data);
		})
	}
	getUsers();
	function addUser(name,age){
		if(!name || !age) 
			return;
		let obj = {
			username:name,
			userage:age
		}
		$.post('/adduser',obj,function(data){
			console.log(data);
			getUsers();
		})
	}

	$('.add').click(function(){
		let name = $('.name').val();
		let age = $('.age').val();
		$('.name').val("");
		$('.age').val("");
		addUser(name, age);
	})

	
	function deleteUser(id){
		let obj = {id:id};
		$.post('/deleteuser',obj,function(data){
			console.log(data);
			getUsers();
		})
	}
	function updateUser(id, name, age){
		let obj={id:id,  username:name,  userage:age};
		$.post('/updateuser',obj,function(data){
			console.log(data);
			getUsers();
		})
	}
})


