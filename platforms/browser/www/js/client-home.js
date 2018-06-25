//------------------------------------------------------------------------------------------------------------------------------------------------HOME

function gotoHome(){
	mainView.router.reloadPage('home.html');
	myApp.closePanel();
}

function gotoSiswa(){
	mainView.router.reloadPage('formSiswa.html');
	myApp.closePanel();
}

function gotoOrtu(){
	mainView.router.reloadPage('formOrtu.html');
	myApp.closePanel();
}

function gotoPratayang(){
	mainView.router.reloadPage('formDisplay.html');
	myApp.closePanel();
}