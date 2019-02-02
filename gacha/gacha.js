/* namespace */
var gacha = (function() {
    
    /* declare and type variables */

    var number_of_builds = 0;
    var build_type = {}, builds = {};
    var build_list = [];
    var build_name = "";

    var BuildType = function(){};
    BuildType.prototype = { name: "", pct_sr: 0, pct_e: 0, pct_r: 0, pct_c: 0 };

    /* variables */

    var build_light   = new BuildType();
    var build_heavy   = new BuildType();
    var build_special = new BuildType();

    build_list = [ build_light, build_heavy, build_special ];

    build_light.name   = "Light";
    build_light.pct_sr =  7;
    build_light.pct_e  = 12;
    build_light.pct_r  = 26;
    build_light.pct_c  = 55;

    build_heavy.name   = "Heavy";
    build_heavy.pct_sr =  7;
    build_heavy.pct_e  = 12;
    build_heavy.pct_r  = 51;
    build_heavy.pct_c  = 30;

    build_special.name   = "Special";
    build_special.pct_sr =  7;
    build_special.pct_e  = 12;
    build_special.pct_r  = 51;
    build_special.pct_c  = 30;

    /* functions */

    function random_percent() {
        return Math.floor(Math.random() * 100);
    };

    function build_one(build_type) {
        var spin = random_percent();
        var hit = 0;

        /* Super Rare */
        hit += build_type.pct_sr;
        if (spin <= hit) {
            return("<span style=\"background-color: #EEE8AA\">&nbsp;SR&nbsp;</span>");
        }

        /* Elite */
        hit += build_type.pct_e;
        if (spin <= hit) {
            return("<span style=\"background-color: #DDA0DD\">&nbsp;E&nbsp;</span>");
        }

        /* Rare */
        hit += build_type.pct_r;
        if (spin <= hit) {
            return("<span style=\"background-color: #B0E0E6\">&nbsp;R&nbsp;</span>");
        }

        /* Common */
            return("<span style=\"background-color: #DCDCDC\">&nbsp;C&nbsp;</span>");
    };

    /* draw page stuff */

    function draw_selector(div_id, select_id, array, object) {
        var html = "";
        var i = 0;

        html = "<select id=\"" + select_id + "\">"

            for (i = 0; i < array.length; ++i) {
                html += "<option value=\"" + array[i].name + "\">" + array[i].name + "</option>";
                object[array[i].name] = array[i];
            }

        html += "</select>";
        document.getElementById(div_id).innerHTML = html;
    };

   /* namespace public interfaces */

    function init() {
        Math.seedrandom();
        draw_selector("build_sel_div", "build_sel", build_list, builds);
    };

    function build() {
        var i = 0;
        var html = "<ul>";

        /* input */

        build_name = document.getElementById("build_sel").options[build_sel.selectedIndex].value;
        build_type = builds[build_name];

        number_of_builds = parseInt(document.getElementById("input_number_of_builds").value);

        if (number_of_builds < 1) {
            number_of_builds = 1;
        };

        /* build */

        for (i = 0; i < number_of_builds; i++) {
            html += "<li>" + build_one(build_type) + "</li>";
        };

        html += "</ul>";

        /* output */

        document.getElementById("output_results").innerHTML = html;

    };

    return {
        build : build,
        init : init,
    };

})(); /* end of namespace */

