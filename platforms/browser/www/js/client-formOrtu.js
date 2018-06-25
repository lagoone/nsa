function updateFormOrtu(){
//pengecekan inputan user

	var nomor_formulir = getData("active_nomor_formulir");

	var formNamaAyah = document.getElementById("formNamaAyah").value;
	var formAlamatAyah = document.getElementById("formAlamatAyah").value;
	var formPendidikanAyah = document.getElementById("formPendidikanAyah").value;
	var formAgamaAyah = document.getElementById("formAgamaAyah").value;
	var formKewarganegaraanAyah = document.getElementById("formKewarganegaraanAyah").value;
	var formPekerjaanAyah = document.getElementById("formPekerjaanAyah").value;
	var formInstansiAyah = document.getElementById("formInstansiAyah").value;
	var formHandphoneAyah = document.getElementById("formHandphoneAyah").value;
	var formEmailAyah = document.getElementById("formEmailAyah").value;


	var formNamaIbu = document.getElementById("formNamaIbu").value;
	var formAlamatIbu = document.getElementById("formAlamatIbu").value;
	var formPendidikanIbu = document.getElementById("formPendidikanIbu").value;
	var formAgamaIbu = document.getElementById("formAgamaIbu").value;
	var formKewarganegaraanIbu = document.getElementById("formKewarganegaraanIbu").value;
	var formPekerjaanIbu = document.getElementById("formPekerjaanIbu").value;
	var formInstansiIbu = document.getElementById("formInstansiIbu").value;
	var formHandphoneIbu = document.getElementById("formHandphoneIbu").value;
	var formEmailIbu = document.getElementById("formEmailIbu").value;
	
	if(formNamaAyah=="")
	{
		myApp.alert('Silahkan isi nama ayah', 'Perhatian!');
	}
	else
	{
		if(formAlamatAyah=="")
		{
			myApp.alert('Silahkan isi alamat ayah', 'Perhatian!');
		}
		else
		{
			if(formHandphoneAyah=="")
			{
				myApp.alert('Silahkan isi nomor telepon/handphone ayah', 'Perhatian!');
			}
			else
			{
				if(formNamaIbu=="")
				{
					myApp.alert('Silahkan nama ibu', 'Perhatian!');
				}
				else
				{
					if(formAlamatIbu=="")
					{
						myApp.alert('Silahkan isi alamat ibu', 'Perhatian!');
					}
					else
					{
						if(formHandphoneIbu=="")
						{
							myApp.alert('Silahkan isi nomor telepon/handphone ibu', 'Perhatian!');
						}
						else
						{
							myApp.showPreloader('Proses Data...');
							var link=urlnya+'/api/nsa_api.php';

							$.ajax({
							    url: link,
							    dataType: "json",
								data: {
										function:"updateFormOrtu",
										noForm:nomor_formulir,

										formNamaAyah :formNamaAyah,
										formAlamatAyah :formAlamatAyah,
										formPendidikanAyah:formPendidikanAyah,
										formAgamaAyah :formAgamaAyah,
										formKewarganegaraanAyah :formKewarganegaraanAyah,
										formPekerjaanAyah :formPekerjaanAyah,
										formInstansiAyah :formInstansiAyah,
										formHandphoneAyah :formHandphoneAyah,
										formEmailAyah :formEmailAyah,

										formNamaIbu :formNamaIbu,
										formAlamatIbu :formAlamatIbu,
										formPendidikanIbu:formPendidikanIbu,
										formAgamaIbu :formAgamaIbu,
										formKewarganegaraanIbu :formKewarganegaraanIbu,
										formPekerjaanIbu :formPekerjaanIbu,
										formInstansiIbu :formInstansiIbu,
										formHandphoneIbu :formHandphoneIbu,
										formEmailIbu :formEmailIbu,
									},
							   	type: 'POST'
							}).done(function(z){
								console.log(z);
								myApp.closeModal();
								myApp.alert(z.keterangan, 'Perubahan Berhasil!');
							}).fail(function(x){
								myApp.closeModal();
								console.log(x);
								myApp.alert(x.keterangan, 'Perhatian!');	
							});
						}
					}
				}
			}
		}
	}
}
