function ubahMutasi(){
	var html='<li>'+
	            '<div class="item-content">'+
	              '<div class="item-inner">'+ 
	                '<div class="item-title label">Alasan Mutasi</div>'+
	                '<div class="item-input">'+
	                  '<textarea placeholder="Alasan mutasi" id="formAlasanMutasi"/></textarea>'+
	                '</div>'+
	              '</div>'+
	            '</div>'+
	          '</li>'+
	          '<li>'+
	            '<div class="item-content">'+
	              '<div class="item-inner"> '+
	                '<div class="item-title label">Tahun & Nomor Ijasah</div>'+
	                '<div class="item-input">'+
	                  '<input type="email" placeholder="Tahun & nomor ijasah" id="formTahunDanNomorIjasah"/>'+
	                '</div>'+
	              '</div>'+
	            '</div>'+
	          '</li>'+
	          '<li>'+
	            '<div class="item-content">'+
	              '<div class="item-inner">'+ 
	                '<div class="item-title label">Nilai <b>Ujian Nasiona</b></div>'+
	                '<div class="item-input">'+
	                  '<input type="text" placeholder="Nilai ujian nasional" id="formNilaiUjianNasional"/>'+
	                '</div>'+
	              '</div>'+
	            '</div>'+
	          '</li>';
	var string = $('#formMutasi').find(":selected").text();
	if(string=="Ya")
		$('#tempatMutasi').html(html);
	else
		$('#tempatMutasi').html('');
}



function updateFormSiswa(){
//pengecekan inputan user
	var formNamaLengkap = document.getElementById("formNamaLengkap").value;
	var formTempatLahir = document.getElementById("formTempatLahir").value;
	var formTanggalLahir = document.getElementById("formTanggalLahir").value;
	var formJenisKelamin = document.getElementById("formJenisKelamin").value;
	var formAlamat = document.getElementById("formAlamat").value;
	var formKota = document.getElementById("formKota").value;
	var formAgama = document.getElementById("formAgama").value;
	var formKewarganegaraan = document.getElementById("formKewarganegaraan").value;
	var formNamaSekolahAsal = document.getElementById("formNamaSekolahAsal").value;
	var formMutasi = document.getElementById("formMutasi").value;
	var formAlasanMutasi;
	var formTahunDanNomorIjasah ;
	var formNilaiUjianNasional ;
	var formPrestasi = document.getElementById("formPrestasi").value;
	var formMengetahui = $('#formMengetahui option:selected').val();
	var noForm = document.getElementById("noForm").value;
	var formJenjang = document.getElementById("formJenjang").elements["formJenjang"].value;


	if(formMutasi=="Ya")
	{
		formAlasanMutasi = document.getElementById("formAlasanMutasi").value;
		formTahunDanNomorIjasah = document.getElementById("formTahunDanNomorIjasah").value;
		formNilaiUjianNasional = document.getElementById("formNilaiUjianNasional").value;
	}
	
	if(formNamaLengkap=="")
	{
		myApp.alert('Silahkan isi nama siswa/siswi', 'Perhatian!');
	}
	else
	{
		if(formTempatLahir=="")
		{
			myApp.alert('Silahkan isi tempat lahir siswa/siswi', 'Perhatian!');
		}
		else
		{
			if(formTanggalLahir=="")
			{
				myApp.alert('Silahkan isi tanggal lahir siswa/siswi', 'Perhatian!');
			}
			else
			{
				if(formJenisKelamin=="")
				{
					myApp.alert('Silahkan isi jenis kelamin siswa/siswi', 'Perhatian!');
				}
				else
				{
					if(formAlamat=="")
					{
						myApp.alert('Silahkan isi alamat', 'Perhatian!');
					}
					else
					{
						if(formKota=="")
						{
							myApp.alert('Silahkan isi kota', 'Perhatian!');
						}
						else
						{
							if(formAgama=="")
							{
								myApp.alert('Silahkan isi agama siswa/siswi', 'Perhatian!');
							}
							else
							{
								if(formKewarganegaraan=="")
								{
									myApp.alert('Silahkan isi kewarganegaraan siswa/siswi', 'Perhatian!');
								}
								else
								{
									if(formNamaSekolahAsal=="")
									{
										myApp.alert('Silahkan isi sekolah asal siswa/siswi', 'Perhatian!');
									}
									else
									{
										if(formMutasi=="Ya")
										{
											//ISI SISANYA
											if(formAlasanMutasi=="")
											{
												myApp.alert('Silahkan isi alasan mutasi', 'Perhatian!');
											}
											else
											{
												if(formTahunDanNomorIjasah=="")
												{
													myApp.alert('Silahkan isi Tahun Dan Nomor Ijasah', 'Perhatian!');
												}
												else
												{
													if(formNilaiUjianNasional=="")
													{
														myApp.alert('Silahkan isi NILAI UJIAN NASIONAL siswa/siswi', 'Perhatian!');
													}
													else
													{
														if(formPrestasi=="")
														{
															myApp.alert('Silahkan isi prestasi siswa/siswi', 'Perhatian!');
														}
														else
														{
															if(formMengetahui=="")
															{
																myApp.alert('Silahkan isi dari mana anda tahu Nation Star Academy', 'Perhatian!');
															}
															else
															{
																//UPDATE DATA
																myApp.showPreloader('Proses Data...');
																var link=urlnya+'/api/nsa_api.php';

																$.ajax({
																    url: link,
																    dataType: "json",
																	data: {
																			function:"updateFormSiswa",
																			noForm:noForm,
																			formJenjang:formJenjang,
																			formNamaLengkap:formNamaLengkap,
																			formTempatLahir:formTempatLahir,
																			formTanggalLahir:formTanggalLahir,
																			formJenisKelamin:formJenisKelamin,
																			formAlamat:formAlamat,
																			formKota:formKota,
																			formAgama:formAgama,
																			formKewarganegaraan:formKewarganegaraan,
																			formNamaSekolahAsal:formNamaSekolahAsal,
																			formMutasi:formMutasi,
																			formAlasanMutasi:formAlasanMutasi,
																			formTahunDanNomorIjasah:formTahunDanNomorIjasah,
																			formNilaiUjianNasional:formNilaiUjianNasional,
																			formPrestasi:formPrestasi,
																			formMengetahui:formMengetahui},
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
										else//ini tidak mutasi
										{
											myApp.showPreloader('Proses Data...');
											var link=urlnya+'/api/nsa_api.php';

											$.ajax({
											    url: link,
											    dataType: "json",
												data: {
													function:"updateFormSiswa",
													noForm:noForm,
													formJenjang:formJenjang,
													formNamaLengkap:formNamaLengkap,
													formTempatLahir:formTempatLahir,
													formTanggalLahir:formTanggalLahir,
													formJenisKelamin:formJenisKelamin,
													formAlamat:formAlamat,
													formKota:formKota,
													formAgama:formAgama,
													formKewarganegaraan:formKewarganegaraan,
													formNamaSekolahAsal:formNamaSekolahAsal,
													formMutasi:formMutasi,
													formPrestasi:formPrestasi,
													formMengetahui:formMengetahui},
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
			}
		}
	}
}
