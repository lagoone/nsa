// Initialize your app
var myApp = new Framework7();

// Export selectors engine
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: false
});

myApp.onPageInit('formSiswa', function (page) {
	var nomor_formulir = getData("active_nomor_formulir");
	$("#formNomorFormulir").val(nomor_formulir);
	$("#noForm").val(nomor_formulir);
	var nomor_telepon = getData("active_nomor_telepon");
	$("#formNomorTelepon").val(nomor_telepon);
	ambilDataSiswa();
});

myApp.onPageInit('formOrtu', function (page) {
	var nomor_formulir = getData("active_nomor_formulir");
	$("#noForm").val(nomor_formulir);
	ambilDataOrtu();
});


myApp.onPageInit('home', function (page) {
	var nama_user = getData("active_nama");
	$("#ucapan").html("");
	$("#ucapan").append("Selamat datang Bapak/Ibu "+nama_user);
});

myApp.onPageInit('daftar', function (page) {
	$$(page.container).find('#btnKirimData').on('click', function (e) {
    	//myApp.alert('Clicked registerButton!');
    	kirimPendaftaran();
	});
});

myApp.onPageInit('formDisplay', function (page) {
	var nomor_formulir = getData("active_nomor_formulir");
	$("#formNomorFormulir").val(nomor_formulir);
	$("#noForm").val(nomor_formulir);
	var nomor_telepon = getData("active_nomor_telepon");
	$("#formNomorTelepon").val(nomor_telepon);
	ambilDataDisplay();
});

function coba()
{
	mainView.router.loadPage('formSiswa.html');
	myApp.closePanel();
}

function ambilDataDisplay()
{
	myApp.showPreloader('Proses Data...');

	var noForm = document.getElementById("noForm").value;

	var link=urlnya+'/api/nsa_api.php';

	$.ajax({
	    url: link,
	    dataType: "json",
		data: {
				function:"ambilDataSiswa",
				noForm:noForm
			  },
			   	type: 'POST'
		}).done(function(z){
			console.log(z);

			document.getElementById("formNamaLengkap").value=z.formNamaLengkap;
			document.getElementById("formTempatLahir").value=z.formTempatLahir;
			document.getElementById("formTanggalLahir").value=z.tgl_lahir;
			document.getElementById("formJenjang").value=z.formJenjang;
			document.getElementById("formJenisKelamin").value=z.kelamin;
			document.getElementById("formAlamat").value=z.alamat;
			document.getElementById("formKota").value=z.kota;
			document.getElementById("formAgama").value=z.agama;
			document.getElementById("formKewarganegaraan").value=z.warganegara;
			document.getElementById("formNamaSekolahAsal").value=z.nama_sekasal;
			document.getElementById("formMutasi").value=z.mutasi;
			var tempFormMutasi = z.mutasi;
			if(tempFormMutasi!="Tidak")
			{
				var html='<li>'+
				            '<div class="item-content">'+
				              '<div class="item-inner">'+ 
				                '<div class="item-title label">Alasan Mutasi</div>'+
				                '<div class="item-input">'+
				                  '<textarea placeholder="Alasan mutasi" id="formAlasanMutasi" disabled>'+z.alasan_mutasi+'</textarea>'+
				                '</div>'+
				              '</div>'+
				            '</div>'+
				          '</li>'+
				          '<li>'+
				            '<div class="item-content">'+
				              '<div class="item-inner"> '+
				                '<div class="item-title label">Tahun & Nomor Ijasah</div>'+
				                '<div class="item-input">'+
				                  '<input type="email" placeholder="Tahun & nomor ijasah" id="formTahunDanNomorIjasah" value ="'+z.thn_noijs+'" disabled/>'+
				                '</div>'+
				              '</div>'+
				            '</div>'+
				          '</li>'+
				          '<li>'+
				            '<div class="item-content">'+
				              '<div class="item-inner">'+ 
				                '<div class="item-title label">Nilai <b>Ujian Nasiona</b></div>'+
				                '<div class="item-input">'+
				                  '<input type="text" placeholder="Nilai ujian nasional" id="formNilaiUjianNasional" value ="'+z.nilai_unas+'" disabled/>'+
				                '</div>'+
				              '</div>'+
				            '</div>'+
				          '</li>';

				$('#tempatMutasi').html(html);
			}
			document.getElementById("formPrestasi").value=z.prestasi;
			document.getElementById("formMengetahui").value=z.formMengetahui;

			document.getElementById("formNamaAyah").value=z.namaortulaki;
			document.getElementById("formAlamatAyah").value=z.alamatortulaki;
			document.getElementById("formPendidikanAyah").value=z.pendidikanortulaki;

			document.getElementById("formAgamaAyah").value=z.agamaortulaki;
			document.getElementById("formPekerjaanAyah").value=z.pekerjaanortulaki;
			document.getElementById("formInstansiAyah").value=z.nama_instansiortulaki;
			document.getElementById("formHandphoneAyah").value=z.handphoneortulaki;
			document.getElementById("formEmailAyah").value=z.emailortulaki;

			document.getElementById("formNamaIbu").value=z.namaortuperempuan;
			document.getElementById("formAlamatIbu").value=z.alamatortuperempuan;
			document.getElementById("formPendidikanIbu").value=z.pendidikanortuperempuan;
			document.getElementById("formAgamaIbu").value=z.agamaortuperempuan;
			document.getElementById("formPekerjaanIbu").value=z.pekerjaanortuperempuan;
			document.getElementById("formInstansiIbu").value=z.nama_instansiortuperempuan;
			document.getElementById("formHandphoneIbu").value=z.handphoneortuperempuan;
			document.getElementById("formEmailIbu").value=z.emailortuperempuan;
			
			myApp.closeModal();
		}).fail(function(x){
			myApp.closeModal();
			console.log(x);
			myApp.alert(x.keterangan, 'Perhatian!');	
		});
}

function ambilDataSiswa()
{
	myApp.showPreloader('Proses Data...');

	var noForm = document.getElementById("noForm").value;

	var link=urlnya+'/api/nsa_api.php';

	$.ajax({
	    url: link,
	    dataType: "json",
		data: {
				function:"ambilDataSiswa",
				noForm:noForm
			  },
			   	type: 'POST'
		}).done(function(z){
			console.log(z);

			document.getElementById("formNamaLengkap").value=z.formNamaLengkap;
			document.getElementById("formTempatLahir").value=z.formTempatLahir;
			document.getElementById("formTanggalLahir").value=z.tgl_lahir;
			var tempJenjang = z.formJenjang;

				if(tempJenjang=="PG-TK")
				 $('#PG-TK').prop('checked', true);
				else if(tempJenjang=="SD")
				 $('#SD').prop('checked', true);
				else if(tempJenjang=="SMP")
				 $('#SMP').prop('checked', true);
				else if(tempJenjang=="SMA")
				 $('#SMA').prop('checked', true);
				else 
				 $('#PG-TK').prop('checked', true);

			var tempJenisKelamin = z.formJenisKelamin;
				if(tempJenisKelamin=="Laki Laki")
				 document.getElementById("formJenisKelamin").selectedIndex ="0";
				else
				 document.getElementById("formJenisKelamin").selectedIndex ="1";

			document.getElementById("formAlamat").value=z.alamat;
			document.getElementById("formKota").value=z.kota;
			document.getElementById("formAgama").value=z.agama;
			document.getElementById("formKewarganegaraan").value=z.warganegara;
			document.getElementById("formNamaSekolahAsal").value=z.nama_sekasal;
			document.getElementById("formMutasi").value=z.mutasi;
			var tempFormMutasi = z.mutasi;
			if(tempFormMutasi!="Tidak")
			{
				var html='<li>'+
				            '<div class="item-content">'+
				              '<div class="item-inner">'+ 
				                '<div class="item-title label">Alasan Mutasi</div>'+
				                '<div class="item-input">'+
				                  '<textarea placeholder="Alasan mutasi" id="formAlasanMutasi">'+z.alasan_mutasi+'</textarea>'+
				                '</div>'+
				              '</div>'+
				            '</div>'+
				          '</li>'+
				          '<li>'+
				            '<div class="item-content">'+
				              '<div class="item-inner"> '+
				                '<div class="item-title label">Tahun & Nomor Ijasah</div>'+
				                '<div class="item-input">'+
				                  '<input type="email" placeholder="Tahun & nomor ijasah" id="formTahunDanNomorIjasah" value ="'+z.thn_noijs+'"/>'+
				                '</div>'+
				              '</div>'+
				            '</div>'+
				          '</li>'+
				          '<li>'+
				            '<div class="item-content">'+
				              '<div class="item-inner">'+ 
				                '<div class="item-title label">Nilai <b>Ujian Nasiona</b></div>'+
				                '<div class="item-input">'+
				                  '<input type="text" placeholder="Nilai ujian nasional" id="formNilaiUjianNasional" value ="'+z.nilai_unas+'"/>'+
				                '</div>'+
				              '</div>'+
				            '</div>'+
				          '</li>';

				$('#tempatMutasi').html(html);
			}
			document.getElementById("formPrestasi").value=z.prestasi;
			//document.getElementById("formMengetahui").value=z.tahu_nsa;
			var tempTahu = z.tahu_nsa;
				if(tempTahu=="Teman")
				 document.getElementById("formMengetahui").selectedIndex ="0";
				else if(tempTahu=="RadioTv")
				 document.getElementById("formMengetahui").selectedIndex ="1";
				else if(tempTahu=="IklanMedia Cetak")
				 document.getElementById("formMengetahui").selectedIndex ="2";
				else if(tempTahu=="Internet")
				 document.getElementById("formMengetahui").selectedIndex ="3";
				else if(tempTahu=="Lainnya")
				 document.getElementById("formMengetahui").selectedIndex ="4";
				else 
				 document.getElementById("formMengetahui").selectedIndex ="0";
			
			myApp.closeModal();
		}).fail(function(x){
			myApp.closeModal();
			console.log(x);
			myApp.alert(x.keterangan, 'Perhatian!');	
		});
}

function ambilDataOrtu()
{
	myApp.showPreloader('Proses Data...');

	var noForm = document.getElementById("noForm").value;

	var link=urlnya+'/api/nsa_api.php';

	$.ajax({
	    url: link,
	    dataType: "json",
		data: {
				function:"ambilDataSiswa",
				noForm:noForm
			  },
			   	type: 'POST'
		}).done(function(z){
			console.log(z);

			document.getElementById("formNamaAyah").value=z.namaortulaki;
			document.getElementById("formAlamatAyah").value=z.alamatortulaki;
			document.getElementById("formPendidikanAyah").value=z.pendidikanortulaki;
			var tempAgama = z.agamaortulaki;
				if(tempAgama=="Islam")
				 document.getElementById("formAgamaAyah").selectedIndex ="0";
				else if(tempAgama=="Kristen Protestan")
				 document.getElementById("formAgamaAyah").selectedIndex ="1";
				else if(tempAgama=="Katholik")
				 document.getElementById("formAgamaAyah").selectedIndex ="2";
				else if(tempAgama=="Hindu")
				 document.getElementById("formAgamaAyah").selectedIndex ="3";
				else if(tempAgama=="Buddha")
				 document.getElementById("formAgamaAyah").selectedIndex ="4";
				else if(tempAgama=="Kong Hu Cu")
				 document.getElementById("formAgamaAyah").selectedIndex ="5";
				else 
				 document.getElementById("formAgamaAyah").selectedIndex ="0";
			document.getElementById("formPekerjaanAyah").value=z.pekerjaanortulaki;
			document.getElementById("formInstansiAyah").value=z.nama_instansiortulaki;
			document.getElementById("formHandphoneAyah").value=z.handphoneortulaki;
			document.getElementById("formEmailAyah").value=z.emailortulaki;

			document.getElementById("formNamaIbu").value=z.namaortuperempuan;
			document.getElementById("formAlamatIbu").value=z.alamatortuperempuan;
			document.getElementById("formPendidikanIbu").value=z.pendidikanortuperempuan;
			var tempAgama = z.agamaortuperempuan;
				if(tempAgama=="Islam")
				 document.getElementById("formAgamaIbu").selectedIndex ="0";
				else if(tempAgama=="Kristen Protestan")
				 document.getElementById("formAgamaIbu").selectedIndex ="1";
				else if(tempAgama=="Katholik")
				 document.getElementById("formAgamaIbu").selectedIndex ="2";
				else if(tempAgama=="Hindu")
				 document.getElementById("formAgamaIbu").selectedIndex ="3";
				else if(tempAgama=="Buddha")
				 document.getElementById("formAgamaIbu").selectedIndex ="4";
				else if(tempAgama=="Kong Hu Cu")
				 document.getElementById("formAgamaIbu").selectedIndex ="5";
				else 
				 document.getElementById("formAgamaIbu").selectedIndex ="0";
			document.getElementById("formPekerjaanIbu").value=z.pekerjaanortuperempuan;
			document.getElementById("formInstansiIbu").value=z.nama_instansiortuperempuan;
			document.getElementById("formHandphoneIbu").value=z.handphoneortuperempuan;
			document.getElementById("formEmailIbu").value=z.emailortuperempuan;
			
			myApp.closeModal();
		}).fail(function(x){
			myApp.closeModal();
			console.log(x);
			myApp.alert(x.keterangan, 'Perhatian!');	
		});
}


$$('.panel-left').on('panel:opened', function () {
	var nama_user = getData("active_nama");
	$("#index_name").html("");
	$("#index_name").append(nama_user);
});

$$('.panel-right').on('panel:opened', function () {
	var id_user = getData("active_user_id");
	getAllNotif(id_user);
});

function saveKelas(el){
	var id_kelas = $('#kelas_dipilih').find(":selected").val();
	saveData( "active_user_kelas",id_kelas);
	allGrupUser = null;
	getAllGrup();
	var activePage = mainView.activePage.name;

	if(activePage === "jualBeli"){
		getAllJualBeliPost();
	}else if(activePage === "lomba"){
		getAllEventPost();
	}
}


function viewRouterBack(){
	mainView.router.back();
}

function balik(){
	mainView.router.reloadPage('lomba.html');
}