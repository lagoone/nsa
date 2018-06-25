<?php


header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT');

    $input = json_decode(file_get_contents('php://input'),true);
    date_default_timezone_set("Asia/Jakarta");
    
    // connect to the mysql database
    $request = explode('/', trim($_SERVER['PATH_INFO'],'/'));
    $request_link = explode('||', trim($_SERVER['PATH_INFO']));
    $link = mysql_connect('localhost', 'btsuser', '12345678qwertyui');
    //$link = mysql_connect('localhost', 'root', '');
    if (!$link) 
    {
        die('Could not connect: ' . mysql_error());
    }
    //mysql_select_db( 'graphid5_nsayppi',$link);
    mysql_select_db( 'btsdb',$link);
    
    //=====================================================================================================
    
    $method = $_SERVER['REQUEST_METHOD'];
    $headers = getallheaders();
    $response = array();
    $data=json_encode($headers);
    //$api_key = $headers['X-Api-Key'];
    $home = "http://bts.neoalitcahya.com/";
    
    $apiku="f6afbb9f7de386d0ed505757bfcb5394";
    
    $tanggal=date("Y-m-d H:i:s");
    
    //NOTE FUNGSI YANG ADA
    //METHOD POST
    /*
        1. daftar [untuk registrasi]
        2. login [untuk login]
    */
    
    //if($api_key == 'ba219d2764355ba71d64840cfd2f1b35') 
    //{
    	if($method=='POST')
        { 
            $hasilResponse=array();
            $function = preg_replace('/[^a-z 0-9_()]+/i','',urldecode($_POST['function']));
            
            if($function == "daftar")
            {
                $nama   = preg_replace('/[^a-z0-9 _@.\-]+/i','',urldecode($_POST['nama']));
                $nama       = str_replace("'","''",$nama);
                
                $email  = preg_replace('/[^a-z0-9 _@.\-]+/i','',urldecode($_POST['email']));
                $email  = str_replace("'","''",$email);
                
                $telepon    = preg_replace('/[^a-z0-9 _@.\-]+/i','',urldecode($_POST['telepon']));
                $telepon    = str_replace("'","''",$telepon);

                if($nama=="")
                {
                    $hasilResponse = array(
                        'status' => "1",
                        'bolehMasuk' => '0',
                        'keterangan' => "Nama harus diisi",
                    );

                    echo json_encode($hasilResponse);
                    exit();
                }
                else
                {
                    if($email=="")
                    {
                        $hasilResponse = array(
                            'status' => "1",
                            'bolehMasuk' => '0',
                            'keterangan' => "Email harus diisi",
                        );
                                                    
                        echo json_encode($hasilResponse);
                        exit();
                    }
                    else
                    {
                        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) 
                        {
                            $hasilResponse = array(
                                'status' => "1",
                                'bolehMasuk' => '0',
                                'keterangan' => "Email yang Anda daftarkan tidak valid",
                            );
                                                        
                            echo json_encode($hasilResponse);
                            exit();
                        }
                        else
                        {
                            if($telepon=="")
                            {
                                $hasilResponse = array(
                                    'status' => "1",
                                    'bolehMasuk' => '0',
                                    'keterangan' => "Nomor telepon harus diisi",
                                );
                                                            
                                echo json_encode($hasilResponse);
                                exit();
                            }
                            else
                            {
                                if(!is_numeric($telepon))
                                {
                                    $hasilResponse = array(
                                        'status' => "1",
                                        'bolehMasuk' => '0',
                                        'keterangan' => "Nomor telepon harus diisi angka",
                                    );
                                                                
                                    echo json_encode($hasilResponse);
                                    exit();
                                }
                                else
                                {
                               		$sql="INSERT INTO no_form (date, nama_pendaftar, email, no_hp) VALUES ('$tanggal','$nama','$email','$telepon')";
                               		$result = mysql_query($sql,$link);
                               		$temp;
                               		if (!$result) {
						$temp=mysql_error();
					}
					
					//template Email pendaftaran
		                        $headers  = "From: Nation Star Academy <info@nationstaracademy.sch.id>" . "\r\n";
		                        $headers .= 'MIME-Version: 1.0' . "\r\n";
		                        $headers .= "Content-type: text/html; charset=iso-8859-1\r\n";
		                        
		                        $subject = "Pendaftaran berhasil NSA-YPPI";
		                        $body='<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "https://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
		                                            <html xmlns="https://www.w3.org/1999/xhtml">
		                                             <head>
		                                              <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		                                              <title>ArdilesMetro</title>
		                                              <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
		                                            </head>
		                                            </html>
		                                            <div id="div1" style="width:600px;">
		                                             <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
		                                                 <tr>
		                                                  <td bgcolor="#ffffff" style="padding: 0px 30px 40px 30px; color: #153643; font-family: Arial, sans-serif; font-size: 18px;" >
		                                                        <table border="0" cellpadding="0" cellspacing="0" >
		                                                         <tr>
		                                                          <td>
		                                                            <center>
		                                                                <h3><p>Pendaftaran berhasil, data anda berhasil tersimpan dalam pusat data NSA-YPPI!</p></h3>
		                                                            </center>
		                                                                <h5><center>Anda akan dihubungi kembali untuk proses selanjutnya untuk pembayaran formulir </center>
		                                                                <br>
		                                                                <br>Nomor Telepon yang didaftarkan : '.$telepon.'</h5>
		                                                          </td>
		                                                         </tr>
		                                                        </table>
		                                                    </td>
		                                                 </tr>
		                                                 
		                                                </table>
		                                            </div>';
		    					$to = $email;
		                        mail($to, $subject, $body, $headers);
                               		
                                    //ISI SEMUA DATA
                                    $hasilResponse = array(
                                        'status' => "1",
                                        'bolehMasuk' => '1',
                                        'keterangan' => "Data anda berhasil tersimpan dalam pusat data NSA-YPPI, silahkan cek email anda",
                                    );
                                                                
                                    echo json_encode($hasilResponse);
                                    exit();
                                }
                            }
                        }
                    }
                }
            }
            else if($function == "login")
            {
                $nomor_formulir= preg_replace('/[^a-z0-9 _@.\-]+/i','',urldecode($_POST['nomor_formulir']));
                $nomor_formulir= str_replace("'","''",$nomor_formulir);
                
                $nomor_telepon= preg_replace('/[^a-z0-9 _@.\-]+/i','',urldecode($_POST['nomor_telepon']));
                $nomor_telepon= str_replace("'","''",$nomor_telepon);

                if($nomor_formulir=="")
                {
                    $hasilResponse = array(
                        'status' => "1",
                        'bolehMasuk' => '0',
                        'keterangan' => "Nomor formulir harus diisi",
                    );

                    echo json_encode($hasilResponse);
                    exit();
                }
                else
                {
                    if($nomor_telepon=="")
                    {
                        $hasilResponse = array(
                            'status' => "1",
                            'bolehMasuk' => '0',
                            'keterangan' => "Nomor telepon harus diisi",
                        );
                                                    
                        echo json_encode($hasilResponse);
                        exit();
                    }
                    else
                    {
                        $sql="SELECT * FROM no_form WHERE form_no ='$nomor_formulir' AND no_hp='$nomor_telepon'";
                        $result = mysql_query($sql,$link);
                        $temp;
                        if (!$result) 
                        {
							$temp=mysql_error();
						}
                        $banyak_data=mysql_num_rows($result);
                        if($banyak_data>0)
                        {
                        	$row=mysql_fetch_array($result);
                        	$user= array(
                        		"id" => $row["id_noform"],
                        		"form_no" => $row["form_no"],
                        		"nama" => $row["nama_pendaftar"],
                        		"email" => $row["email"],
                        		"nomor_telepon" => $row["no_hp"]
                        	);
                        	//ISI SEMUA DATA
                        	$hasilResponse = array(
                                	'status' => "1",
                                        'bolehMasuk' => '1',
                                        'keterangan' => "Data yang anda masukkan sesuai",
                                        'user' => $user
                        	);
                        	echo json_encode($hasilResponse);
                        	exit();
                        }
                        else
                        {
                        	//ISI SEMUA DATA
                        	$hasilResponse = array(
                                	'status' => "1",
                                        'bolehMasuk' => '0',
                                        'keterangan' => "Data yang anda kirim tidak ditemukan",
                        	);
                        	echo json_encode($hasilResponse);
                        	exit();
                        }          
                    }
                }
            }
            else if($function == "relogin")
            {
                $nomor_formulir= preg_replace('/[^a-z0-9 _@.\-]+/i','',urldecode($_POST['nomor_formulir']));
                $nomor_formulir= str_replace("'","''",$nomor_formulir);
                
                $nomor_telepon= preg_replace('/[^a-z0-9 _@.\-]+/i','',urldecode($_POST['nomor_telepon']));
                $nomor_telepon= str_replace("'","''",$nomor_telepon);

                if($nomor_formulir=="")
                {
                    $hasilResponse = array(
                        'status' => "1",
                        'bolehMasuk' => '0',
                        'keterangan' => "Silahkan login ulangi",
                    );

                    echo json_encode($hasilResponse);
                    exit();
                }
                else
                {
                    if($nomor_telepon=="")
                    {
                        $hasilResponse = array(
                            'status' => "1",
                            'bolehMasuk' => '0',
                            'keterangan' => "Silahkan login ulang",
                        );
                                                    
                        echo json_encode($hasilResponse);
                        exit();
                    }
                    else
                    {
                        $sql="SELECT * FROM no_form WHERE form_no ='$nomor_formulir' AND no_hp='$nomor_telepon'";
                        $result = mysql_query($sql,$link);
                        $temp;
                        if (!$result) 
                        {
							$temp=mysql_error();
						}
                        $banyak_data=mysql_num_rows($result);
                        if($banyak_data>0)
                        {
                        	$row=mysql_fetch_array($result);
                        	$user= array(
                        		"id" => $row["id_noform"],
                        		"form_no" => $row["form_no"],
                        		"nama" => $row["nama_pendaftar"],
                        		"email" => $row["email"],
                        		"nomor_telepon" => $row["no_hp"]
                        	);
                        	//ISI SEMUA DATA
                        	$hasilResponse = array(
                                	'status' => "1",
                                        'bolehMasuk' => '1',
                                        'keterangan' => "Data yang anda masukkan sesuai",
                                        'user' => $user
                        	);
                        	echo json_encode($hasilResponse);
                        	exit();
                        }
                        else
                        {
                        	//ISI SEMUA DATA
                        	$hasilResponse = array(
                                	'status' => "1",
                                        'bolehMasuk' => '0',
                                        'keterangan' => "Silahkan login ulang",
                        	);
                        	echo json_encode($hasilResponse);
                        	exit();
                        }          
                    }
                }
            }
            else if($function == "updateFormSiswa")
            {
                $noForm   = preg_replace('/[^a-z0-9 _@.\-]+/i','',urldecode($_POST['noForm']));
                $noForm       = str_replace("'","''",$noForm);

                $formJenjang   = preg_replace('/[^a-z0-9 _@.\-]+/i','',urldecode($_POST['formJenjang']));
                $formJenjang       = str_replace("'","''",$formJenjang);

                $formNamaLengkap   = preg_replace('/[^a-z0-9 _@.\-]+/i','',urldecode($_POST['formNamaLengkap']));
                $formNamaLengkap       = str_replace("'","''",$formNamaLengkap);
                
                $formTempatLahir  = preg_replace('/[^a-z0-9 _@.\-]+/i','',urldecode($_POST['formTempatLahir']));
                $formTempatLahir  = str_replace("'","''",$formTempatLahir);

                $formTanggalLahir  = preg_replace('/[^a-z0-9 _@.\-]+/i','',urldecode($_POST['formTanggalLahir']));
                $formTanggalLahir  = str_replace("'","''",$formTanggalLahir);
                
                $formJenisKelamin    = preg_replace('/[^a-z0-9 _@.\-]+/i','',urldecode($_POST['formJenisKelamin']));
                $formJenisKelamin    = str_replace("'","''",$formJenisKelamin);

                $formAlamat    = preg_replace('/[^a-z0-9 _@.\-]+/i','',urldecode($_POST['formAlamat']));
                $formAlamat    = str_replace("'","''",$formAlamat);

                $formKota    = preg_replace('/[^a-z0-9 _@.\-]+/i','',urldecode($_POST['formKota']));
                $formKota    = str_replace("'","''",$formKota);

                $formAgama    = preg_replace('/[^a-z0-9 _@.\-]+/i','',urldecode($_POST['formAgama']));
                $formAgama    = str_replace("'","''",$formAgama);

                $formKewarganegaraan    = preg_replace('/[^a-z0-9 _@.\-]+/i','',urldecode($_POST['formKewarganegaraan']));
                $formKewarganegaraan    = str_replace("'","''",$formKewarganegaraan);

                $formNamaSekolahAsal    = preg_replace('/[^a-z0-9 _@.\-]+/i','',urldecode($_POST['formNamaSekolahAsal']));
                $formNamaSekolahAsal    = str_replace("'","''",$formNamaSekolahAsal);

                $formMutasi    = preg_replace('/[^a-z0-9 _@.\-]+/i','',urldecode($_POST['formMutasi']));
                $formMutasi    = str_replace("'","''",$formMutasi);

                $formAlasanMutasi    = preg_replace('/[^a-z0-9 _@.\-]+/i','',urldecode($_POST['formAlasanMutasi']));
                $formAlasanMutasi    = str_replace("'","''",$formAlasanMutasi);

                $formTahunDanNomorIjasah    = preg_replace('/[^a-z0-9 _@.\-]+/i','',urldecode($_POST['formTahunDanNomorIjasah']));
                $formTahunDanNomorIjasah    = str_replace("'","''",$formTahunDanNomorIjasah);

                $formNilaiUjianNasional    = preg_replace('/[^a-z0-9 _@.\-]+/i','',urldecode($_POST['formNilaiUjianNasional']));
                $formNilaiUjianNasional    = str_replace("'","''",$formNilaiUjianNasional);

                $formPrestasi    = preg_replace('/[^a-z0-9 _@.\-]+/i','',urldecode($_POST['formPrestasi']));
                $formPrestasi    = str_replace("'","''",$formPrestasi);

                $formMengetahui    = preg_replace('/[^a-z0-9 _@.\-]+/i','',urldecode($_POST['formMengetahui']));
                $formMengetahui    = str_replace("'","''",$formMengetahui);

                if($formNamaLengkap=="")
				{
					$hasilResponse = array(
                        'status' => "1",
                        'bolehMasuk' => '0',
                        'keterangan' => "Nama lengkap siswa/siswi harus diisi",
                    );

                    echo json_encode($hasilResponse);
                    exit();
				}
				else
				{
					if($formTempatLahir=="")
					{
						$hasilResponse = array(
	                        'status' => "1",
	                        'bolehMasuk' => '0',
	                        'keterangan' => "Tempat lahir siswa/siswi harus diisi",
	                    );

	                    echo json_encode($hasilResponse);
	                    exit();
					}
					else
					{
						if($formTanggalLahir=="")
						{
							$hasilResponse = array(
		                        'status' => "1",
		                        'bolehMasuk' => '0',
		                        'keterangan' => "Tanggal lahir siswa/siswi harus diisi",
		                    );

		                    echo json_encode($hasilResponse);
		                    exit();
						}
						else
						{
							if($formJenisKelamin=="")
							{
								$hasilResponse = array(
			                        'status' => "1",
			                        'bolehMasuk' => '0',
			                        'keterangan' => "Jenis kelamin siswa/siswi harus diisi",
			                    );

			                    echo json_encode($hasilResponse);
			                    exit();
							}
							else
							{
								if($formAlamat=="")
								{
									$hasilResponse = array(
				                        'status' => "1",
				                        'bolehMasuk' => '0',
				                        'keterangan' => "Alamat siswa/siswi harus diisi",
				                    );

				                    echo json_encode($hasilResponse);
				                    exit();
								}
								else
								{
									if($formKota=="")
									{
										$hasilResponse = array(
					                        'status' => "1",
					                        'bolehMasuk' => '0',
					                        'keterangan' => "Kota harus diisi",
					                    );

					                    echo json_encode($hasilResponse);
					                    exit();
									}
									else
									{
										if($formAgama=="")
										{
											$hasilResponse = array(
						                        'status' => "1",
						                        'bolehMasuk' => '0',
						                        'keterangan' => "Agama siswa/siswi harus diisi",
						                    );

						                    echo json_encode($hasilResponse);
						                    exit();
										}
										else
										{
											if($formKewarganegaraan=="")
											{
												$hasilResponse = array(
							                        'status' => "1",
							                        'bolehMasuk' => '0',
							                        'keterangan' => "Kewarganegaraan siswa/siswi harus diisi",
							                    );

							                    echo json_encode($hasilResponse);
							                    exit();
											}
											else
											{
												if($formMutasi=="Ya")
												{
													//ISI SISANYA
													if($formMengetahui=="")
													{
														$hasilResponse = array(
									                        'status' => "1",
									                        'bolehMasuk' => '0',
									                        'keterangan' => "Dari mana anda mengenal NSA harus diisi",
									                    );

									                    echo json_encode($hasilResponse);
									                    exit();
													}
													else
													{
														$sql="SELECT * FROM form_ptab WHERE no_form ='$noForm' ";
														$result=mysql_query($sql);
														if(mysql_num_rows($result)==0)
														{
															//INSERT DATA BARU
															$sql="INSERT INTO form_ptab (`date`,`update`,no_form,jenjang,nama_siswa, tempat_lahir,tgl_lahir,kelamin,alamat,kota,agama,warganegara,nama_sekasal,mutasi,alasan_mutasi, thn_noijs, nilai_unas,prestasi, tahu_nsa) VALUES ('$tanggal','$tanggal','$noForm','$formJenjang','$formNamaLengkap','$formTempatLahir','$formTanggalLahir','$formJenisKelamin','$formAlamat','$formKota','$formAgama','$formKewarganegaraan','$formNamaSekolahAsal','$formMutasi','$formAlasanMutasi','$formTahunDanNomorIjasah', '$formNilaiUjianNasional','$formPrestasi','$formMengetahui')";
															$result=mysql_query($sql);

															$hasilResponse = array(
										                        'status' => "1",
										                        'bolehMasuk' => '1',
										                        'keterangan' => "Data berhasil ditambahkan",
										                    );

										                    echo json_encode($hasilResponse);
										                    exit();
														}
														else
														{
															//UPDATE DATA
															$sql="UPDATE form_ptab SET `update`='$tanggal',jenjang='$formJenjang',nama_siswa='$formNamaLengkap',tempat_lahir='$formTempatLahir',tgl_lahir='$formTanggalLahir',kelamin='$formJenisKelamin',alamat='$formAlamat',kota='$formKota',agama='$formAgama',warganegara='$formKewarganegaraan',nama_sekasal='$formNamaSekolahAsal',mutasi='$formMutasi',alasan_mutasi='$formAlasanMutasi', thn_noijs='$formTahunDanNomorIjasah', nilai_unas='$formNilaiUjianNasional',prestasi='$formPrestasi', tahu_nsa='$formMengetahui' WHERE no_form ='$noForm' ";
															$result=mysql_query($sql);

															$hasilResponse = array(
										                        'status' => "1",
										                        'bolehMasuk' => '1',
										                        'keterangan' => "Data berhasil diubah",
										                    );

										                    echo json_encode($hasilResponse);
										                    exit();
														}
													}
												}
												else//TIDAK MUTASI
												{
													//ISI SISANYA
													if($formMengetahui=="")
													{
														$hasilResponse = array(
									                        'status' => "1",
									                        'bolehMasuk' => '0',
									                        'keterangan' => "Dari mana anda mengenal NSA harus diisi",
									                    );

									                    echo json_encode($hasilResponse);
									                    exit();
													}
													else
													{
														$sql="SELECT * FROM form_ptab WHERE no_form ='$noForm' ";
														$result=mysql_query($sql);
														if(mysql_num_rows($result)==0)
														{
															//INSERT DATA BARU
															$sql="INSERT INTO form_ptab (`date`,`update`,no_form,jenjang,nama_siswa,tempat_lahir,tgl_lahir,kelamin,alamat,kota,agama,warganegara,nama_sekasal,mutasi,prestasi,tahu_nsa) VALUES ('$tanggal','$tanggal','$noForm','$formJenjang','$formNamaLengkap','$formTempatLahir','$formTanggalLahir','$formJenisKelamin','$formAlamat','$formKota','$formAgama','$formKewarganegaraan','$formNamaSekolahAsal','$formMutasi','$formPrestasi','$formMengetahui')";
															$result=mysql_query($sql);

															$hasilResponse = array(
										                        'status' => "1",
										                        'bolehMasuk' => '1',
										                        'keterangan' => "Data berhasil ditambahkan",
										                    );

										                    echo json_encode($hasilResponse);
										                    exit();
														}
														else
														{
															//UPDATE DATA
															$sql="UPDATE form_ptab SET `update`='$tanggal',jenjang='$formJenjang',nama_siswa='$formNamaLengkap',tempat_lahir='$formTempatLahir',tgl_lahir='$formTanggalLahir',kelamin='$formJenisKelamin',alamat='$formAlamat',kota='$formKota',agama='$formAgama',warganegara='$formKewarganegaraan',nama_sekasal='$formNamaSekolahAsal',mutasi='$formMutasi', prestasi='$formPrestasi', tahu_nsa='$formMengetahui' WHERE no_form ='$noForm' ";
															$result=mysql_query($sql);

															$hasilResponse = array(
										                        'status' => "1",
										                        'bolehMasuk' => '1',
										                        'keterangan' => "Data berhasil diubah",
										                    );

										                    echo json_encode($hasilResponse);
										                    exit();
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
            }
            else if($function == "ambilDataSiswa")
            {
                $noForm   = preg_replace('/[^a-z0-9 _@.\-]+/i','',urldecode($_POST['noForm']));
                $noForm       = str_replace("'","''",$noForm);

                if($noForm=="")
                {
                    $hasilResponse = array(
                        'status' => "1",
                        'bolehMasuk' => '0',
                        'keterangan' => "Silahkan login kembali",
                    );

                    echo json_encode($hasilResponse);
                    exit();
                }
                else
                {

                	$sql="SELECT * FROM form_ptab WHERE no_form=$noForm";
                	$result = mysql_query($sql,$link);
                    if (!$result) 
                    {
						$temp=mysql_error();
					}
                    $row=mysql_fetch_array($result);
                    $id_formptab=$row['id_formptab'];

                    $sql="SELECT * FROM ortu_laki WHERE id_formptab=$id_formptab";
                	$result = mysql_query($sql,$link);
                    if (!$result) 
                    {
						$temp=mysql_error();
					}
                    $row2=mysql_fetch_array($result);

                    $sql="SELECT * FROM ortu_perempuan WHERE id_formptab=$id_formptab";
                	$result = mysql_query($sql,$link);
                    if (!$result) 
                    {
						$temp=mysql_error();
					}
                    $row3=mysql_fetch_array($result);

                    $sql="SELECT * FROM saudara WHERE id_formptab=$id_formptab";
                	$result = mysql_query($sql,$link);
                    if (!$result) 
                    {
						$temp=mysql_error();
					}
					$arrSaudara = array();
                    while($row4=mysql_fetch_array($result))
                    {
                    	$hasilResponse = array(
                        'saudara' => $row4["saudara"],
                        'usia' => $row4["usia"],
                        'nama_sekolah' => $row4["nama_sekolah"],
                        'kelas' => $row4["kelas"],
                    	);
                    	array_push($arrSaudara);
                    }

                    $hasilResponse = array(
                        'status' => "1",
                        'bolehMasuk' => '1',
                        'formThnAjaran' => $row['thn_ajaran'],
                        'formJenjang' => $row['jenjang'],
                        'formNamaLengkap' => $row['nama_siswa'],
                        'formKelas' => $row['kelas'],
                        'formTempatLahir' => $row['tempat_lahir'],
                        'tgl_lahir' => $row['tgl_lahir'],
                        'kelamin' => $row['kelamin'],
                        'alamat' => $row['alamat'],
                        'kota' => $row['kota'],
                        'agama' => $row['agama'],
                        'warganegara' => $row['warganegara'],
                        'nama_sekasal' => $row['nama_sekasal'],
                        'mutasi' => $row['mutasi'],
                        'alasan_mutasi' => $row['alasan_mutasi'],
                        'thn_noijs' => $row['thn_noijs'],
                        'nilai_unas' => $row['nilai_unas'],
                        'prestasi' => $row['prestasi'],
                        'tahu_nsa' => $row['tahu_nsa'],

                        'id_ortulaki' => $row2['id_ortulaki'],
                        'namaortulaki' => $row2['nama'],
                        'tmp_tgllahirortulaki' => $row2['tmp_tgllahir'],
                        'alamatortulaki' => $row2['alamat'],
                        'agamaortulaki' => $row2['agama'],
                        'warganegaraortulaki' => $row2['warganegara'],
                        'pendidikanortulaki' => $row2['pendidikan'],
                        'nama_sekortulaki' => $row2['nama_sek'],
                        'pekerjaanortulaki' => $row2['pekerjaan'],
                        'nama_instansiortulaki' => $row2['nama_instansi'],
                        'tel_rumahortulaki' => $row2['tel_rumah'],
                        'handphoneortulaki' => $row2['handphone'],
                        'emailortulaki' => $row2['email'],
                        'keteranganortulaki' => $row2['keterangan'],

                        'id_ortuperempuan' => $row3['id_ortuperempuan'],
                        'namaortuperempuan' => $row3['nama'],
                        'tmp_tgllahirortuperempuan' => $row3['tmp_tgllahir'],
                        'alamatortuperempuan' => $row3['alamat'],
                        'agamaortuperempuan' => $row3['agama'],
                        'warganegaraortuperempuan' => $row3['warganegara'],
                        'pendidikanortuperempuan' => $row3['pendidikan'],
                        'nama_sekortuperempuan' => $row3['nama_sek'],
                        'pekerjaanortuperempuan' => $row3['pekerjaan'],
                        'nama_instansiortuperempuan' => $row3['nama_instansi'],
                        'tel_rumahortuperempuan' => $row3['tel_rumah'],
                        'handphoneortuperempuan' => $row3['handphone'],
                        'emailortuperempuan' => $row3['email'],
                        'keteranganortuperempuan' => $row3['keterangan'],

                        'listSaudara' => $arrSaudara,
                        'keterangan' => "Data berhasil diambil",
                    );

                    echo json_encode($hasilResponse);
                    exit();
                }
            }
            else if($function == "updateFormOrtu")
            {
                $noForm   = preg_replace('/[^a-z0-9 _@.\-]+/i','',urldecode($_POST['noForm']));
                $noForm       = str_replace("'","''",$noForm);

                $formNamaAyah   = preg_replace('/[^a-z0-9 _@.\-]+/i','',urldecode($_POST['formNamaAyah']));
                $formNamaAyah       = str_replace("'","''",$formNamaAyah);

                $formAlamatAyah   = preg_replace('/[^a-z0-9 _@.\-]+/i','',urldecode($_POST['formAlamatAyah']));
                $formAlamatAyah       = str_replace("'","''",$formAlamatAyah);
                
                $formPendidikanAyah  = preg_replace('/[^a-z0-9 _@.\-]+/i','',urldecode($_POST['formPendidikanAyah']));
                $formPendidikanAyah  = str_replace("'","''",$formPendidikanAyah);

                $formAgamaAyah  = preg_replace('/[^a-z0-9 _@.\-]+/i','',urldecode($_POST['formAgamaAyah']));
                $formAgamaAyah  = str_replace("'","''",$formAgamaAyah);
                
                $formKewarganegaraanAyah    = preg_replace('/[^a-z0-9 _@.\-]+/i','',urldecode($_POST['formKewarganegaraanAyah']));
                $formKewarganegaraanAyah    = str_replace("'","''",$formKewarganegaraanAyah);

                $formPekerjaanAyah    = preg_replace('/[^a-z0-9 _@.\-]+/i','',urldecode($_POST['formPekerjaanAyah']));
                $formPekerjaanAyah    = str_replace("'","''",$formPekerjaanAyah);

                $formInstansiAyah    = preg_replace('/[^a-z0-9 _@.\-]+/i','',urldecode($_POST['formInstansiAyah']));
                $formInstansiAyah    = str_replace("'","''",$formInstansiAyah);

                $formHandphoneAyah    = preg_replace('/[^a-z0-9 _@.\-]+/i','',urldecode($_POST['formHandphoneAyah']));
                $formHandphoneAyah    = str_replace("'","''",$formHandphoneAyah);

                $formEmailAyah    = preg_replace('/[^a-z0-9 _@.\-]+/i','',urldecode($_POST['formEmailAyah']));
                $formEmailAyah    = str_replace("'","''",$formEmailAyah);

                $formNamaIbu   = preg_replace('/[^a-z0-9 _@.\-]+/i','',urldecode($_POST['formNamaIbu']));
                $formNamaIbu       = str_replace("'","''",$formNamaIbu);

                $formAlamatIbu   = preg_replace('/[^a-z0-9 _@.\-]+/i','',urldecode($_POST['formAlamatIbu']));
                $formAlamatIbu       = str_replace("'","''",$formAlamatIbu);
                
                $formPendidikanIbu  = preg_replace('/[^a-z0-9 _@.\-]+/i','',urldecode($_POST['formPendidikanIbu']));
                $formPendidikanIbu  = str_replace("'","''",$formPendidikanIbu);

                $formAgamaIbu  = preg_replace('/[^a-z0-9 _@.\-]+/i','',urldecode($_POST['formAgamaIbu']));
                $formAgamaIbu  = str_replace("'","''",$formAgamaIbu);
                
                $formKewarganegaraanIbu    = preg_replace('/[^a-z0-9 _@.\-]+/i','',urldecode($_POST['formKewarganegaraanIbu']));
                $formKewarganegaraanIbu    = str_replace("'","''",$formKewarganegaraanIbu);

                $formPekerjaanIbu    = preg_replace('/[^a-z0-9 _@.\-]+/i','',urldecode($_POST['formPekerjaanIbu']));
                $formPekerjaanIbu    = str_replace("'","''",$formPekerjaanIbu);

                $formInstansiIbu    = preg_replace('/[^a-z0-9 _@.\-]+/i','',urldecode($_POST['formInstansiIbu']));
                $formInstansiIbu    = str_replace("'","''",$formInstansiIbu);

                $formHandphoneIbu    = preg_replace('/[^a-z0-9 _@.\-]+/i','',urldecode($_POST['formHandphoneIbu']));
                $formHandphoneIbu    = str_replace("'","''",$formHandphoneIbu);

                $formEmailIbu    = preg_replace('/[^a-z0-9 _@.\-]+/i','',urldecode($_POST['formEmailIbu']));
                $formEmailIbu    = str_replace("'","''",$formEmailIbu);

                if($formNamaAyah=="")
				{
					$hasilResponse = array(
                        'status' => "1",
                        'bolehMasuk' => '0',
                        'keterangan' => "Nama ayah harus diisi",
                    );

                    echo json_encode($hasilResponse);
                    exit();
				}
				else
				{
					if($formAlamatAyah=="")
					{
						$hasilResponse = array(
	                        'status' => "1",
	                        'bolehMasuk' => '0',
	                        'keterangan' => "Alamat ayah harus diisi",
	                    );

	                    echo json_encode($hasilResponse);
	                    exit();
					}
					else
					{
						if($formHandphoneAyah=="")
						{
							$hasilResponse = array(
		                        'status' => "1",
		                        'bolehMasuk' => '0',
		                        'keterangan' => "Nomor telepon/handphone ayah harus diisi",
		                    );

		                    echo json_encode($hasilResponse);
		                    exit();
						}
						else
						{
							if($formNamaIbu=="")
							{
								$hasilResponse = array(
			                        'status' => "1",
			                        'bolehMasuk' => '0',
			                        'keterangan' => "Nama ibu harus diisi",
			                    );

			                    echo json_encode($hasilResponse);
			                    exit();
							}
							else
							{
								if($formAlamatIbu=="")
								{
									$hasilResponse = array(
				                        'status' => "1",
				                        'bolehMasuk' => '0',
				                        'keterangan' => "Alamat ibu harus diisi",
				                    );

				                    echo json_encode($hasilResponse);
				                    exit();
								}
								else
								{
									if($formHandphoneIbu=="")
									{
										$hasilResponse = array(
					                        'status' => "1",
					                        'bolehMasuk' => '0',
					                        'keterangan' => "Nomor telepon/handphone ibu harus diisi",
					                    );

					                    echo json_encode($hasilResponse);
					                    exit();
									}
									else
									{
										$sql="SELECT * FROM form_ptab WHERE no_form ='$noForm' ";
										$result=mysql_query($sql);
										$row=mysql_fetch_array($result);
										$id_formptab=$row['id_formptab'];

										$sql="SELECT * FROM ortu_laki WHERE id_formptab ='$id_formptab' ";
										$result=mysql_query($sql);
										if(mysql_num_rows($result)==0)
										{
											//INSERT DATA BARU
											$sql="INSERT INTO ortu_laki (`id_formptab`,`nama`,alamat, agama,warganegara,pendidikan,pekerjaan,nama_instansi,tel_rumah,handphone,email) VALUES ('$id_formptab','$formNamaAyah','$formAlamatAyah','$formAgamaAyah','$formKewarganegaraanAyah','$formPendidikanAyah','$formPekerjaanAyah','$formInstansiAyah','','$formHandphoneAyah','$formEmailAyah')";
											$result=mysql_query($sql);
										}
										else
										{
											//UPDATE DATA
											$sql="UPDATE ortu_laki SET `nama`='$formNamaAyah',alamat='$formAlamatAyah',agama='$formAgamaAyah',warganegara='$formKewarganegaraanAyah',pendidikan='$formPendidikanAyah',pekerjaan='$formPekerjaanAyah',nama_instansi='$formInstansiAyah',tel_rumah='',handphone='$formHandphoneAyah',email='$formEmailAyah' WHERE id_formptab ='$id_formptab' ";
											$result=mysql_query($sql);
										}

										$sql="SELECT * FROM ortu_perempuan WHERE id_formptab ='$id_formptab' ";
										$result=mysql_query($sql);
										if(mysql_num_rows($result)==0)
										{
											//INSERT DATA BARU
											$sql="INSERT INTO ortu_perempuan (`id_formptab`,`nama`,alamat, agama,warganegara,pendidikan,pekerjaan,nama_instansi,tel_rumah,handphone,email) VALUES ('$id_formptab','$formNamaIbu','$formAlamatIbu','$formAgamaIbu','$formKewarganegaraanIbu','$formPendidikanIbu','$formPekerjaanIbu','$formInstansiIbu','','$formHandphoneIbu','$formEmailIbu')";
											$result=mysql_query($sql);
										}
										else
										{
											//UPDATE DATA
											$sql="UPDATE ortu_perempuan SET `nama`='$formNamaIbu',alamat='$formAlamatIbu',agama='$formAgamaIbu',warganegara='$formKewarganegaraanIbu',pendidikan='$formPendidikanIbu',pekerjaan='$formPekerjaanIbu',nama_instansi='$formInstansiIbu',tel_rumah='',handphone='$formHandphoneIbu',email='$formEmailAyah' WHERE id_formptab ='$id_formptab' ";
											$result=mysql_query($sql);
										}

										$hasilResponse = array(
									        'status' => "1",
									        'bolehMasuk' => '1',
									        'keterangan' => "Data berhasil diubah",
									    );

									    echo json_encode($hasilResponse);
									    exit();
									}
								}
							}
						}
					}
				}
            }
            else
            {
                http_response_code(405);
                $statusResponse = array(
                    'code' => "405",
                    'keterangan' => "Function Not Found"
                );
                echo json_encode($statusResponse);
            }
        }
        else
        {
            http_response_code(405);
            $statusResponse = array(
                'code' => "405",
                'keterangan' => "Metode tidak ditemukan"
            );
            echo json_encode($statusResponse);
        }
    /*
    }
    else
    {
        //http_response_code(403);
        $statusResponse = array(
            'code' => "403",
            'keterangan' => "Not Verified"
        );
        echo json_encode($statusResponse);
    }*/

?>