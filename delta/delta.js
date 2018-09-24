/* delta namespace */
var delta = (function() {
    
    /* declare and type variables */

    var ext_horizontal = 0, ext_vertical = 0, arm_length = 0, effector_offset = 0, carriage_offset = 0, smooth_rod_offset = 0, delta_radius = 0;
    var arm_angle_origin = 0, movement_radius_at_20deg = 0, movement_radius_at_0deg = 0, arm_length_max = 0, arm_length_min = 0, biggest_print_bed = 0;
    var arm_span_other_tower = 0, tower_clearance_at_20deg = 0, tower_clearance_at_0deg = 0;
    var corner_type = "", effector_type = "", carriage_type = "";
    var corners = {}, current_corner = {}, effectors = {}, current_effector = {}, carriages = {}, current_carriage = {};
    var corner_list = [], effector_list = [], carriage_list = [];
    var debug = false;

    var movement_span_other_tower = 0, y_distance_to_other_tower = 0, x_distance_to_other_tower = 0, diameter_to_other_tower = 0;

    /* create objects */

    /* A Corner is a representation of an outer triangle piece, commonly called "frame_motor" or "frame_top" STLs
     *
     * The values are determined by looking at the STL, centering the origin (0,0)
     * on the middle of the extrusion/rods, then picking two points where the
     * horizontal extrusions touch. Those should be at the same X coord, one
     * negative and one positive, and at the same Y coord. A picture:
      
           \  \           /  /
            \  \         /  /
             \  \       /  /
              \  '-----'  /
              /           \
            /    ,-----,    \
          /      |     |      \
         1       |  0  |       2
          \      |     |      /
           '     '-----'     '
             '             '
               -----------

     * The distance between 1 and 2 is x_width
     * If 1 and 2 are closer IN towards the heatbed, y_offset is positive
     * If 1 and 2 are further AWAY from the heatbed, y_offset is negative
     */
           
    var DeltaCorner = function(){};
    DeltaCorner.prototype = { name: "", x_width: 0, y_offset: 0, extrusion: 20, html: "" };
    
    var corner_ultibots = new DeltaCorner();
    var corner_jaydm = new DeltaCorner();
    var corner_mming_2020 = new DeltaCorner();
    var corner_griffin = new DeltaCorner();
    var corner_cossel = new DeltaCorner();
    var corner_mming_2040 = new DeltaCorner();
    var corner_hyperair_2040 = new DeltaCorner();
    var corner_kosselmax_2040 = new DeltaCorner();

    corner_list = [ corner_ultibots, corner_jaydm, corner_mming_2020, corner_griffin, corner_cossel, corner_mming_2040, corner_hyperair_2040, corner_kosselmax_2040 ];

    corner_ultibots.name = "Ultibots 2020";
    corner_ultibots.x_width = 35.65 * 2;
    corner_ultibots.y_offset = 1.5;
    corner_ultibots.html = "<a href=\"https://github.com/UltiBots/MKVS\">Ultibots GitHub</a>";

    corner_jaydm.name = "jaydmdigital 2020";
    corner_jaydm.x_width = 34.1757 * 2;
    corner_jaydm.y_offset = 2.76866;
    corner_jaydm.html = "<a href=\"https://github.com/Jaydmdigital/Kossel_2020\">jaydmdigital GitHub</a>";

    corner_mming_2020.name = "mming 2020";
    corner_mming_2020.x_width = 32.6479 * 2;
    corner_mming_2020.y_offset = 2.2271;
    corner_mming_2020.html = "<a href=\"https://www.thingiverse.com/thing:208458\">Kossel Frame 2020 by mming1106</a>";

    corner_griffin.name = "Griffin 2020";
    corner_griffin.x_width = 28.6144 * 2; // averaged this as griffin corners aren't perfectly square!
    corner_griffin.y_offset = -10.1103; // this seems a bad design choice, you lose like 20mm printable diameter over johann's corners!
    corner_griffin.html = "<a href=\"https://www.thingiverse.com/thing:259238\">Griffin 3D Delta Printer by Sheepdog</a>";

    corner_cossel.name = "c0ssel 2020";
    corner_cossel.x_width = 49.651 * 2;
    corner_cossel.y_offset = 47.996; // nice
    corner_cossel.html = "<a href=\"https://www.thingiverse.com/thing:244893\">cOssel by cdaringe</a>";

    corner_mming_2040.name = "mming 2040";
    corner_mming_2040.x_width = 32.6497 * 2;
    corner_mming_2040.y_offset = 12.2271;
    corner_mming_2040.extrusion = 40;
    corner_mming_2040.html = "<a href=\"https://www.thingiverse.com/thing:334838\">Kossel 2040 Kit by mming1106</a>";

    corner_hyperair_2040.name = "hyperair 2040";
    corner_hyperair_2040.x_width = 25 * 2;
    corner_hyperair_2040.y_offset = 10.1;
    corner_hyperair_2040.html = "<a href=\"https://www.thingiverse.com/thing:749151\">2040 Kossel Corner by hyperair</a>";

    corner_kosselmax_2040.name = "Kossel MAX 2040";
    corner_kosselmax_2040.x_width = 36.5722 * 2;
    corner_kosselmax_2040.y_offset = 13.6;
    corner_kosselmax_2040.extrusion = 40;
    corner_kosselmax_2040.html = "<a href=\"https://www.thingiverse.com/thing:668577\">Kossel MAX by wfcook</a>";

    /* effector objects */

    var DeltaEffector = function(){};
    DeltaEffector.prototype = { name: "", effector_offset: 0, html: "", readonly: true };

    var effector_kosselmini = new DeltaEffector();
    var effector_calvinibav8 = new DeltaEffector();
    var effector_haydn = new DeltaEffector();
    var effector_smarteffector = new DeltaEffector();
    var effector_custom = new DeltaEffector();

    effector_list = [ effector_kosselmini, effector_calvinibav8, effector_haydn, effector_smarteffector, effector_custom ];

    effector_kosselmini.name = "Kossel Mini";
    effector_kosselmini.effector_offset = 20;
    effector_kosselmini.html = "<a href=\"https://github.com/jcrocholl/kossel\">jcrocholl GitHub</a>";

    effector_calvinibav8.name = "Calvin Iba V8";
    effector_calvinibav8.effector_offset = 30;
    effector_calvinibav8.html = "<a href=\"https://www.thingiverse.com/thing:2297083\">Kossel Pro Effector V8 by calviniba</a>";

    effector_haydn.name = "Haydn Huntley Magnetic";
    effector_haydn.effector_offset = 33;
    effector_haydn.html = "<a href=\"https://www.youmagine.com/designs/kossel-plus-magnetic-effector\">Haydn Huntley Magnetic Effector</a>";

    effector_smarteffector.name = "Duet3D SmartEffector";
    effector_smarteffector.effector_offset = 22.805; // from kicad sources. 123.768043 - 100.962688 = 22.805355
    effector_smarteffector.html = "<a href=\"https://duet3d.com/wiki/Smart_effector_and_carriage_adapters_for_delta_printer\">Smart Effector by Duet3D</a>";

    effector_custom.name = "Custom";
    effector_custom.html = "Custom";
    effector_custom.readonly = false;

    /* carriage objects */

    var DeltaCarriage = function(){};
    DeltaCarriage.prototype = { name: "", carriage_offset: 0, html: "", readonly: true };

    var carriage_mgn12_16mm = new DeltaCarriage();
    var carriage_ultibots_mk = new DeltaCarriage();
    var carriage_haydn = new DeltaCarriage();
    var carriage_leaf = new DeltaCarriage();
    var carriage_custom = new DeltaCarriage();

    carriage_list = [ carriage_mgn12_16mm, carriage_ultibots_mk, carriage_haydn, carriage_leaf, carriage_custom ];

    carriage_mgn12_16mm.name = "MGN12 with Johann Arms";
    carriage_mgn12_16mm.carriage_offset = 19.5;
    carriage_mgn12_16mm.html = "<a href=\"https://github.com/jcrocholl/kossel\">jcrocholl GitHub</a>";

    carriage_ultibots_mk.name = "Ultibots MKVS/K250VS";
    carriage_ultibots_mk.carriage_offset = 17;
    carriage_ultibots_mk.html = "<a href=\"https://github.com/UltiBots/MKVS\">Ultibots GitHub</a>";

    carriage_haydn.name = "Haydn Huntley Magnetic";
    carriage_haydn.carriage_offset = 18;
    carriage_haydn.html = "<a href=\"https://www.youmagine.com/designs/kossel-plus-magnetic-carriage--2\">Haydn Huntley Magnetic Carriage</a>";

    carriage_leaf.name = "Kossel Leaf";
    carriage_leaf.carriage_offset = 19.45;
    carriage_leaf.html = "<a href=\"https://github.com/superjamie/kossel-leaf\">Kossel Leaf</a>";

    carriage_custom.name = "Custom";
    carriage_custom.html = "Custom";
    carriage_custom.readonly = false;

    /* function definitions */

    /* convert degrees to radians */
    function radians(deg) {
        return deg * (Math.PI / 180);
    }

    /* convert radians to degrees */
    function degrees(rad) {
        return rad / (Math.PI / 180);
    }

    /* draw page stuff */

    function draw_selector(div_id, select_id, array, object) {
        var html = "";
        var i = 0;

        html = "<select id=\"" + select_id + "\" onchange=\"delta.calc();\">"

            for (i = 0; i < array.length; ++i) {
                html += "<option value=\"" + array[i].name + "\">" + array[i].name + "</option>";
                object[array[i].name] = array[i];
            }

        html += "</select>";
        document.getElementById(div_id).innerHTML = html;
    }

    function init() {
        draw_selector("corner_sel_div", "corner_sel", corner_list, corners);
        draw_selector("effector_sel_div", "effector_sel", effector_list, effectors);
        draw_selector("carriage_sel_div", "carriage_sel", carriage_list, carriages);
        calc();
    }

    /* debug */ 

    /* https://stackoverflow.com/questions/31261667/how-to-clear-the-javascript-console-programmatically */
    function console_clear() {
        console.API;

        if (typeof console._commandLineAPI !== 'undefined') {
                console.API = console._commandLineAPI; // chrome
        } else if (typeof console._inspectorCommandLineAPI !== 'undefined') {
                console.API = console._inspectorCommandLineAPI; // safari
        } else if (typeof console.clear !== 'undefined') {
                console.API = console; // firefox
        }

        console.API.clear();
    }

    function debug() {
        console_clear();
        console.log("arm_length = " + arm_length);
        console.log("ext_horizontal = " + ext_horizontal);
        console.log("ext_vertical = " + ext_vertical);
        console.log("effector_offset = " + effector_offset);
        console.log("carriage_offset = " + carriage_offset);
        console.log("apex_distance = " + apex_distance.toFixed(3));
        console.log("apex_side_length = " + apex_side_length.toFixed(3));
        console.log("apex_opposite_length = " + apex_opposite_length.toFixed(3));
        console.log("apex_centroid = " + apex_centroid.toFixed(3));
        console.log("smooth_rod_offset = " + smooth_rod_offset.toFixed(3));
        console.log("delta_radius = " + delta_radius.toFixed(3));
        console.log("arm_angle_origin = " + arm_angle_origin.toFixed(2));
        console.log("movement_radius_at_20deg = " + movement_radius_at_20deg.toFixed(2));
        console.log("movement_radius_at_0deg = " + movement_radius_at_0deg.toFixed(2));
        console.log("arm_length_max = " + arm_length_max.toFixed(2));
        console.log("arm_length_min = " + arm_length_min.toFixed(2));
        console.log("arm_span_other_tower = " + arm_span_other_tower.toFixed(2));
        console.log("tower_clearance_at_20deg = " + tower_clearance_at_20deg.toFixed(2));
        console.log("tower_clearance_at_0deg = " + tower_clearance_at_0deg.toFixed(2));
        console.log("biggest_print_bed = " + biggest_print_bed.toFixed(2));
        console.log("movement_span_other_tower = " + movement_span_other_tower);
        console.log("x_distance_to_other_tower = " + x_distance_to_other_tower);
        console.log("y_distance_to_other_tower = " + y_distance_to_other_tower);
        console.log("diameter_to_other_tower = " + diameter_to_other_tower);
    }

    /* main work done here */

    function calc() {

        /* parse input */

        ext_horizontal = parseInt(document.getElementById("input_horiz").value);
        ext_vertical = parseInt(document.getElementById("input_vert").value);
        arm_length = parseInt(document.getElementById("input_arm").value);

        corner_type = document.getElementById("corner_sel").options[corner_sel.selectedIndex].value;
        effector_type = document.getElementById("effector_sel").options[effector_sel.selectedIndex].value;
        carriage_type = document.getElementById("carriage_sel").options[carriage_sel.selectedIndex].value;

        // corner selector
        
        current_corner = corners[corner_type];
        document.getElementById("label_corner_html").innerHTML = current_corner.html;

        // effector selector

        current_effector = effectors[effector_type];

        document.getElementById("input_effector_offset").value = current_effector.effector_offset;
        current_effector.readonly === true ? document.getElementById("input_effector_offset").setAttribute("readonly", "readonly") : document.getElementById("input_effector_offset").removeAttribute("readonly");
        document.getElementById("label_effector_html").innerHTML = current_effector.html;

        // carriage selector
        
        current_carriage = carriages[carriage_type];
        document.getElementById("input_carriage_offset").value = current_carriage.carriage_offset;
        current_carriage.readonly === true ? document.getElementById("input_carriage_offset").setAttribute("readonly", "readonly") : document.getElementById("input_carriage_offset").removeAttribute("readonly");
        document.getElementById("label_carriage_html").innerHTML = current_carriage.html;

        /* parse remaining input */

        effector_offset = parseInt(document.getElementById("input_effector_offset").value);
        carriage_offset = parseInt(document.getElementById("input_carriage_offset").value);
        carriage_offset = carriage_offset + (current_corner.extrusion / 2);

        /* calculations */

        /* The Apex
         *
         * To calculate SMOOTH_ROD_OFFSET for any given corner piece, it's easiest
         * if the corner STL's origin (0,0) is in the middle of the SMOOTH_ROD
         * axis. For extrusion corners, this means at the centre of the extrusion.
         * For rod corners, this means halfway between the middle of the two rods.
         *
         * Now pick the Corner X Points as described above. From the two Corner X
         * Points we can create an equilateral triangle where the third point
         * "outside" the printer will be called the Apex Point.
         *
         * We can find the distance from the Apex Point to its opposite side,
         * subtract the Corner Y distance, and that's how far the Apex Point is
         * from the SMOOTH_ROD_OFFSET. We'll call this the Apex Distance.
         *
         * Separately, add two sides of this equilateral triangle to the horizontal
         * extrusion length to create a larger equilateral triangle, the centroid of
         * which is the 0,0 point of the printer (i.e. the nozzle zero position).
         *
         * If we then take the distance from an Apex point to the large triangle's
         * centroid, and subtract the Apex Distance, we get the SMOOTH-ROD-RADIUS.
         */

        apex_distance = Math.sqrt(Math.pow(current_corner.x_width,2) - Math.pow(current_corner.x_width/2,2)) - current_corner.y_offset;
        apex_side_length = ext_horizontal + (current_corner.x_width * 2);
        apex_opposite_length = Math.sqrt(Math.pow(apex_side_length,2) - Math.pow(apex_side_length/2,2));
        apex_centroid = apex_opposite_length * (2/3);
        smooth_rod_offset = apex_centroid - apex_distance;

        delta_radius = smooth_rod_offset - effector_offset - carriage_offset;

        arm_angle_origin = degrees(Math.acos(delta_radius/arm_length));
        movement_radius_at_20deg = (Math.cos(radians(20)) * arm_length) - delta_radius;
        movement_radius_at_0deg = (Math.cos(radians(0)) * arm_length) - delta_radius;

        // arms which achieve 60 degrees at rest
        arm_length_max = delta_radius / Math.cos(radians(60));
        // as explained in johann/jaydm mk_visual_calc
        arm_length_min = ((delta_radius * 2) - effector_offset) / Math.cos(radians(20));

        // also from mk_visual_calc
        biggest_print_bed = ((smooth_rod_offset * Math.sin(radians(30))) + effector_offset - (current_corner.extrusion / 2) - 4) * 2;

        /* DANGER: TOO MANY TRIANGLES
         * after here i have no idea what i'm doing, i may actually be a dog using the computer
         */

        /* Top down view, if the rods between two towers are straight, they'll be
         * 30° from their position at origin. Calculate this span and we can work
         * out effector tower clearance at 20° or 0°.
         */

        arm_span_other_tower = delta_radius * Math.cos(radians(30));
        // radius to other tower
        movement_span_other_tower = (arm_span_other_tower * 2);
        y_distance_to_other_tower = movement_span_other_tower * Math.cos(radians(30)) - delta_radius;
        x_distance_to_other_tower = movement_span_other_tower * Math.sin(radians(30));
        diameter_to_other_tower = Math.sqrt(Math.pow(x_distance_to_other_tower,2) + Math.pow(y_distance_to_other_tower, 2)) * 2;
        // clearance when the OTHER tower has arms at 20 or 0, these don't seem right
        tower_clearance_at_20deg = arm_span_other_tower - movement_radius_at_20deg;
        tower_clearance_at_0deg = arm_span_other_tower - movement_radius_at_0deg;

        /* output */

        document.getElementById("output_smooth_rod_offset").innerHTML = smooth_rod_offset.toFixed(3);
        document.getElementById("output_delta_radius").innerHTML = delta_radius.toFixed(3);

        document.getElementById("output_arm_angle_origin").innerHTML = arm_angle_origin.toFixed(2);
        document.getElementById("output_movement_diam_at_20deg").innerHTML = movement_radius_at_20deg.toFixed(1) * 2;
        document.getElementById("output_movement_diam_at_0deg").innerHTML = movement_radius_at_0deg.toFixed(1) * 2;
        document.getElementById("output_arm_length_max").innerHTML = arm_length_max.toFixed(1);
        document.getElementById("output_arm_length_min").innerHTML = arm_length_min.toFixed(1);

        if (debug === true) {
            print_debug();
        }
    }

    /* namespace public interfaces */

    return {
        calc : calc,
        init : init,
    };

})();

