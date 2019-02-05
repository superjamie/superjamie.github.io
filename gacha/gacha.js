/* namespace */
var gacha = (function() {
    
    /* declarations and types */

    var number_of_builds = 0;
    var build_type = {}, builds = {};
    var build_list = [];

    var BuildType = function(){};
    BuildType.prototype = { name: "", rarity: [], rarity_name: [ "SR", "E", "R", "C" ], rarity_color: [ "EEE8AA", "DDA0DD", "B0E0E6", "DCDCDC" ], threshold: [] };

    /* variables */

    var build_light   = new BuildType();
    var build_heavy   = new BuildType();
    var build_special = new BuildType();

    build_list = [ build_light, build_heavy, build_special ];

    build_light.name   = "Light";
    build_light.rarity = [ 7, 12, 26, 55 ];

    build_heavy.name   = "Heavy";
    build_heavy.rarity = [ 7, 12, 51, 30 ];

    build_special.name   = "Special";
    build_special.rarity = [ 7, 12, 51, 30 ];

    /* functions */

    function make_thresholds(build_type) {
        var i = 0;

        console.log("thresh type = " + build_type.name);
        for (i = 0; i < build_type.rarity.length; i++) {
            build_type.threshold[i] = build_type.rarity[i];
            if (i > 0) {
                build_type.threshold[i] += build_type.threshold[i-1];
            };
        };
    };

    function build_one(build_type) {
        var spin = Math.random() * 100;
        var i = 0;

        for (i = 0; i < build_type.threshold.length; i++) {
            if (spin < build_type.threshold[i]) {
                return("<span style=\"background-color: #" + build_type.rarity_color[i] + "\">&nbsp;" + build_type.rarity_name[i] + "&nbsp;</span>");
            };
        };
    };

    /* draw page stuff */

    function draw_selector(div_id, select_id, array, object) {
        var html = "";
        var i = 0;

        html = "<select id=\"" + select_id + "\">"

        for (i = 0; i < array.length; ++i) {
            html += "<option value=\"" + array[i].name + "\">" + array[i].name + "</option>";
            object[array[i].name] = array[i];
        };

        html += "</select>";
        document.getElementById(div_id).innerHTML = html;
    };

   /* namespace public interfaces */

    function init() {
        var i = 0;

        Math.seedrandom();
        draw_selector("build_sel_div", "build_sel", build_list, builds);
        for (i = 0; i < build_list.length; i++) {
            make_thresholds(build_list[i]);
        };
    };

    function build() {
        var i = 0;
        var html = "<ul>";

        /* input */

        build_type = builds[document.getElementById("build_sel").options[build_sel.selectedIndex].value];
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
        document.getElementById("input_number_of_builds").value = number_of_builds;
    };

    return {
        build : build,
        init : init,
    };

})(); /* end of namespace */

