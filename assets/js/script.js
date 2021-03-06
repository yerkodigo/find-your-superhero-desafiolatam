$(document).ready(function(){

	function validateInput(value){
		//REGEXP
		var regex = new RegExp(/^[0-9]+$/);
		//VALIDATION
		if(value.match(regex)){
			//console.log(parseInt(value));
			return parseInt(value);
		} else {
			return value;
		};
	}

	$('form').submit(function(event){
		event.preventDefault();
		let valueInput = $("#superHeroInput").val(); //Valor del input 

		if( !isNaN(validateInput(valueInput)) && validateInput(valueInput) <= 732 && valueInput !== ""){
			//Cleaned error message area
			$("#errorMessage").text("");
			$('#heroStats').html("");
			$('#heroCard').html(`
				<div class="container text-center fa-3x">
					<i class="fas fa-spinner fa-pulse"></i>
				</div>
			`);

			$.ajax({
				type: "get",
				url: "https://superheroapi.com/api.php/2957577794560794/" + valueInput,
				datatype: "json",
				success: function(data){
					//Extract info of data
					let heroImage = data.image.url;
					let heroName = data.name;
					let heroConnections = data.connections["group-affiliation"];
					let heroPublisher = data.biography.publisher;
					let heroOccupation = data.work.occupation;
					let heroAppearance = data.biography["first-appearance"];
					let heroHeight = data.appearance.height;
					let heroWeight = data.appearance.weight;
					let heroAliases = data.biography.aliases;

					$('#heroCard').html(`
		<div class="card mb-3">
			<div class="row no-gutters">
				<div class="col-md-4">
					<img class="w-100" src="${heroImage}" alt="">
				</div>
				<div class="col-md-8">
					<div class="card-body">
			<h3 class="card-title">${heroName}</h3>
			<p class="card-text"><b>Conexiones:</b> ${heroConnections}</p>
			<ul class="list-group list-group-flush">
				<li class="list-group-item"><b>Publicado por:</b> ${heroPublisher}</li>
				<li class="list-group-item"><b>Ocupación:</b> ${heroOccupation}</li>
				<li class="list-group-item"><b>Primera Aparición:</b> ${heroAppearance}</li>
				<li class="list-group-item"><b>Altura:</b> ${heroHeight}</li>
				<li class="list-group-item"><b>Peso:</b> ${heroWeight}</li>
				<li class="list-group-item"><b>Alianzas: </b> ${heroAliases}</li>
			</ul>
					</div>
				</div>
			</div>
		</div>
		`);

					let estadisticas = [];
					let powerStatsData = data.powerstats

					for(let property in powerStatsData){
						estadisticas.push({
							label: property,
							y: powerStatsData[property]
						});
					};

					let config = {
						animationEnabled : true,
						title: {
							text: "Estadisticas"
						},
						data: 
						[{
							type: "pie",
							startAngle: 25,
							toolTipContent: "<b>{label}</b>: {y}%",
							showInLegend: "true",
							legendText: "{label}",
							indexLabelFontSize: 16,
							indexLabel: "{label} - {y}%",
							dataPoints: estadisticas
						}]
					}

					let chart = new CanvasJS.Chart("heroStats", config);
					$("#chartSection").attr("class", "mb-5 py-5");
					$("#heroStats").attr({class: "container" ,style: "height:300px"});
					chart.render();

				},
			})
		} else {
			$("#errorMessage").text("Error: Ingrese un numero valido entre 1 y 732");
			$("#heroCard").html("");
			$("#heroStats").html("");
		};
	});
});
