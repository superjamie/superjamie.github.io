function calc_delta() {

    /* declare and type variables */

    var ext_horizontal = 0, ext_vertical = 0, arm_length = 0, effector_offset = 0, carriage_offset = 0, delta_radius = 0, delta_smooth_rod_offset = 0;
    var corner_name = "", effector_name = "", carriage_name = "";
    var current_corner, current_effector, current_carriage;
    var debug = true;

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
    DeltaCorner.prototype = { x_width: 0, y_offset: 0, extrusion: 20, url: "" };
    
    var corner_ultibots = new DeltaCorner();
    var corner_jaydm = new DeltaCorner();
    var corner_mming = new DeltaCorner();
    var corner_griffin = new DeltaCorner();

    corner_ultibots.x_width = 35.65 * 2;
    corner_ultibots.y_offset = 1.5;
    corner_ultibots.url = "";

    corner_jaydm.x_width = 34.1757 * 2;
    corner_jaydm.y_offset = 2.76866;
    corner_jaydm.url = "";

    corner_mming.x_width = 32.6479 * 2;
    corner_mming.y_offset = 2.2271;
    corner_mming.url = "";

    corner_griffin.x_width = 28.6144 * 2; // averaged this as griffin corners aren't perfectly square!
    corner_griffin.y_offset = -10.1103; // this seems a bad design choice, you lose like 20mm printable diameter over johann's corners!
    corner_griffin.url = "";

    corners = { "corner_sel_ultibots": corner_ultibots, "corner_sel_jaydm": corner_jaydm, "corner_sel_mming": corner_mming, "corner_sel_griffin": corner_griffin };

    /* effector objects */

    var DeltaEffector = function(){};
    DeltaEffector.prototype = { effector_offset: 0, url: "" };

    var effector_kosselmini = new DeltaEffector();
    var effector_calvinibav8 = new DeltaEffector();
    var effector_smarteffector = new DeltaEffector();
    var effector_custom = new DeltaEffector();

    effector_kosselmini.effector_offset = 20;
    effector_kosselmini.url = "";

    effector_calvinibav8.effector_offset = 30;
    effector_calvinibav8.url = "";

    effector_smarteffector.effector_offset = 35.22; // from kicad sources, 35.218394
    effector_smarteffector.url = "";

    effectors = { "effector_sel_kosselmini": effector_kosselmini, "effector_sel_calvinibav8": effector_calvinibav8, "effector_sel_smarteffector": effector_smarteffector, "effector_sel_custom": effector_custom };

    /* carriage objects */

    var DeltaCarriage = function(){};
    DeltaCarriage.prototype = { carriage_offset: 0, url: "" };

    var carriage_mgn12_16mm = new DeltaCarriage();
    var carriage_custom = new DeltaCarriage();

    carriage_mgn12_16mm.carriage_offset = 29.5;
    carriage_mgn12_16mm.url = "";

    carriages = { "carriage_sel_mgn12_16mm": carriage_mgn12_16mm, "carriage_sel_custom": carriage_custom };
    
    /* parse input */

    ext_horizontal = parseInt(document.getElementById("input_horiz").value);
    ext_vertical = parseInt(document.getElementById("input_vert").value);
    arm_length = parseInt(document.getElementById("input_arm").value);

    corner_name = document.getElementById("corner_sel").options[corner_sel.selectedIndex].value;
    effector_name = document.getElementById("effector_sel").options[effector_sel.selectedIndex].value;
    carriage_name = document.getElementById("carriage_sel").options[carriage_sel.selectedIndex].value;

    // corner selector
    
    current_corner = corners[corner_name];
    //TODO: show URL

    // effector selector

    current_effector = effectors[effector_name];

    document.getElementById("input_effector_offset").value = current_effector.effector_offset;
    // TODO: show URL, hide URL and input field for non-custom

    // carriage selector
    
    current_carriage = carriages[carriage_name];
    document.getElementById("input_carriage_offset").value = current_carriage.carriage_offset;
    // TODO: show URL, hide URL and input field for non-custom

    /* parse remaining input */

    effector_offset = parseInt(document.getElementById("input_effector_offset").value);
    carriage_offset = parseInt(document.getElementById("input_carriage_offset").value);

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

    if (debug === true) {
        console.log("smooth_rod_offset = " + smooth_rod_offset);
    }

    // TODO: use smooth_rod_offset, effector_offset, carriage_offset to calculate delta_radius

    // TODO: use:
    // delta_radius and arm_length to calculate arm angle at 0,0
    // delta_radius and arm_length to calculate delta_radius when arm_angle is 20 degrees
    // delta_radius and arm_length to calculate delta_radius when arm_angle is 0 degrees
    // delta_radius and effector_offset to calculate max nozzle diameter
    
    // TODO: output results

    // TODO: figure out canvas and draw a horizontal representation

}

function engage() {
    // here's to the finest crew in starfleet - https://www.youtube.com/watch?v=X6oUz1v17Uo
    calc_delta();
}

