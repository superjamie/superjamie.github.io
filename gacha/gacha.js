/* namespace */
var gacha = (function() {
    
    /* declarations and types */

    var number_of_builds = 0;
    var build_type = {}, build_selector = {};
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

    function make_thresholds(build_list) {
        for (let build_type of build_list) {
            for (let i = 0; i < build_type.rarity.length; i++) {
                build_type.threshold[i] = build_type.rarity[i];
                if (i > 0) {
                    build_type.threshold[i] += build_type.threshold[i-1];
                };
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

    function draw_selector(div_id, select_id, array, obj_list) {
        var html = "<select id=\"" + select_id + "\">"

        for (let one_obj of array) {
            html += "<option value=\"" + one_obj.name + "\">" + one_obj.name + "</option>";
            obj_list[one_obj.name] = one_obj;
        };

        html += "</select>";
        document.getElementById(div_id).innerHTML = html;
    };

   /* namespace public interfaces */

    function init() {
        Math.seedrandom();
        draw_selector("build_sel_div", "build_sel", build_list, build_selector);
        make_thresholds(build_list);
    };

    function build() {
        var html = "<ul>";

        /* input */

        build_type = build_selector[document.getElementById("build_sel").options[build_sel.selectedIndex].value];
        number_of_builds = parseInt(document.getElementById("input_number_of_builds").value);

        if (number_of_builds < 1) {
            number_of_builds = 1;
        };

        /* build */

        for (let i = 0; i < number_of_builds; i++) {
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

