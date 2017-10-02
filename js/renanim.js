function fun1 ( param ) {
        switch ( param ){
            case 1:
                return 'En Espera';
            case 2:
                return 'Papelería Aprobada';
            case 3:
                return 'Solicitud Aprobada';
            case 4:
                return 'Solicitud Rechazada';
            case 5:
                return 'Papelería Rechazada';
        }
    };
function fun3 ( param, param2) {
    if(param==param2)return 'select';
    return '';
    };
    function fun2 ( param ) {
        switch ( param ){
            case 1:
                return 'list';
            case 2:
                return 'description';
            case 3:
                return 'done';
            case 4:
                return 'trending_down';
            case 5:
                return 'tab_unselected';
        }
    };
function changer ( num_select,key_person,evento) {
    var updates={};
    var name_select=num_select;
    updates['/solicitud/' + key_person.toString()+'/'+evento] = parseInt($(name_select).val());
        firebase.database().ref().update(updates).then(function(){
            Materialize.toast("Listo!",5000);
            setTimeout(function () {
                window.location.href = "https://clubderoboticaitslp.github.io/Renanim";
            }, 3000);
        });
};
$(document).ready(function() {
    var query = firebase.database().ref("/form/licens/").orderByKey();
    query.once("value").then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            var key = childSnapshot.key;
            var childData = childSnapshot.val();
            $("#x_lic").append($('<option>', { value: key, text: key}));
            $("#x_lic").material_select();
        });
    });
    var query = firebase.database().ref("/form/event/").orderByKey();
    query.once("value").then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            var key = childSnapshot.key;
            var childData = childSnapshot.val();
            $("#r_sol_evento").append($('<option>', { value: key, text: key}));
            $("#r_sol_evento").material_select();
        });
    });
    var query = firebase.database().ref("/form/school/").orderByKey();
    query.once("value").then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            var key = childSnapshot.key;
            var childData = childSnapshot.val();
            $("#u_school").append($('<option>', { value: key, text: key}));
            $("#u_school").material_select();
        });
    });
    $("#user_t").material_select();
    $("#r_sender_consultar").click(function(){
        $("#r_tab1").empty(); firebase.database().ref('/users/').once('value').then(function(snapshot){
            var x=0;
            snapshot.forEach(function(childSnapshot) {
                var key = childSnapshot.key;
                var tex='';
                var con=true;
                firebase.database().ref('/users/'+key+'/').once('value').then(function(snapshot){
                    if(!$("#f_name").val().length==0 && !childSnapshot.val().f_name.toString().includes($("#f_name").val().toString()))con=false;
                    if(!$("#l_name").val().length==0 && !childSnapshot.val().l_name.toString().includes($("#l_name").val().toString()))con=false;
                    if(!$("#email").val().length==0 && !childSnapshot.val().email.toString().includes($("#email").val().toString()))con=false;
                    if(!$("#u_grade").val().length==0 && !childSnapshot.val().u_grade.toString().includes($("#u_grade").val().toString()))con=false;
                    if($( 'input[name=u_grade_sem_year]' ).is(':checked') && !childSnapshot.val().u_grade_sem_year.toString().includes($( 'input[name=u_grade_sem_year]:checked' ).val().toString()))con=false;
                    if($( 'input[name=u_grade_t]' ).is(':checked') && !childSnapshot.val().u_grade_t.toString().includes($( 'input[name=u_grade_t]:checked' ).val().toString()))con=false; 
                    if($("#x_lic"   ).val()!="0" && !childSnapshot.val().u_lic.toString().includes($("#x_lic").val()))con=false;
                    if(!$("#u_mat").val().length==0 && !childSnapshot.val().u_mat.toString().includes($("#u_mat").val().toString()))con=false;
                    if($("#u_school").val()!="0" && !childSnapshot.val().u_school.toString().includes($("#u_school").val()))con=false;
                    if($("#user_t").val()!="0" && !childSnapshot.val().user_t.toString().includes($("#user_t").val()))con=false;
                    if(con){
                        snapshot.forEach(function(childSnapshot) {
                            var childData = childSnapshot.val();
                            var ey=childSnapshot.key;
                            tex=tex+('<div class="divider col s12 z-depth-3"></div><div class="col s4">'+ey+'</div><div id="p_usert" class="col s8"><h6>'+childData+'</h6></div><div class="divider col s12 z-depth-3"></div>');
                        });
                        $("#r_tab1").append('<div class="card-panel grey lighten-5 z-depth-1 row"><div class="col s12 m8 l9 center">'+key+'</div><div class="col s12 m4 l3 center"><a class="waves-effect waves-light btn-large teal" href="#modal'+x+'">Detalles</a></div></div><div id="modal'+x+'" class="modal modal-fixed-footer"><div class="modal-content modex"><div class="row">'+tex+'</div></div><div class="modal-footer"><a href="#!" class="modal-action modal-close waves-effect waves-grey btn-flat">Cerrar</a></div></div>');
                        x++;
                        $('.modal').modal({
                            dismissible: true,
                            opacity: .8,
                            inDuration: 500,
                            outDuration: 500,
                            startingTop: '100%',
                            endingTop: '100%'
                        });
                    }
                    $("#r_Resultados1").html("Resultados: "+x);
                });
            });
        });
    });
    $("#r_solicitudes").click(function(){
        $("#r_sol_list").empty();
        firebase.database().ref('/solicitud/').orderByKey().once('value').then(function(snapshot){
            var x=0;
            var btncolor;
            btncolor='red darken-4';
            snapshot.forEach(function(childSnapshot) {
                var key = childSnapshot.key;
                if(childSnapshot.child($("#r_sol_evento").val()).exists()){
                    var datachildrens=childSnapshot.child($("#r_sol_evento").val()).val();
                    var ref1 = firebase.database().ref("users/"+key).once("value").then(function(snapshot2){
                        var n1=snapshot2.child("u_mat").val().toString();
                        var n2=snapshot2.child("f_name").val().toString();
                        $("#r_sol_list").append('<div class="card-panel grey lighten-5 z-depth-1 row"><div class="col s12 m12 l5">'+n1+"\n"+n2+'</div><div class="input-field col s6 m4 l3"><select id="sol_person'+x+'"name="sol_person'+x+'"><option value="1">En Espera</option><option value="2">Papelería Aprobada</option><option value="3">Solicitud Aprobada</option><option value="4">Solicitud Rechazada</option><option value="5">Papelería Rechazada</option></select><label for="sol_person'+x+'">Opción</label></div><div class="col s6 m4 l1"><i class="material-icons">'+fun2(datachildrens)+'</i>'+fun1(datachildrens)+'</div><div class="col s12 m4 l3"><a class="waves-effect waves-light btn-large '+btncolor+'"onclick="changer(sol_person'+x+',\''+key+'\',\''+$("#r_sol_evento").val()+'\')">¡Cambiar!</a></div></div>');
                        var name_select='sol_person'+x;
                        $(name_select).val(fun1(datachildrens));
                        $('select').material_select();
                        x++;
                    });
                }            
            });
        });
    });
});