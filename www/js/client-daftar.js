//--------------------------------------------------------------------------------------------------------------------REGISTER
function gotoRegister(){
	mainView.router.loadPage('daftar.html');
}
$(document).ready(function() 
{ 
    document.addEventListener("deviceready", onDeviceReady, false);
});


function kirimPendaftaran(){
//pengecekan inputan user
	var nama = document.getElementById("nama_register").value;
	var email = document.getElementById("email_register").value;
	var telepon = document.getElementById("telepon_register").value;
	
	if(nama=="")
	{
		myApp.alert('Silahkan isi nama anda', 'Perhatian!');
	}
	else
	{
		if(email=="")
		{
			myApp.alert('Email harus diisi', 'Perhatian!');
		}
		else
		{
			var cekEmail=validateEmail(email);
			if(cekEmail==false)
			{
				myApp.alert('Format Email anda tidak benar', 'Perhatian!');
			}
			else
			{
				if(telepon=="")
				{
					myApp.alert('Nomor telepon harus diisi', 'Perhatian!');
				}
				else
				{
					if(!isNumber(telepon))
					{
						myApp.alert('Nomor hanya boleh diisi angka', 'Perhatian!');
					}
					else
					{
						myApp.showPreloader('Proses Data...');
						var link=urlnya+'/api/nsa_api.php';

						$.ajax({
						    url: link,
						    dataType: "json",
							data: {function:"daftar",nama:nama,email:email,telepon:telepon},
					    	type: 'POST'
						}).done(function(z){
							myApp.closeModal();
							myApp.alert(z.keterangan, 'Perhatian!');
							/*
							if(z.status==true)
							{
								//mainView.router.loadPage('login.html');
								myApp.alert('Data anda berhasil dibuat, silahkan cek email untuk kode aktivasi', 'Berhasil!');
							}
							else
							{
								myApp.alert('Email telah terdaftar', 'Gagal!');
							}*/
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
			}
		}
	}
}
	
	
function setCookie2(){
	var kelas = document.getElementsByName('kelas');
	var i;
	for (i = 0; i < kelas.length; i++) {
		if (kelas[i].checked) 
		{
			if(i==0)
			{
				saveData( "kelas1",kelas[i].value);
			}
			else if(i==1)
			{
				saveData( "kelas2",kelas[i].value);
			}
			else if(i==2)
			{
				saveData( "kelas3",kelas[i].value);
			}
		}
	}
}
 
function registerPost() {
   setCookie2();
	var username = getData("username");
	//alert(username);
	var kota = getData("kota");
	//alert(kota);
	var email = getData("email");
	//alert(email);
	var password = getData("password");
	//alert(password);
	var fileInput = getData("fileInput");
	//alert(fileInput);
	var gender = getData("gender");
	if(gender=="male")
		gender="Laki-laki";
	else if(gender=="female")
		gender="Perempuan";
	//alert(gender);
	var kelas1 = getData("kelas1");
	//alert(kelas1);
	var kelas2 = getData("kelas2");
	//alert(kelas2);
	var kelas3 = getData("kelas3");
		var tempKelas=kelas1+kelas2+kelas3;
	if(tempKelas==0)
	{
		myApp.alert('Anda harus memilih minimal 1 kelas', 'Perhatian!');
	}
	else
	{
		var kelas= new Array();
		if(kelas1!=null && kelas1!="")
		{
			kelas.push(1);
		}
		if(kelas2!=null && kelas2!="")
		{
			kelas.push(2);
		}
		if(kelas3!=null && kelas3!="")
		{
			kelas.push(3);
		}
		myApp.showPreloader('Proses Data...');
		var formData = globalCookie["formData"];
		formData.append("id_kelas",kelas);
		var link=urlnya+'/api/user/registerNewUser';
		
		$.ajax({
		    url: link,
		    type: "POST",
		    data: formData,
		    processData: false,
		    contentType: false
		}).done(function(z){
			myApp.closeModal();
			if(z.status==true){
				//mainView.router.loadPage('login.html');
				myApp.alert('Data anda berhasil dibuat, silahkan cek email untuk kode aktivasi', 'Berhasil!');
				$(".file-selected").hide();
				
				saveData( "temp_active_email",email);
				saveData( "temp_active_password",password);
				
				
				eraseData("username");
				eraseData("kota");
				eraseData("email");
				eraseData("password");
				eraseData("fileInput");
				eraseData("gender");
				eraseData("kelas1");
				eraseData("kelas2");
				eraseData("kelas3");
				
				loginBySavedData();
			}else{
				myApp.alert('Email telah terdaftar', 'Gagal!');
			}
		}).fail(function(x){
			myApp.closeModal();
			if(x.responseJSON.message != null){
				myApp.alert(x.responseJSON.message, 'Perhatian!');	
			}else{
				myApp.alert(x.responseJSON.error, 'Perhatian!');
			}
			
			eraseData("username");
			eraseData("kota");
			eraseData("email");
			eraseData("password");
			eraseData("fileInput");
			eraseData("gender");
			eraseData("kelas1");
			eraseData("kelas2");
			eraseData("kelas3");
		});
	}
}