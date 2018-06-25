//---------------------------------------------------------------------------------------------------------------------------------------LOGIN
function loginPost() {
	myApp.showPreloader('Mengambil data...');
	var nomor_formulir = document.getElementById("nomor_formulir").value;
	var nomor_telepon = document.getElementById("nomor_telepon").value;
	allGrupUser = null;
	$(document).ready(function() {
	if(nomor_formulir=="")
	{
		myApp.alert('Nomor formulir tidak boleh kosong', 'Perhatian!');
	}
	else
	{
		if (nomor_telepon=="") 
		{
			myApp.alert('Nomor telepon genggam tidak boleh kosong', 'Perhatian!');
		}
		else
		{
			myApp.showPreloader('Proses Data...');
			var link=urlnya+'/api/nsa_api.php';

			$.ajax({
			   url: link,
			    dataType: "json",
				data: {function:"login",nomor_formulir:nomor_formulir,nomor_telepon:nomor_telepon},
			   	type: 'POST'
			}).done(function(z){
				myApp.closeModal();
				if(z.bolehMasuk=="1")
				{
					var d = new Date();
								//exdays var lama harinya
					var exdays=1;
					if(document.getElementById('remember').checked)
					{
						var expires = "true";
					}
					else
					{
						d.setTime(d.getTime() + (exdays*24*60*60*1000));
						var expires = d.toGMTString();
					}

					saveData( "active_id",z.user.id);
					saveData( "active_nomor_formulir",z.user.form_no);
					saveData( "active_nama",z.user.nama);
					saveData( "active_email",z.user.email);
					saveData( "active_nomor_telepon",z.user.nomor_telepon);
					saveData( "expires",expires);
					var expires = getData("expires");
					console.log(expires);
					mainView.router.loadPage('home.html');
				}
				else
				{
					myApp.alert(z.keterangan, 'Perhatian!');
				}

			}).fail(function(x){
				myApp.closeModal();
				if(x.responseJSON.message != null)
				{
					myApp.alert(x.responseJSON.message, 'Perhatian!');	
				}
				else
				{
					myApp.alert(x.responseJSON.error, 'Perhatian!');
				}
			});
		}
	}
	});
	myApp.closeModal();
}

function loginBySavedData() {
	myApp.showPreloader('Mengambil data...');

	$(document).ready(function() 
	{ 
        document.addEventListener("deviceready", onDeviceReady, false);
	});
	
	var nomor_formulir = getData("active_nomor_formulir");
	var nomor_telepon = getData("active_nomor_telepon");
	var link=urlnya+'/api/nsa_api.php';
	$.ajax({
	   		url: link,
		    dataType: "json",
			data: {function:"relogin",nomor_formulir:nomor_formulir,nomor_telepon:nomor_telepon},
		   	type: 'POST'
		}).done(function(z){
			if(z.bolehMasuk=="1")
			{
				myApp.closeModal();
				myApp.closeModal();
				mainView.router.loadPage('home.html');
			}
			else
			{
				myApp.alert(z.keterangan, 'Perhatian!');
			}
		}).fail(function(x){
			myApp.closeModal();
			if(x.responseJSON.message != null)
			{
				myApp.alert(x.responseJSON.message, 'Perhatian!');	
			}
			else
			{
				myApp.alert(x.responseJSON.error, 'Perhatian!');
			}
		});
}
/*	
function cekLoginAktif() {
	$(document).ready(function() 
	{ 
        document.addEventListener("deviceready", onDeviceReady, false);
	});

	myApp.showPreloader('Mengambil data...');
	var expires="";
	var active_id="";
	active_id=getData("active_id");
	expires=getData("expires");
	//console.log(expires);
	if(active_id!="" && active_id!=null)
	{
		if(expires=="true")
		{
			loginBySavedData();
		}
		else
		{
			var d = new Date();
			var dexpires = new Date(expires);
			if(d.getTime()<dexpires.getTime())
			{
				loginBySavedData();
			}
			else
			{	
				myApp.alert('Sesi waktu anda habis, silahkan lakukan login kembali!');
				mainView.router.loadPage('login.html');
				eraseData( "active_id");
				eraseData( "active_nomor_formulir");
				eraseData( "active_nama");
				eraseData( "active_email");
				eraseData( "active_nomor_telepon");
				eraseData( "expires");
			}
		}
	}
	else
	{
		mainView.router.loadPage('login.html');
		eraseData( "active_id");
		eraseData( "active_nomor_formulir");
		eraseData( "active_nama");
		eraseData( "active_email");
		eraseData( "active_nomor_telepon");
		eraseData( "expires");
	}
	myApp.closeModal();
}*/

function cekLoginAktifAwal() {
	myApp.showPreloader('Mengambil data...');

	$(document).ready(function() 
	{ 
        document.addEventListener("deviceready", onDeviceReady, false);
	});

	var nomor_formulir = "";
	var nomor_telepon = "";
	var expires="";
	var active_id="";
	active_id = getData("active_id");
	nomor_formulir = getData("active_nomor_formulir");
	nomor_telepon = getData("active_nomor_telepon");
	expires=getData("expires");
	if(nomor_formulir!="undefined" && nomor_formulir!=null && nomor_telepon!="undefined" && nomor_telepon!=null && active_id!="undefined" && active_id!=null)
	{
		if(expires=="true")
		{
			loginBySavedData();
		}
		else
		{
			var d = new Date();
			var dexpires = new Date(expires);
			if(d.getTime()<dexpires.getTime())
			{
				loginBySavedData();
			}
			else
			{	
			console.log("dihapus2");
				myApp.alert('Sesi waktu anda habis, silahkan lakukan login kembali!');
				mainView.router.loadPage('login.html');
				eraseData( "active_id");
				eraseData( "active_nomor_formulir");
				eraseData( "active_nama");
				eraseData( "active_email");
				eraseData( "active_nomor_telepon");
				eraseData( "expires");
			}
		}
	}
	else
	{
			console.log("dihapus1");
		myApp.closeModal();
		eraseData("active_id");
		eraseData("active_nomor_formulir");
		eraseData("active_nama");
		eraseData("active_email");
		eraseData("active_nomor_telepon");
		eraseData( "expires");
		myApp.closeModal();
	}
}
