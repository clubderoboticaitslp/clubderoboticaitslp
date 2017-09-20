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
                    if($("#x_lic").val()!="0" && !childSnapshot.val().u_lic.toString().includes($("#x_lic").val()))con=false;
                    if(!$("#u_mat").val().length==0 && !childSnapshot.val().u_mat.toString().includes($("#u_mat").val().toString()))con=false;
                    if($("#u_school").val()!="0" && !childSnapshot.val().u_school.toString().includes($("#u_school").val()))con=false;
                    if($("#user_t").val()!="0" && !childSnapshot.val().user_t.toString().includes($("#user_t").val()))con=false;
                    if(con){
                        snapshot.forEach(function(childSnapshot2) {
                            var childData = childSnapshot2.val();
                            var ey=childSnapshot2.key;
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
});
$("#r_sol_evento").material_select();
$(window).load(function(){    
    $("#r_sender1").click(function(){
        
    });
});